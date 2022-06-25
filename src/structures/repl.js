const Crosis = require("../utils/crosis.js");
const db = require("@replit/database");
const Queries = require("../utils/queries.js");

class Repl {
	constructor(client, data = {}) {
		this.client = client;
		this.files = new FileManager(this.client, this);
		for (let [key, value] of Object.entries(data)) {
			if (key == "user") {
				if (this.client.users.cache.has(value.username)) {
					this.user = this.client.users.cache.get(value.username);
				} else {
					this.client.users.fetch(value.username).then(user => this.user = user);
				};
				continue;
			}
			if (key == "timeCreated") {this.timeCreated = new Date(value); continue};
			if (key == "timeUpdated") {this.timeUpdated = new Date(value); continue};
			if (key == "lang") {this.language = value.id; continue};
			this[key] = value;
		}
		this.crosis = new Crosis(this.client.sid, this.id);
		this.console = this.crosis.console;
	}
	async delete() {
		let req = await this.client.graphql(Queries.deleteRepl, {id: this.id});
		return req.deleteRepl
	}
	async connect(persist = false) {
		await this.crosis.connect();
		this.env = this.crosis.env;
		if (this.env.REPLIT_DB_URL) this.db = new db(this.env.REPLIT_DB_URL);
		if (persist) await this.crosis.persist();
		return this;
	}
	async disconnect() {
		await this.crosis.close()
	}
	async updateInfo(title = "", description = "") {
		let req = await this.client.graphql(Queries.updateRepl, {input: {
			description: description || this.description,
			id: this.id,
			title: title || this.title
		}});
	}
	async fork() {
		let req = await this.client.graphql(Queries.forkRepl, {input: {originId: this.id, gitRemoteUrl: ""}});
		return await this.client.repls.fetch(req.createRepl.id, "id");
	}
}

class FileManager {
	constructor(client, repl) {
		this.client = client;
		this.repl = repl;
	}
	async read(path, encoding = "utf8") {
		return await this.repl.crosis.read(path, encoding).catch(e => {
			console.log(`Error: ${path} is a directory`);
			process.exit(1);
		})
	}
	async write(path, content = "") {
		await this.repl.crosis.write(path, content);
		return this;
	}
	async readdir(path = ".") {
		return await this.repl.crosis.readdir(path);
	}
	async delete(path) {
		await this.repl.crosis.remove(path);
		return this;
	}
	async mkdir(path) {
		await this.repl.crosis.mkdir(path);
		return this;
	}
	async move(oldPath, newPath) {
		await this.repl.crosis.move(oldPath, newPath);
		return this;
	}
	async snapshot() {
		await this.repl.crosis.snapshot();
	}
}

module.exports = Repl;