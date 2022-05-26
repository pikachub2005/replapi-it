const EventEmitter = require('events');
const axios = require("axios");
const UserManager = require("./managers/usermanager.js");
const ReplManager = require("./managers/replmanager.js");

class ReplitClient extends EventEmitter {
	constructor(sid) {
		if (!sid) throw new Error("Requires your sid. Check your connect.sid cookie.");
		super();
		this.sid = sid;
		this.headers = { 'X-Requested-With': 'replit', 'Origin': 'https://replit.com', 'Accept': 'application/json', 'Referrer': 'https://replit.com', 'Content-Type': 'application/json', 'Connection': 'keep-alive', 'Host': "replit.com", "x-requested-with": "XMLHttpRequest", "User-Agent": "Mozilla/5.0", "Cookie": `connect.sid=${sid}`}
		this.users = new UserManager(this);
		this.repls = new ReplManager(this);
		this.users.fetchClientUser().then(user => {
			this.user = user;
			this.user.dashboard.fetch();
			this.emit("ready");
		});
	}
	async graphql(query, variables = {}) {
		return (await axios.post("https://replit.com/graphql", {query: query, variables: variables}, {headers: this.headers})).data.data
	}
}

module.exports = ReplitClient