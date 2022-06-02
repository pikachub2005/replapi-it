const Client = require(__dirname + "/src/index.js");
const client = new Client(process.env.PikachuB2005);

client.on("ready", async () => {
	let user = await client.users.fetch(process.env.REPL_OWNER);
	let repls = await user.repls.fetch();
	let repl = repls.first();
	console.log("Your newest repl:", repl.title);
})