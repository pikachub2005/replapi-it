class Comment {
	#client;
	constructor(client) {
		this.#client = client;
		this.comments = [];
	}
	async update(data) {
		let {timeCreated, timeUpdated, user, repl, post, parentComment, comments, ...properties} = data;
		Object.entries(properties).forEach(([property, value]) => this[property] = value);
		if (timeCreated) this.timeCreated = new Date(timeCreated);
		if (timeUpdated) this.timeUpdated = new Date(timeUpdated);
		if (user) this.user = await this.#client.users.fetch(user);
		if (repl) this.repl = await this.#client.repls.fetch(repl);
		if (post) this.post = await this.#client.posts.fetch(post.id);
		if (parentComment) {
			if (this.#client.comments.cache.has(parentComment.id)) {
				this.parentComment = this.#client.comments.cache.get(parentComment.id)
			} else {
				let comment = new Comment(this.#client);
				await comment.update(parentComment);
				this.parentComment = comment;
			}
		}
		if (comments) {
			for (let c of comments) {
				if (this.#client.comments.cache.has(c.id)) {
					this.comments.push(this.#client.comments.cache.get(c.id));
				} else {
					let comment = new Comment(this.#client);
					let {parentComment, ...c2} = c;
					await comment.update(c2);
					comment.parentComment = this;
					this.comments.push(comment);
				}
			}
		}
		return this;
	}
	async delete() {
		if (this.currentUserPermissions?.delete || this.isAuthor || this.repl?.isOwner) await this.#client.graphql({query: this.#client.queries.deleteCommment, variables: {id: this.id}});
	}
	async reply(body, options = {}) {
		options = {cache: true, mention: true, ...options}
		let res = await this.#client.graphql({query: this.#client.queries.sendReplCommentReply, variables: {input: {body: options.mention ? `@${this.user.username} ${body}` : body, replCommentId: this.id}}});
		if (!res) return null;
		let comment = new Comment(this.#client);
		await comment.update(res.createReplCommentReply);
		if (options.cache) this.#client.comments.cache.set(comment.id, comment);
		return comment;
	}
}

module.exports = Comment;