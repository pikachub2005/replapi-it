class Team {
	#client;
	constructor(client) {
		this.#client = client;
	}
	async update(data) {
		let {...properties} = data;
		Object.entries(properties).forEach(([property, value]) => this[property] = value);
		return this;
	}
}

module.exports = Team;