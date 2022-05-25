const Collection = require("../utils/collection.js");

class ReplManager {
	constructor(client, user) {
		this.client = client;
		this.cache = new Collection();
		this.user = user;
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
}

module.exports = ReplManager;