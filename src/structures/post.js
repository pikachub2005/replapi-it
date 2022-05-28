const Board = require("./board.js");

class Post {
	constructor(client, data = {}) {
		this.client = client;
		for (let [key, value] of Object.entries(data)) {
			if (key == "timeCreated") {this.timeCreated = new Date(value); continue};
			if (key == "timeUpdated") {this.timeUpdated = new Date(value); continue};
			if (key == "user") {
				if (this.client.users.cache.has(value.username)) {
					this.user = this.client.users.cache.get(value.username);
				} else {
					this.client.users.fetch(value.username).then(user => this.user = user);
				};
				continue;
			}
			if (key == "board" && value) {this.board = new Board(this.client, value); continue};
			if (key == "votes") {this.voters = value.items.map(i => i.user.username); continue};
			this[key] = value;
		}
	}
}

module.exports = Post;