const Queries = require("../utils/queries.js");

class Dashboard {
	constructor(client) {
		this.client = client;
		this.folders = [];
	}
	async create(name) {
		return (await this.client.graphql(Queries.dashboardCreateFolder, {name: name})).createReplFolder;
	}
	async delete(id) {
		return await this.client.graphql(Queries.dashboardDeleteFolder, {folderId: id});
	}
	async move(destFolderId, replIds = [], folderIds = []) {
		console.log({replsIds: replIds, folderIds: folderIds, destFolderId: destFolderId})
		return await this.client.graphql(Queries.dashboardMoveItems, {replIds: replIds, folderIds: folderIds, destFolderId: destFolderId});
	}
	async fetch(path = "") {
		let req = (await this.client.graphql(Queries.dashboardItems, {path : path})).currentUser.replFolderByPath;
	}
}

module.exports = Dashboard;