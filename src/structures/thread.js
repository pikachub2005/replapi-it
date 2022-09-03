const Collection = require('./collection');

class Thread {
	#client;
	constructor(client) {
		this.#client = client;
		this.participants = new Collection();
		this.messages = [];
	}
	async update(data) {
		let {timeCreated, timeUpdated, messages, participants, ...properties} = data;
		Object.entries(properties).forEach(([property, value]) => this[property] = value);
		if (timeCreated) this.timeCreated = new Date(timeCreated);
		if (timeUpdated) this.timeUpdated = new Date(timeUpdated);
		if (messages) {
			for (let message of messages) {
				let message = new ThreadMessage(this.#client);
				await message.update(m);
				this.messages.push(message);
			}
		}
		if (participants) {
			for (let u of participants) {
				let user = await this.#client.users.fetch(u);
				this.participants.set(user.username, user);
			}
		}
		return this;
	}
}

class ThreadMessage {
	#client;
	constructor(client) {
		this.#client = client;
	}
	async update(data) {
		let {timeCreated, timeUpdated, user, ...properties} = data;
		Object.entries(properties).forEach(([property, value]) => this[property] = value);
		if (timeCreated) this.timeCreated = new Date(timeCreated);
		if (timeUpdated) this.tiemUpdated = new Date(timeUpdated);
		if (user) this.user = await this.#client.users.fetch(user);
		return this;
	}
}