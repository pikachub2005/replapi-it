const Collection = require('../structures/collection');
const UserEventManager = require('./usereventmanager');

class FollowingManager {
	#client;
	#user;
	constructor(client, user) {
		this.#client = client;
		this.#user = user;
		this.cache = new Collection();
		this.events = new UserEventManager(this.#client);
	}
	async fetch(options = {}) {
		options = { cache: true, limit: 10, ...options };
		let res = await this.#client.graphql({ query: this.#client.queries.follows, variables: { username: this.#user.username, count: options.limit } });
		let users = res.userByUsername.follows.items;
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
	async setFollowing(userResolvable, val = true, options = { cache: true }) {
		let user = await this.#client.users.fetch(userResolvable);
		if (!user) return false;
		let res = await this.#client.graphql({ query: this.#client.queries.follow, variables: { input: { targetUserId: user.id, shouldFollow: val } } });
		if (!res.setFollowing) return false;
		await user.update(res.setFollowing.targetUser);
		return user.isFollowedByCurrentUser;
	}
}

module.exports = FollowingManager;