const ReplManager = require("../managers/replmanager.js");
const Dashboard = require("./dashboard.js");
const PostManager = require("../managers/postmanager.js");
const CommentManager = require("../managers/commentmanager.js");

class User {
	constructor(client, data = {}) {
		this.client = client;
		this.repls = new ReplManager(this.client, this);
		this.posts = new PostManager(this.client, this);
		this.comments = new CommentManager(this.client, this);
		for (let [key, value] of Object.entries(data)) {
			if (key == "roles") {this.roles = value.map(r => new Role(this.client, r)); continue};
			if (key == "timeCreated") {this.timeCreated = new Date(value); continue};
			this[key] = value;
		}
	}
}

class ClientUser extends User {
	constructor(client, data = {}) {
		super(client, data);
		this.dashboard = new Dashboard(this.client);
	}
}

class Role {
	constructor(client, data = {}) {
		this.client = client;
		for (let [key, value] of Object.entries(data)) {
			this[key] = value;
		}
	}
}

module.exports = {User, ClientUser};