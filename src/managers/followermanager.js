const Collection = require('../structures/collection');

class FollowerManager {
	#client;
	#user;
	constructor(client, user) {
		this.#client = client;
		this.cache = new Collection();
		this.#user = user;
	}
	async fetch(options = {}) {
		options = { cache: true, limit: 10, ...options };
		let res = await this.#client.graphql({ query: 'followers', variables: { username: this.#user.username, count: options.limit } });
		let users = res.userByUsername.followers.items;
		let c = new Collection();
		for (let u of users) {
			let user = new this.#client.User(this.#client);
			await user.update(u);
			if (options.cache) {
				this.cache.set(user.username, user);
				this.#client.users.cache.set(user.username, user);
			}
			c.set(user.username, user);
		}
		return c;
	}
}

module.exports = FollowerManager;