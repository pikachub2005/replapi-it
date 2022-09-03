const ReplManager = require('../managers/replmanager');
const FollowerManager = require('../managers/followermanager');
const FollowingManager = require('../managers/followingmanager');
const NotificationManager = require('../managers/notificationmanager');
const PostManager = require('../managers/postmanager');
const datauri = require('datauri');

class User {
	#client;
	constructor(client) {
		this.#client = client;
		this.repls = new ReplManager(this.#client, this);
		this.followers = new FollowerManager(this.#client, this);
		this.following = new FollowingManager(this.#client, this);
		this.posts = new PostManager(this.#client, this);
	}
	async update(data) {
		let {timeCreated, presenceStatus, ...properties} = data;
		Object.entries(properties).forEach(([property, value]) => this[property] = value);
		if (timeCreated) this.timeCreated = new Date(timeCreated);
		if (presenceStatus) {
			this.lastSeen = new Date(presenceStatus.lastSeen);
			this.isOnline = presenceStatus.isOnline;
		}
	}
	async setFollowing(val = true) {
		let res = await this.#client.graphql({query: 'follow', variables: {input: {targetUserId: this.id, shouldFollow: val && true}}});
		if (!res.setFollowing) return false;
		await this.update(res.setFollowing.targetUser);
		return this.isFollowedByCurrentUser;
	}
	async setBlocking(val = true) {
		let res = await this.#client.graphql({query: 'block', variables: {input: {targetUserId: this.id, shouldBlock: val && true}}});
		if (!res.setBlocking) return false;
		await this.update(res.setBlocking);
		return this.isBlockedByCurrentUser;
	}
}

class CurrentUser extends User {
	#client;
	#cannySSOToken;
	#auth = {google: null, github: null, facebook: null};
	#clui;
	constructor(client) {
		super(client);
		this.#client = client;
		this.repls = new ReplManager(this.#client, this);
		this.notifications = new NotificationManager(this.#client);
		delete this.setFollowing;
		delete this.setBlocking;
	}
	async update(data) {
		let {cannySSOToken, googleAuth, githubAuth, facebookAuth, clui, usernameRepl, ...properties} = data;
		super.update(properties);
		this.#cannySSOToken = cannySSOToken;
		if (googleAuth) this.#auth.google = googleAuth.accessToken;
		if (githubAuth) this.#auth.github = githubAuth.accessToken;
		if (facebookAuth) this.#auth.facebook = facebookAuth.accessToken;
		if (clui) this.#clui = clui;
		if (usernameRepl) this.usernameRepl = await this.#client.repls.fetch(usernameRepl);
		return this;
	}
	get cannySSOToken() {
		return this.#cannySSOToken;
	}
	get auth() {
		return this.#auth;
	}
	async change(options = {}) {
		let {image, ...options2} = {...options};
		if (image) {
			let i = await datauri(image).catch(() => {});
			if (i) {
				let data = await axios.post('https://replit.com/data/images/upload', {context: 'profile-image', image: i}, {headers: this.#client.headers}).catch(() => {});
				if (data) options2.profileImageId = data.data.id;
			}
		}
		let res = await this.#client.graphql({query: 'updateUser', variables: {input: options2}});
		await this.update(res.updateCurrentUser);
		return this;
	}
}

module.exports = {User, CurrentUser};