const Collection = require('../structures/collection');
const Comment = require('../structures/comment');

class CommentManager {
	#client;
	#parent;
	constructor(client, parent) {
		this.#client = client;
		this.cache = new Collection();
		this.#parent = parent;
	}
	async fetch() {
		switch (this.#parent.constructor.name) {
			case 'Client': {
				let [commentResolvable, options = {cache: true}] = [...arguments];
				let id;
				switch (typeof commentResolvable) {
					case 'number':
						id = commentResolvable;
						break;
					case 'object':
						if (commentResolvable.id) {
							id = commentResolvable.id;
							break;
						}
					default:
						return null
				}
				if (!options.force) {
					let comment = this.cache.find(comment => comment.id == id);
					if (comment) return comment;
				}
				let res = await this.#client.graphql({query: this.#client.queries.replComment, variables: { id } });
				let c = res.replComment;
				if (c.message) return null;
				let comment = new Comment(this.#client);
				await comment.update(c);
				if (options.cache) {
					this.cache.set(comment.id, comment);
					if (comment.comments) {
						for (let reply of comment.comments) {
							this.cache.set(reply.id, reply);
						}
					}
					if (comment.parentComment) this.cache.set(comment.parentComment.id, comment.parentComment);
				}
				return comment;
			}
			case 'Repl': {
				let [options = {}] = [...arguments];
				options = { cache: true, limit: 10, ...options };
				let res = await this.#client.graphql({ query: this.#client.queries.replComments, variables: { id: this.#parent.id, count: options.limit } });
				let comments = res.repl.comments.items;
				let cn = new Collection();
				for (let c of comments) {
					let comment = new Comment(this.#client, this.#parent);
					await comment.update(c);
					if (options.cache) {
						this.cache.set(comment.id, comment);
						this.#client.comments.cache.set(comment.id, comment);
					}
					cn.set(comment.id, comment);
				}
				return cn;
			}
			case 'Post': {
				break;
			}
			case 'CurrentUser':
			case 'User':
				let [options = {}] = [...arguments];
				options = { cache: true, limit: 10, ...options };
				let res = await this.#client.graphql({ query: this.#client.queries.userComments, variables: { input: { userId: this.#parent.id } } });
				return res;
			default:
				return new Collection();
		}
	}
}

module.exports = CommentManager;