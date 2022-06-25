const Client = require("./src/index.js");
const client = new Client(process.env.PikachuB2005);

client.on("ready", async () => {
	await client.user.dashboard.move("90a1f5b2-4545-4c98-b779-733d2836062c", ["40c2d702-8f67-4b0a-9b26-8a3dfb09f855"])
})