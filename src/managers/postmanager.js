const Queries = require("../utils/queries.js");
const Collection = require("../utils/collection.js");
const Post = require("../structures/post.js");
const Repl = require("../structures/repl.js");

class PostManager {
	constructor(client, user) {
		this.client = client;
		this.cache = new Collection();
		this.user = user;
	}
	async fetch(count = 50) {
		let res = (await this.client.graphql(Queries.userPosts, {username: this.user.username})).userByUsername.posts;
		for (let post of res.items) {
			let p = new Post(this.client, post);
			if (p.repl) {
				if (this.client.repls.cache.has(p.repl.id)) {
					p.repl = this.client.repls.cache.get(p.repl.id);
				} else {
					p.repl = await this.client.repls.fetch(p.repl.id, "id");
				};
			}
			this.cache.set(p.id, p);
		}
		return this.cache;
	}
}

module.exports = PostManager;