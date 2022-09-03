const Collection = require('../structures/collection');
const UserEvent = require('../structures/userevent');

class UserEventManager {
	#client;
	constructor(client) {
		this.#client = client;
		this.cache = new Collection();
	}
	async fetch(options = {}) {
		options = {cache: true, limit: 10, ...options};
		let res = await this.#client.graphql({query: 'userEvents', variables: {count: options.limit, after: ''}});
		let events = res.events.items;
		let c = new Collection();
		for (let e of events) {
			let event = new UserEvent(this.#client);
			await event.update(e);
			if (options.cache) this.cache.set(event.id, event);
			c.set(event.id, event);
		}
		return c;
	}
}

module.exports = UserEventManager;