const optional = require("optional");
const secret = optional('./secret.json');

// Construct mongodb connection url
const user = process.env.MONGO_USER || secret.mongoUser;
const password = process.env.MONGO_PASSWORD || secret.mongoPassword;
const dbName = process.env.MONGO_NAME || secret.mongoName;
const port = process.env.MONGO_PORT || secret.mongoPort;
const host = process.env.MONGO_HOST || secret.mongoHost;
const url = `mongodb://${user}:${password}@${host}:${port}/${dbName}`;

module.exports = {
	discordToken: process.env.DISCORD_TOKEN || secret.discordToken,
	blizzardToken: process.env.BLIZZARD_TOKEN || secret.blizzardToken,
	mongoName: dbName,
	mongoUrl: url
};
