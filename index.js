const Client = require("replapi-it");
const client = new Client(process.env.PikachuB2005);

client.on("ready", async () => {
	let user = await client.users.fetch(process.env.REPL_OWNER);
	let repls = await user.repls.fetch();
	console.log("Your newest repl:", repls.first().title);
})