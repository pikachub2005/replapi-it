const Collection = require('../structures/collection');
const {User} = require('../structures/user');

class UserManager {
	#client;
	constructor(client) {
		this.#client = client;
		this.cache = new Collection();
	}
	async fetch(userResolvable, options = {}) {
		options = {force: false, cache: true, ...options};
		let query, variables;
		switch (typeof userResolvable) {
			case 'string':
				[query, variables] = ['userByUsername', {username: userResolvable}];
				break;
			case 'number':
				[query, variables] = ['user', {id: userResolvable}];
				break;
			case 'object':
				if (userResolvable.username) {
					[query, variables] = ['userByUsername', {username: userResolvable.username}];
					break;
				} else if (userResolvable.id) {
					[query, variables] = ['user', {id: userResolvable.id}];
					break;
				}
			default:
				return null;
		}
		if (!options.force) {
			let [property, value] = Object.entries(variables)[0];
			let match = this.cache.find(user => String(user[property]).toLowerCase() == String(value).toLowerCase());
			if (match) return match;
		}
		let res = await this.#client.graphql({query, variables});
		if (!res[query]) return null;
		let user = new User(this.#client);
		await user.update(res[query]);
		if (options.cache) this.cache.set(user.username, user);
		return user;
	}
	async search(query, options = {}) {
		options = {cache: true, limit: 10, ...options};
		let res = await this.#client.graphql({query: 'userSearch', variables: {query, limit: options.limit}});
		let users = res.usernameSearch;
		let c = new Collection();
		for (let u of users) {
			let user = new User(this.#client);
			await user.update(u);
			if (options.cache) this.#client.users.cache.set(user.username, user);
			c.set(user.username, user);
		}
		return c;
	}
}

module.exports = UserManager;