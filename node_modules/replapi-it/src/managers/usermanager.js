const Collection = require("../utils/collection.js");
const {User, ClientUser} = require("../structures/user.js");
const Queries = require("../utils/queries.js");

class UserManager {
	constructor(client) {
		this.client = client;
		this.cache = new Collection();
	}
	async fetch(username, force = false) {
		if (!force && this.cache.has(username)) return this.cache.get(username);
		let user = new User(this.client, (await this.client.graphql(Queries.user, {username: username})).userByUsername);
		this.cache.set(user.username, user);
		return user;
	}
	async fetchClientUser() {
		let user = new ClientUser(this.client, (await this.client.graphql(Queries.clientUser)).currentUser);
		this.cache.set(user.username, user);
		return user;
	}
}

module.exports = UserManager;