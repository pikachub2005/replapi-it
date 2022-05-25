const Crosis = require("crosis4furrets");

class Repl {
	constructor(client, data = {}) {
		this.client = client;
		for (let [key, value] of Object.entries(data)) {
			if (key == "user") {
				if (this.client.users.cache.has(value.username)) {
					this.user = this.client.users.cache.get(value.username);
				} else {
					this.client.users.getUser(value.username).then(user => this.user = user);
				};
				continue;
			}
			if (key == "timeCreated") {this.timeCreated = new Date(value); continue};
			if (key == "timeUpdated") {this.timeUpdated = new Date(value); continue};
			if (key == "lang") {this.language = value.id; continue};
			this[key] = value;
		}
		this.crosis = new Crosis(this.client.sid, this.id);
		this.files = new ReplFileManager(this.client, this);
	}
	async delete() {
		let req = await this.client.graphql(Queries.deleteRepl, {id: this.id});
		return req.deleteRepl
	}
}

module.exports = Repl;