const Collection = require("../utils/collection.js");
const Queries = require("../utils/queries.js");
const Repl = require("../structures/repl.js");

class ReplManager {
	constructor(client, user) {
		this.client = client;
		this.cache = new Collection();
		this.user = user;
		if (this.user != this.client.user) {
			delete this.create;
			delete this.trash;
		}
	}
	async fetch() {
	 	let args = [...arguments];
		if (this.user) {
			let count = args[0];
			(await this.client.graphql(Queries.userRepls, {username: this.user.username, count: count})).userByUsername.publicRepls.items.map(repl => new Repl(this.client, repl)).forEach(repl => {
				this.client.repls.cache.set(repl.id, repl);
				this.cache.set(repl.id, repl);
			});
			return this.cache;
		} else {
			let [repl, input] = args;
			if (input == "id") {
				return new Repl(this.client, (await this.client.graphql(Queries.replId, {id: repl})).repl)
			} else {
				return new Repl(this.client, (await this.client.graphql(Queries.replUrl, {url: repl})).repl)
			}
		}
	}
	async create(title, language = "bash") {
		let input = {title: title, language: language};
		let repl = new Repl(this.client, (await this.client.graphql(Queries.createRepl, {"input": input})).createRepl);
		return repl;
	}
	async trash() {
		let repls = (await this.client.graphql(Queries.trash)).clui.trash.view.rows.map(data => new DeletedRepl(this.client, data));
		return repls;
	}
}

class DeletedRepl {
	constructor(client, data = {}) {
		this.client = client;
		for (let [key, value] of Object.entries(data)) {
			if (["title", "language", "description", "time_deleted"].includes(key)) this[key] = value;
		}
	}
	async restore() {
		await this.client.graphql(Queries.restore, {title: this.title});
	}
}

module.exports = ReplManager;