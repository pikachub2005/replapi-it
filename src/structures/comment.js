class Comment {
	constructor(client, data = {}) {
		this.client = client;
		for (let [key, value] of Object.entries(data)) {
			this[key] = value;
		}
	}
}

module.exports = Comment;