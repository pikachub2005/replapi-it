class UserEvent {
	#client;
	constructor(client) {
		this.#client = client;
	}
	async update(data) {
		let {timeUpdated, user, repl, following, comment, ...properties} = data;
		Object.entries(properties).forEach(([property, value]) => this[property] = value);
		if (timeUpdated) this.timeUpdated = new Date(timeUpdated);
		if (user) this.user = await this.#client.users.fetch(user);
		if (repl) this.repl = await this.#client.repls.fetch(repl);
		if (following) this.following = await this.#client.users.fetch(following);
		if (comment) this.comment = await this.#client.comments.fetch(comment);
		return this;
	}
}

module.exports = UserEvent;