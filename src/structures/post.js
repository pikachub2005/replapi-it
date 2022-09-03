const Collection = require('./collection');
const Comment = require('./comment');

class Post {
	#client;
	constructor(client) {
		this.#client = client;
	}
	async update(data) {
		let { user, repl, timeCreated, timeUpdated, board, replComment, ...properties } = data;
		Object.entries(properties).forEach(([property, value]) => this[property] = value);
		if (user) this.user = await this.#client.users.fetch(user);
		if (repl) this.repl = await this.#client.repls.fetch(repl);
		if (replComment) {
			let comment = new Comment(this.#client, this.repl);
			await comment.update(replComment);
			this.comment = comment;
			this.comment.post = this;
		}
		if (timeCreated) this.timeCreated = new Date(timeCreated);
		if (timeUpdated) this.timeUpdated = new Date(timeUpdated);
		return this;
	}
	async reply(body) {
		return await this.comment.reply(body);
	}
}

module.exports = Post;