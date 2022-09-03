const Collection = require('./collection');

class Tutorial {
	#client;
	constructor(client) {
		this.#client = client;
	}
	async update(data) {
		let {post, ...properties} = data;
		Object.entries(properties).forEach(([property, value]) => this[property] = value);
		if (post) {
			let p = new this.#client.Post(this.#client);
			await p.update(post);
			this.post = p;
		}
		return this;
	}
}

module.exports = Tutorial;