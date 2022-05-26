const ReplClient = require("pika-replitclient");
const client = new ReplClient(process.env.PikachuB2005);

client.on("ready", async () => {
	let user = await client.users.fetch(process.env.REPL_OWNER);
	let repls = await user.repls.fetch();
	console.log("Your most recent repl:", repls.first().title);
})