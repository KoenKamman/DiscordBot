const optional = require("optional");
const secret = optional('./secret.json');

module.exports = {
	discordToken: process.env.DISCORD_TOKEN || secret.discordToken,
	blizzardToken: process.env.BLIZZARD_TOKEN || secret.blizzardToken,
	prefix: process.env.PREFIX || "!"
};