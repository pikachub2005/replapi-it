class Notification {
	#client;
	constructor(client) {
		this.#client = client;
	}
	async update(data) {
		let {timeCreated, creator, replComment, ...properties} = data;
		Object.entries(properties).forEach(([property, value]) => this[property] = value);
		if (timeCreated) this.timeCreated = new Date(timeCreated);
		if (creator) this.creator = await this.#client.users.fetch(creator);
		if (replComment) this.comment = await this.#client.comments.fetch(replComment);
		return this;
	}
}

module.exports = Notification;