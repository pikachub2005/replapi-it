const MultiplayerManager = require('../managers/multiplayermanager');
const CommentManager = require('../managers/commentmanager');
const FileManager = require('../managers/filemanager');
const Crosis = require('./crosis');
const Database = require('@replit/database');
const Comment = require('./comment');

class Repl {
	#client;
	#layoutState;
	#currentUserPermissions;
	#crosis;
	#env;
	constructor(client) {
		this.#client = client;
		this.#crosis = new Crosis(this.#client, this);
		this.threads = [];
		this.multiplayers = new MultiplayerManager(this.#client, this);
		this.comments = new CommentManager(this.#client, this);
		this.files = new FileManager(this.#client, this);
	}
	async update(data) {
		let {layoutState, owner, timeCreated, timeUpdated, currentUserPermissions, annotationAnchors, multiplayers, database, ...properties} = data;
		Object.entries(properties).forEach(([property, value]) => this[property] = value);
		if (layoutState) this.#layoutState = layoutState;
		if (owner) {
			let u = new this.#client.User(this.#client);
			await u.update(owner);
			this.owner = u;
			if (database) this.database = new Database(`https://kv.replit.com/v0/${database.jwt}`);
			if (this.owner.username != this.#client.user.username) {
				for (let property of ['folderId', 'multiplayerInvites', 'pinnedToProfile', 'powerUpCosts', 'delete', 'change', 'files', 'database']) {
					delete this[property];
				}
			}
		}
		if (timeCreated) this.timeCreated = new Date(timeCreated);
		if (timeUpdated) this.timeUpdated = new Date(timeUpdated);
		if (currentUserPermissions) this.#currentUserPermissions = this.currentUserPermissions = currentUserPermissions;
		if (multiplayers) {
			for (let u of multiplayers) {
				let user = await this.#client.users.fetch(u.username);
				this.multiplayers.cache.set(user.username, user);
			}
		}
		return this;
	}
	get layoutState() {
		return this.#layoutState;
	}
	async fetchThreads(options = {cache: true}) {
		let res = await this.#client.graphql({query: 'replThreads', variables: {id: this.id}});
		let threads = res.repl.annotationAnchors;
		let c = new Collection();
		for (let t of threads) {
			let thread = new Thread(this.#client);
			await thread.update(t);
			if (options.cache) this.threads.set(thread.id, thread);
			c.set(thread.id, thread);
		}
		return c;
	}
	get crosis() {
		return this.#crosis;
	}
	get env() {
		return this.#env
	}
	set env(value) {
		this.#env = value;
	}
	async fork(options = {}) {
		options = {cache: true, title: this.title, description: this.description, language: this.templateInfo.label, isPrivate: this.isPrivate, ...options, originId: this.id};
		let {cache, ...variables} = options;
		let res = await this.#client.graphql({query: 'createRepl', variables: {input: variables}});
		let r = res.createRepl;
		if (!r.id) return null;
		let repl = new Repl(this.#client);
		await repl.update(r);
		if (cache) this.#client.repls.cache.set(repl.id, repl);
		return repl;
	}
	async delete() {
		await this.#client.graphql({query: 'deleteRepl', variables: {id: this.id}});
	}
	async change(options = {}) {
		options = {...options, id: this.id};
		let res = await this.#client.graphql({query: 'updateRepl', variables: {input: options}});
		await this.update(res.updateRepl.repl);
		return this;
	}
	async comment(body, options = {cache: true}) {
		let res = await this.#client.graphql({query: 'sendReplComment', variables: {input: {body, replId: this.id}}});
		if (!res) return null;
		let comment = new Comment(this.#client);
		await comment.update(res.createReplComment);
		if (options.cache) this.#client.comments.cache.set(comment.id, comment);
		return comment;
	}
	async connect() {
		return await this.#crosis.connect();
	}
	async disconnect() {
		return await this.#crosis.disconnect();
	}
}

module.exports = Repl;