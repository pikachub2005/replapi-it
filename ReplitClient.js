const axios = require("axios");
const EventEmitter = require('events');
const util = require('util');
const {Crosis} = require('crosis4furrets');

class Collection extends Map {
	constructor(values) {
		super(values);
	}
	at(index) {return [...this].at(index)[1]};
	filter(fn) {return new Collection([...this].filter(i => fn(i[1])))};
	find(fn) {return [...this].find(i => fn(i[1]))[1]};
	findKey(fn) {return [...this].find(i => fn(i[1]))[0]};
	first() {return this.at(0)};
	firstKey() {return this.atKey(0)};
	hasAll(keys) {keys.forEach(key =>  {if (!this.has(key)) return false}); return true}
	hasAny(keys) {keys.forEach(key => {if(this.has(key)) return true}); return false}
	keyAt(index) {return [...this].at(index)[0]};
	last() {return this.at(-1)};
	lastKey() {return this.keyAt(-1)};
	random() {return this.at(Math.floor(Math.random() * this.size))};
	randomKey() {return this.keyAt(Math.floor(Math.random() * this.size))};
	reverse() {return new Collection([...this].reverse())};
	some(fn) {return [...this].some(i => fn(i[1]))};
	sort(fn) {return [...this].sort((a, b) => fn((a[1], b[1])))};
	sweep(fn) {return [...this.filter(fn).keys()].forEach(key => this.delete(key))};
	tap(fn) {return [...this.values()].forEach(value => fn(value))};
}

class ReplitClient extends EventEmitter {
	constructor(sid) {
		if (!sid) throw new Error("Requires your sid. Check your connect.sid cookie.");
		super();
		this.sid = sid;
		this.headers = { 'X-Requested-With': 'replit', 'Origin': 'https://replit.com', 'Accept': 'application/json', 'Referrer': 'https://replit.com/@PikachuB2005', 'Content-Type': 'application/json', 'Connection': 'keep-alive', 'Host': "replit.com", "x-requested-with": "XMLHttpRequest", "User-Agent": "Mozilla/5.0", "Cookie": `connect.sid=${sid}`}
		this.users = new UserManager(this);
		this.repls = new ReplManager(this);
		this.users.fetchClientUser().then(user => {this.user = user; this.emit("ready")});
	}
	async graphql(query, variables = {}) {
		return (await axios.post("https://replit.com/graphql", {query: query, variables: variables}, {headers: this.headers})).data.data
	}
}

class UserManager {
	constructor(client) {
		this.client = client;
		this.cache = new Collection();
	}
	async fetch(username, force = false) {
		if (!force && this.cache.has(username)) return this.cache.get(username);
		let user = new User(this.client, (await this.client.graphql(`query {userByUsername(username: "${username}"){id, username, firstName, lastName, bio, isVerified, displayName, fullName, url, roles {id, name, tagline}, isLoggedIn, timeCreated, karma, isHacker, languages {id}, image}}`)).userByUsername);
		this.cache.set(user.username, user);
		return user;
	}
	async fetchClientUser() {
		let user = new ClientUser(this.client, (await this.client.graphql(`query {currentUser {id, username, firstName, lastName, bio, isVerified, displayName, fullName, url, roles {id, name, tagline}, isLoggedIn, timeCreated, karma, isHacker, languages {id}, image, email, state {id, skillLevel, interestedIn}, device {isMobile, isMac}, notificationCount}}`)).currentUser);
		this.cache.set(user.username, user);
		return user;
	}
}

class ReplManager {
	constructor(client, user) {
		this.client = client;
		this.cache = new Collection();
		this.user = user;
	}
	async fetch() {
	 	let args = [...arguments];
		if (this.user) {
			let limit = args[0] || 50;
			(await this.client.graphql(`query {userByUsername(username: "${this.user.username}"){publicRepls(showUnnamed: true, count: ${limit}){items{id, title, slug, description, isRenamed, user {username}, lang {id}, url, timeCreated, timeUpdated, hostedUrl}}}}`)).userByUsername.publicRepls.items.map(repl => new Repl(this.client, repl)).forEach(repl => {
				this.client.repls.cache.set(repl.id, repl);
				this.cache.set(repl.id, repl);
			});
			return this.cache;
		} else {
			let [repl, input] = args;
			return new Repl(this.client, (await this.client.graphql(`repl(${input == "url" ? "url" : "id"}: "${repl}"){id, title, slug, description, isRenamed, user {username}, lang {id}, url, timeCreated, timeUpdated, hostedUrl}`)).repl)
		}
	}
	async create(title, language = "bash") {
		let input = {title: title, language: language};
		let repl = (await this.client.mutate("CreateRepl($input: CreateReplInput!) {createRepl(input: $input) {id, title, slug, description, isRenamed, user {username}, lang {id}, url, timeCreated, timeUpdated, hostedUrl}}", {"input": input}));
		return repl;
	}
}

class User {
	constructor(client, data = {}) {
		this.client = client;
		this.repls = new ReplManager(this.client, this);
		for (let [key, value] of Object.entries(data)) {
			if (key == "roles") {this.roles = value.map(r => new Role(this.client, r)); continue};
			if (key == "timeCreated") {this.timeCreated = new Date(value); continue};
			this[key] = value;
		}
	}
}

class ClientUser extends User {
	constructor(client, data = {}) {
		super(client, data);
		for (let [key, value] of Object.entries(data)) {
			
		}
	}
}

class Role {
	constructor(client, data = {}) {
		this.client = client;
		for (let [key, value] of Object.entries(data)) {
			this[key] = value;
		}
	}
}

class Repl {
	constructor(client, data = {}) {
		this.client = client;
		for (let [key, value] of Object.entries(data)) {
			if (key == "user") {
				if (this.client.users.cache.has(value.username)) {
					this.user = this.client.users.cache.get(value.username);
				} else {
					this.client.users.getUser(value.username).then(user => this.user = user);
				};
				continue;
			}
			if (key == "timeCreated") {this.timeCreated = new Date(value); continue};
			if (key == "timeUpdated") {this.timeUpdated = new Date(value); continue};
			if (key == "lang") {this.language = value.id; continue};
			this[key] = value;
		}
		this.crosis = new Crosis(this.client.sid, this.id);
		this.files = new ReplFileManager(this.client, this);
	}
	async delete() {
		let req = await this.client.mutate(`ReplsDashboardDeleteRepl($id: String!) {deleteRepl(id: $id){id, __typename}}`, {id: this.id});
		return req.deleteRepl
	}
}

class ReplFileManager {
	constructor(client, repl) {
		this.client = client;
		this.repl = repl;
		this.cache = new Collection();
	}
	async fetch(path = ".") {
		for (let file of (await this.repl.crosis.readdir(path))) {
			try {
				await this.repl.crosis.read(file);
				this.cache.set(file, new ReplFile(this.client, this.repl, file));
			} catch {
				this.cache.set(file, new ReplFolder(this.client, this.repl, file));
			}
		}
		return this;
	}
	async create(path) {
		return await this.repl.crosis.write(path, "");
	}
	async changePath(oldPath, newPath) {
		return await this.repl.crosis.move(oldPath, newPath);
	}
}

class ReplFile {
	constructor(client, repl, path) {
		this.client = client;
		this.repl = repl;
		this.path = path;
	}
	async read() {
		return (await this.repl.crosis.read(this.path)).toString();
	}
	async write(content) {
		return (await this.repl.crosis.write(this.path, content));
	}
}

class ReplFolder {
	constructor(client, repl, path) {
		this.client = client;
		this.repl = repl;
		this.path = path;
	}
}

module.exports = ReplitClient;