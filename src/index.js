const EventEmitter = require('events');
const axios = require("axios");
const UserManager = require("./managers/usermanager.js");
const ReplManager = require("./managers/replmanager.js");
const CommentManager = require("./managers/commentmanager.js");
const PostManager = require("./managers/postmanager.js");
const Queries = require("./utils/queries.js");

class ReplitClient extends EventEmitter {
	constructor(sid) {
		if (!sid) throw new Error("Requires your sid. Check your connect.sid cookie.");
		super();
		this.sid = sid;
		this.headers = { 'X-Requested-With': 'replit', 'Origin': 'https://replit.com', 'Accept': 'application/json', 'Referrer': 'https://replit.com', 'Content-Type': 'application/json', 'Connection': 'keep-alive', 'Host': "replit.com", "x-requested-with": "XMLHttpRequest", "User-Agent": "Mozilla/5.0", "Cookie": `connect.sid=${sid}`}
		this.users = new UserManager(this);
		this.repls = new ReplManager(this);
		this.posts = new PostManager(this);
		this.comments = new CommentManager(this);
		(async function (c) {
			c.user = await c.users.fetchClientUser();
			c.user.dashboard.fetch();
			if (process.env.REPL_ID) c.repl = await c.repls.fetch(process.env.REPL_ID, "id");
			c.emit("ready");
		}) (this)
	}
	async graphql(query, variables = {}) {
		return (await axios.post("https://replit.com/graphql", {query: query, variables: variables}, {headers: this.headers})).data.data
	}
	async fetchLeaderboard() {
		return await this.graphql(Queries.leaderboard);
	}
}

module.exports = ReplitClient