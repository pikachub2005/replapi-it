const Queries = require("../utils/queries.js");

class DashboardManager {
	constructor(client) {
		this.client = client;
	}
	async create(name) {
		return (await this.client.graphql(Queries.dashboardCreateFolder, {name: name})).createReplFolder;
	}
	async delete(id) {
		return await this.client.graphql(Queries.dashboardDeleteFolder, {folderId: id});
	}
	async move(destFolderId, replIds = [], folderIds = []) {
		return await this.client.graphql(Queries.dashboardMoveItem, {replsIds: replIds, folderIds: folderIds, destFolderId: destFolderId});
	}
	async fetch() {
		let req = (await this.client.graphql(Queries.dashboardItems, {path : ""})).currentUser.replFolderByPath;
		console.log(req);
	}
}

module.exports = DashboardManager;