const Collection = require("../utils/collection");
const Comment = require("../structures/comment.js");
const Queries = require("../utils/queries.js");

class CommentManager {
	constructor (client, parent) {
		this.client = client;
		this.cache = new Collection();
		if (parent) {
			let type = parent.constructor.name;
			if (type == "ClientUser" || type == "User") this.user = parent;
			if (type == "Post") this.post = parent;
			if (type == "Repl") this.repl = parent;
		}
	}
	async fetch() {
		let args = [...arguments];
		if (!(this.user || this.post || this.repl)) {
			let id = args[0];
			return await this.client.graphql(Queries.comment, {id: id});
		}
		let count = args[0];
		if (this.user) {
			for (let comment of (await this.client.graphql(Queries.userComments, {username: this.user.username})).userByUsername.comments.items) {
				let c = new Comment(this.client, comment);
				if (!this.client.comments.cache.has(c.id)) this.client.comments.cache.set(c.id, c);
				if (!this.cache.has(c.id)) this.cache.set(c.id, c);
			}
			return this.cache;
		}
		if (this.repl) {
			for (let comment of (await this.client.graphql(Queries.replComments, {id: this.repl.id})).repl.comments.items) {
				let c = new Comment(this.client, comment);
				if (!this.client.comments.cache.has(c.id)) this.client.comments.cache.set(c.id, c);
				if (!this.cache.has(c.id)) this.cache.set(c.id, c);
			}
			return this.cache;
		}
		if (this.post) {
			// console.log(await this.client.graphql(Queries.postComments, {id: this.post.id}));
			// for (let comment of (await this.client.graphql(Queries.postComments, {id: this.post.id})).post.comments.items) {
			// 	let c = new Comment(this.client, comment);
			// 	if (!this.client.comments.cache.has(c.id)) this.client.comments.cache.set(c.id, c);
			// 	if (!this.cache.has(c.id)) this.cache.set(c.id, c);
			// }
			return this.cache;
		}
	}
}

module.exports = CommentManager;