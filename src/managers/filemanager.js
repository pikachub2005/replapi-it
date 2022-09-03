class FileManager {
	#client;
	#repl;
	constructor(client, repl) {
		this.#client = client;
		this.#repl = repl;
		this.persisting = false;
	}
	async read(path, encoding = "utf-8") {
		const filesChan = await this.#repl.crosis.channel('files');
		let res = await filesChan.request({ read: { path } });
		if (res.error) return null;
		return Buffer.from(res.file.content).toString(encoding);
	}
	async write(path, file) {
		const filesChan = await this.#repl.crosis.channel('files');
		let content = Buffer.isBuffer(file) ? file : new TextEncoder().encode(file);
		let res = await filesChan.request({ write: { path, content } });
		if (res.error) throw new Error('CrosisError: ' + res.error);
		return res.ok ? true : false;
	}
	async mkdir(path) {
		const filesChan = await this.#repl.crosis.channel('files');
		let res = await filesChan.request({ mkdir: { path } });
		if (res.error) throw new Error('CrosisError: ' + res.error);
		return res.ok ? true : false;
	}
	async remove(path) {
		const filesChan = await this.#repl.crosis.channel('files');
		let res = await filesChan.request({ remove: { path } });
		if (res.error) throw new Error('CrosisError: ' + res.error);
		return res.ok ? true : false;
	}
	async move(oldPath, newPath) {
		const filesChan = await this.#repl.crosis.channel('files');
		let res = await filesChan.request({ move: { oldPath, newPath } });
		if (res.error) throw new Error('CrosisError: ' + res.error);
		return res.ok ? true : false;
	}
	async readdir(path, raw = false) {
		const filesChan = await this.#repl.crosis.channel('files');
		let res = await filesChan.request({ readdir: { path } });
		if (res.error) throw new Error('CrosisError: ' + res.error);
		const { files } = res.files || {};
		return raw ? files : files.map((file) => file.path);
	}
	async recursedir(path = '', raw = false) {
		let allFiles = [];
		let files = await this.readdir(path, true);
		for (let file of files) {
			if (file.type == 1) {
				let a = await this.recursedir(path + '/' + file.path);
				for (let b of a) {
					b.path = file.path + '/' + b.path;
					allFiles.push(b);
				}
			} else {
				allFiles.push(file);
			}
		}
		return allFiles;
	}
	async persist() {
		let gcsfilesChan = await this.#repl.crosis.channel('gcsfiles');
		let res = await gcsfilesChan.request({ persist: { path: '' } });
		console.log(res);
		if (res.error) throw new Error('CrosisError: ' + res.error);
		if (res.ok) this.persisting = true;
		return res.ok ? true : false;
	}
	async snapshot() {
		let filesChan = await this.#repl.crosis.channel('snapshot');
		const res = await filesChan.request({fsSnapshot: {}});
		if (res.error) throw new Error('CrosisError: ' + res.error);
		return res.ok ? true : false;
	}
}

module.exports = FileManager;