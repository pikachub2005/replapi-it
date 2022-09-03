const Collection = require('../structures/collection');
const Notification = require('../structures/notification');

class NotificationManager{
	#client;
	#track;
	constructor(client) {
		this.#client = client;
		this.cache = new Collection();
		this.#track = this.#client.track(async () => {
			return await this.#client.user.notifications.fetch();
		}, 60000)
		this.#track.on('update', async notifications => {
			let c = await notifications;
			c.forEach(notification => {
				this.#client.emit('notification', notification);
			})
			if (c.size) {
				await this.markAsRead();
			}
		})
	}
	async fetch(options = {}) {
		options = {cache: true, seen: false, limit: 10, ...options};
		let res = await this.#client.graphql({query: 'notifications', variables: {count: options.limit, seen: options.seen}});
		let notifications = res.notifications.items;
		let c = new Collection();
		for (let n of notifications) {
			let notification = new Notification(this.#client);
			await notification.update(n);
			if (options.cache) this.cache.set(notification.id, notification);
			c.set(notification.id, notification);
		}
		return c;
	}
	async markAsRead() {
		await this.#client.graphql('markAsRead');
		this.#client.user.notificationCount = 0;
	}
	startEvents() {
		this.#track.start();
	}
	stopEvents() {
		this.#track.stop();
	}
}

module.exports = NotificationManager;