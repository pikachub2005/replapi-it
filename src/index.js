const EventEmitter = require("events");
const axios = require('axios');
const Queries = require("./utils/queries");
const {CurrentUser, User} = require("./structures/user");
const Repl = require('./structures/repl');
const Post = require('./structures/post');
const Template = require('./structures/template');
const UserManager = require('./managers/usermanager');
const ReplManager = require('./managers/replmanager');
const PostManager =	 require('./managers/postmanager');
const CommentManager = require('./managers/commentmanager');
const Collection = require('./structures/collection');

class Client extends EventEmitter {
	#SID;
	headers = {
		"X-Requested-With": "replit",
		Origin: "https://replit.com",
		Accept: "application/json",
		Referrer: "https://replit.com",
		"Content-Type": "application/json",
		Connection: "keep-alive",
		Host: "replit.com",
		"x-requested-with": "XMLHttpRequest",
		"User-Agent": "Mozilla/5.0",
	};
	constructor(SID) {
		super();
		if (!SID) throw new Error("You must include your SID");
		this.#SID = SID;
		this.headers = { ...this.headers, Cookie: `connect.sid=${this.#SID}` };
		this.queries = Queries;
		this.User = User;
		this.Repl = Repl;
		this.users = new UserManager(this);
		this.repls = new ReplManager(this);
		this.posts = new PostManager(this, this);
		this.comments = new CommentManager(this, this);
		(async () => {
			let data = await this.graphql([{ query: this.queries.currentUser }, {query: this.queries.repl, variables: {id: process?.env?.REPL_ID}}]);
			if (!data[0].currentUser) throw new Error('SID is invalid');
			this.user = new CurrentUser(this);
			await this.user.update({...data[0].currentUser, countryCode: data[0].country});
			this.users.cache.set(this.user.username, this.user);
			if (data[1]) {
				this.repl = new Repl(this);
				await this.repl.update(data[1].repl);
				this.repls.cache.set(this.repl.id, this.repl);
			}
			this.emit('ready', this);
		})();
	}
	async graphql(data, headers = {}) {
		let body;
		switch (typeof data) {
			case "string":
				body = { query: data, variables: {} };
				break;
			case "object":
				body = data;
				break;
			default:
				throw new Error('Invalid data type');
		}
		let res = await axios.post("https://replit.com/graphql", body, {headers: {...this.headers, ...headers}});
		let resData = Array.isArray(res.data) ? res.data.map((r) => r.data) : res.data.data;
		return resData;
	}
	track(fn, ms) {
		return new Track(fn, ms);
	}
	async search(query, options = {}) {
		options = {cache: true, query, categories: ['Tags'], onlyCalculateHits: false, ...options};
		let {cache, ...options2} = options;
		let res = await this.graphql({query: this.queries.search, variables: {options: options2}});
		let search = res.search;
		let results = {
			repls: new Collection(),
			templates: new Collection(),
			users: new Collection(),
			posts: new Collection(),
			tags: []
		};
		for (let r of search.replResults.results.items) {
			let repl = new Repl(this);
			await repl.update(r);
			if (options.cache) this.repls.cache.set(repl.id, repl);
			results.repls.set(repl.id, repl);
		}
		for (let t of search.templateResults.results.items){
			let template = new Template(this);
			await template.update(t);
			results.templates.set(template.id, template);
		}
		for (let u of search.userResults.results.items) {
			let user = new User(this);
			await user.update(u);
			if (options.cache) this.users.cache.set(user.username, user);
			results.users.set(user.username, user);
		}
		for (let p of search.postResults.results.items) {
			let post = new Post(this);
			await post.update(p);
			if (options.cache) this.posts.cache.set(post.id, post);
			results.posts.set(post.id, post);
		}
		for (let t of search.tagResults.results.items) {
			results.tags.push({...t.tag, lastUsed: t.timeLastUsed, replsCount: t.replsCount});
		}
	}
	async uploadImage(datauri) {
		let data = await axios.post('https://replit.com/data/images/upload', {context: 'profile-image', image: datauri}, {headers: this.headers}).catch(() => {});
		return data?.data?.url;
	}
	get axios() {
		return axios;
	}
}

class Track extends EventEmitter {
	#id;
	#last;
	constructor(fn, ms) {
		super();
		this.fn = fn;
		this.ms = ms;
		this.running = false;
	}
	start() {
		if (this.running) return;
		this.#last = null;
		this.running = true;
		this.#id = setInterval(() => {
			let n = this.fn();
			if (n != this.#last) this.emit('update', n);
			this.#last = n;
		}, this.ms);
	}
	stop() {
		clearInterval(this.#id);
		this.running = false;
	}
}

module.exports = Client;