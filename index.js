//const Client = require("pika-replitclient");
const Client = require(__dirname + "/src/index.js");
const client = new Client(process.env.PikachuB2005);

client.on("ready", async () => {
	let repls = await client.user.repls.fetch();
	let repl = repls.find(r => r.title == "pika-replitclient");
	let files = repl.files;
	await repl.connect();
	console.log(await files.read("src/index.js"));
	await repl.disconnect();
})