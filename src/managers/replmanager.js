const Collection = require('../structures/collection');
const Repl = require('../structures/repl');

class ReplManager {
	#client;
	#user;
	constructor(client, user) {
		this.#client = client;
		this.cache = new Collection();
		if (user) {
			this.#user = user;
			delete this.generateTitle;
		};
		if (this.#user != this.#client.user) {
			delete this.generateTitle;
			delete this.create;
			delete this.delete;
		}
	}
	async fetch() {
		if (this.#user) {
			if (this.#user == this.#client.user) {
				let [options = {}] = [...arguments];
				options = {cache: true, limit: 10, paths: [''], ...options};
				let res = await this.#client.graphql(options.paths.map(path => ({query: 'dashboardRepls', variables: {path, count: options.limit}})));
				let c = new Collection();
				for (let folder of res) {
					let repls = folder.currentUser.replFolderByPath.repls.items
					for (let r of repls) {
						let repl = new Repl(this.#client);
						await repl.update(r);
						if (options.cache) this.cache.set(repl.id, repl);
						c.set(repl.id, repl);
					}
				}
				return c;
			} else {
				//User repls
				let [options = {}] = [...arguments];
				options = {cache: true, limit: 10, search: null, ...options};
				let res = await this.#client.graphql({query: 'profileRepls', variables: {username: this.#user.username, count: options.limit}});
				let repls = res.user.profileRepls.items;
				let c = new Collection();
				for (let r of repls) {
					let repl = new this.#client.Repl(this.#client);
					await repl.update(r);
					if (options.cache) {
						this.cache.set(repl.id, repl);
						this.#client.repls.cache.set(repl.id, repl);
					}
					c.set(repl.id, repl);
				}
				return c;
			}
		} else {
			//Client repls
			let [replResolvable, options = {}] = [...arguments];
			options = {force: false, cache: true, url: false, ...options};
			let variables;
			switch (typeof replResolvable) {
				case 'string':
					variables = options.url ? {url: replResolvable} : {id: replResolvable};
					break;
				case 'object':
					if (replResolvable.id) {
						variables = {id: replResolvable.id};
						break;
					}
				default:
					return null
			}
			if (!options.force) {
				let match = this.cache.find(repl => repl.id == variables.id);
				if (match) return match;
			}
			let res = await this.#client.graphql({query: 'repl', variables});
			let repl = new Repl(this.#client);
			await repl.update(res.repl);
			if (options.cache) this.cache.set(repl.id, repl);
			return repl;
		}
	}
	async generateTitle() {
		let res = await this.#client.graphql('replTitle');
		return res.replTitle;
	}
	async create(options = {}) {
		let {cache, ...variables} = {cache: true, title: await this.generateTitle(), language: 'bash', ...options};
		let res = await this.#client.graphql({query: 'createRepl', variables: {input: variables}});
		let r = res.createRepl;
		if (!r.id) return null;
		let repl = new Repl(this.#client);
		await repl.update(r);
		return repl;
	}
	async delete(replResolvable) {
		let repl = await this.fetch(replResolvable);
		if (repl) {
			await repl.delete();
		}
	}
}

module.exports = ReplManager;