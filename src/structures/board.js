class Board {
	constructor(client, data = {}) {
		this.client = client;
		for (let [key, value] of Object.entries(data)) {
			if (key == "timeCreated") {this.timeCreated = new Date(value); continue};
			if (key == "timeUpdated") {this.timeUpdated = new Date(value); continue};
			this[key] = value;
		}
	}
}

module.exports = Board