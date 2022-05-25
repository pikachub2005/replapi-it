const ReplitClient = require(__dirname + "/src/index.js");
const fs = require("fs");

const client = new ReplitClient(process.env.PikachuB2005);

client.on("ready", async () => {
	console.log((await client.user.repls.fetch()).first());
})