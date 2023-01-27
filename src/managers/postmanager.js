const Collection = require('../structures/collection');
const Post = require('../structures/post');

class PostManager {
	#client;
	#parent;
	constructor(client, parent) {
		this.#client = client;
		this.cache = new Collection();
		this.#parent = parent;
		if (!this.#parent.constructor.name == 'Client') delete this.trending;
	}
	async fetch() {
		let res;
		switch(this.#parent.constructor.name) {
			case 'Client':
				let [id, options2 = {cache: true}] = [...arguments];
				res = await this.#client.graphql({query: this.#client.queries.post, variables: {id}});
				if (!res.post) return null;
				let post = new Post(this.#client);
				await post.update(res.post);
				if (options2.cache) this.cache.set(post.id, post);
				return post;
			case 'User':
			case 'CurrentUser':
				let [options = {}] = [...arguments];
				options = {cache: true, limit: 10, order: 'new', ...options};
				res = await this.#client.graphql({query: this.#client.queries.userPosts, variables: {username: this.#parent.username, count: options.limit}});
				let posts = res.userByUsername.posts.items;
				let c = new Collection();
				for (let p of posts) {
					let post = new Post(this.#client);
					await post.update(p);
					if (options.cache) this.cache.set(post.id, post);
					c.set(post.id, post);
				}
				return c;
		}
	}
	async trending(options = {}) {
		options = {cache: true, limit: 10, tags: [], ...options};
		let res = await this.#client.graphql({query: this.#client.queries.trending, variables: {options: {searchQuery: options.search, count: options.limit, order: options.order, tags: options.tags}}});
		let posts = res.replPosts.items;
		let c = new Collection();
		for (let p of posts) {
			let post = new Post(this.#client);
			await post.update(p);
			if (options.cache) this.cache.set(post.id, post);
			c.set(post.id, post);
		}
		return c;
	}
}

module.exports = PostManager;