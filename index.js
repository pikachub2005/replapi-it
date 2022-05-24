const ReplitClient = require(__dirname + "/ReplitClient.js");

const client = new ReplitClient(process.env.PikachuB2005);

client.on("ready", async () => {
	let user = await client.user;
	let repls = await user.repls.fetch();
	let repl = repls.first();
	console.log(repl);
})

