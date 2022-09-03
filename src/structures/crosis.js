const {Client} = require('@replit/crosis');
const axios = require('axios');
const WebSocket = require('ws');
const EventEmitter = require('events');

class Crosis {
	constructor(client, repl) {
		this.client = client;
		this.client.connectOptions = {timeout: 3000};
		this.repl = repl;
		this.crosisClient = new Client();
		this.channels = {};
	}
	async connect() {
		await new Promise((res) => {
			this.crosisClient.open(
				{
					context: {user: {name: this.client.user.username}, repl: {id: this.repl.id}},
					urlOptions: {secure: true, host: `eval.${this.client.user.isHacker ? 'hacker' : 'global'}.replit.com`},
					fetchConnectionMetadata: async () => {
						let res = await axios.post(`https://replit.com/data/repls/${this.repl.id}/get_connection_metadata`, {clientVersion: '7561851', format: 'pbuf'}, {headers: this.client.headers});
						return res.data;
					},
					WebSocketClass: WebSocket
				},
				({channel}) => {
					if (!channel) return;
					this.channels['chan0'] = channel;
					this.connected = true;
					res();
				}
			);
			this.crosisClient.setUnrecoverableErrorHandler((error) => {throw new Error(error.message)});
		})
		let envFile = await this.repl.files.read('.env');
		if (envFile) this.repl.env = [...envFile.matchAll(/(.*?)="(.*?)"/gm)].reduce((a, b) => {a[b[1]] = b[2]; return a}, {});
		this.repl.console = new Console(this.client, this.repl);
		await this.repl.console.connect()
	}
	async channel(name, action = "CREATE") {
		const stored = this.channels[name];
		if (stored) {
			return stored;
		} else {
			const chan = await new Promise((res, rej) => {
				this.crosisClient.openChannel({service: name, action}, ({channel, error}) => {
					if (error) rej(error);
					if (channel) res(channel);
				});
			});

			this.channels[name] = chan;
			return chan;
		}
	}
	async disconnect() {
		return await this.crosisClient.close();
	}
}

module.exports = Crosis;

class Console extends EventEmitter {
	#client;
	#repl;
	constructor(client, repl) {
		super();
		this.#client = client;
		this.#repl = repl;
	}
	async connect() {
		if (!this.#repl.lang.canUseShellRunner) return;
		this.runChan = await this.#repl.crosis.channel("shellrun2");
		this.runChan.onCommand((cmd) => {
			this.emit("input", cmd);
			if (cmd.state) this.running = !!cmd.state;
		})
		return true;
	}
	async send(input) {
		return await this.runChan.send({input});
	}
	async run() {
		return await this.runChan.send({runMain: {}})
	}
	async stop() {
		return await this.runChan.send({clear: {}})
	}
}