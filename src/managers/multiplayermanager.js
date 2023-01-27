const Collection = require('../structures/collection');

class MultiplayerManager {
	#client;
	#repl;
	constructor(client, repl) {
		this.#client = client;
		this.cache = new Collection();
		this.#repl = repl;
	}
	async invite(userResolvable) {
		let user = await this.#client.users.fetch(userResolvable);
		if (!user) return;
		await this.#client.graphql({ query: this.#client.queries.addMultiplayer, variables: { username: user.username, replId: this.#repl.id, type: 'rw' } });
	}
	async remove(userResolvable) {
		let user = await this.#client.users.fetch(userResolvable);
		if (!user) return;
		await this.#client.graphql({ query: this.#client.queries.removeMultiplayer, variables: { username: user.username, replId: this.#repl.id } });
	}
}

module.exports = MultiplayerManager;