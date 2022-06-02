const {Client} = require("@replit/crosis");
const {lightfetch} = require("lightfetch-node");
const WebSocket = require("ws");
const EventEmitter = require('events');

class Crosis {
	constructor(token, replId) {
		this.token = token;
		this.replId = replId;
		this.client = new Client();
		this.channels = {};
		this.console = new Console(this);
	}
	async req(url, body) {
		let headers = {
			'X-Requested-With': 'PikachuB2005',
			Referrer: 'https://replit.com',
			Cookie: `connect.sid=${this.token}`,
		};
		if (body) {
			return await lightfetch(url, {method: "POST", headers: headers, body: body})
		} else {
			return await lightfetch(url, {headers: headers})
		}
	}
	async setup() {
		try {await this.console.connect()} catch {delete this.console};
		this.env = JSON.parse(await this.read(".cache/replit/nix/env.json")).entries["replit.nix"].env;
	}
	async connect() {
		let user = this.user = (await this.req("https://replit.com/graphql", {query: "query {currentUser {username, isHacker}}"})).json().data.currentUser;
		this.repl = (await this.req("https://replit.com/graphql", {query: `query Repl($id: String!) {repl(id: $id){... on Repl {id, title, lang{runner: canUseShellRunner, interpreter: usesInterpreter}}}}`, variables: {id: this.replId}})).json().data.repl;
		let t = this;
		await new Promise((res) => {
			this.client.connectOptions = {timeout: 3000};
			this.client.open(
				{
					context: {user: {name: user.username}, repl: {id: this.replId}},
					urlOptions: {secure: true, host: `eval.${user.isHacker ? 'hacker':'global'}.replit.com`},
					fetchConnectionMetadata: async () => {return (await t.req(`https://replit.com/data/repls/${t.replId}/get_connection_metadata`, {clientVersion: '7561851', format: 'pbuf'})).json()},
					WebSocketClass: WebSocket
				},
				({channel}) => {
					if (!channel) return;
					this.channels['chan0'] = channel;
					this.connected = true;
					res();
				}
			);
			this.client.setUnrecoverableErrorHandler((error) => {throw new Error(error.message)});
		});
		await this.setup();
	}
	async persist() {
		let gcsfilesChan = await this.channel('gcsfiles');
		let res = await gcsfilesChan.request({persist: { path: '' }});
		if (res.error) throw new Error('CrosisError: ' + res.error);
		if (res.ok) this.persisting = true;
		return res.ok ? true : false;
	}
	close() {
		this.client.close()
	}
	async channel(name, action = "CREATE") {
		const stored = this.channels[name];
		if (stored) {
			return stored;
		} else {
			const chan = await new Promise((res, rej) => {
				this.client.openChannel({service: name, action}, ({channel, error}) => {
					if(error) rej(error);
					if (channel) res(channel);
				});
			});

			this.channels[name] = chan;
			return chan;
		}
	}
	async read(path, encoding = "utf-8") {
		const filesChan = await this.channel('files');
		let res = await filesChan.request({read: { path }});
		if (res.error) throw new Error('CrosisError: ' + res.error);
		return Buffer.from(res.file.content).toString(encoding);
	}
	async readdir(path, raw = false) {
		const filesChan = await this.channel('files');
		let res = await filesChan.request({readdir: { path }});
		if (res.error) throw new Error('CrosisError: ' + res.error);
		const { files } = res.files || {};
		return raw ? files : files.map((file) => file.path);
	}
	async write(path, file) {
		const filesChan = await this.channel('files');
		let content = Buffer.isBuffer(file) ? file : new TextEncoder().encode(file);
		let res = await filesChan.request({write: { path, content }});
		if (res.error) throw new Error('CrosisError: ' + res.error);
		return res.ok ? true : false;
	}
	async mkdir(path) {
		const filesChan = await this.channel('files');
		let res = await filesChan.request({mkdir: { path }});
		if (res.error) throw new Error('CrosisError: ' + res.error);
		return res.ok ? true : false;
	}
	async remove(path) {
		const filesChan = await this.channel('files');
		let res = await filesChan.request({remove: { path }});
		if (res.error) throw new Error('CrosisError: ' + res.error);
		return res.ok ? true : false;
	}
	async move(oldPath, newPath) {
		const filesChan = await this.channel('files');
		let res = await filesChan.request({move: { oldPath, newPath }});
		if (res.error) throw new Error('CrosisError: ' + res.error);
		return res.ok ? true : false;
	}
}

class Console extends EventEmitter {
	constructor(crosis) {
		super();
		this.crosis = crosis;
	}
	async connect() {
		if (!this.crosis.repl.lang.runner) throw new Error("This language doesn't have a shell runner")
		this.runChan = await this.crosis.channel("shellrun2");
		this.runChan.onCommand((cmd) => {
			if (cmd.output) this.emit("input", cmd.output);
			if (cmd.state) this.running = cmd.state == 1;
		})
	}
	async send(input) {
		this.runChan.send({input: input});
	}
	async run() {
		this.runChan.send({runMain: {}})
	}
	async stop() {
		this.runChan.send({clear: {}})
	}
}
			
module.exports = Crosis;