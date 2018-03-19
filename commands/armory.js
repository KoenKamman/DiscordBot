const {blizzardToken} = require('../config.js');
const rp = require('request-promise-native');
const wow = require('../services/wow');
const {prefix} = require('../config.js');

module.exports = {
	name: 'armory',
	aliases: [],
	usage: '[character] [realm] [region]',
	cooldown: 5,
	args: true,
	description: 'Armory info',
	execute(message, args) {
		if (args.length === 3) {

			wow.getCharacterData(args[2], args[1], args[0])
				.then((character) => {
					const data = [];

					data.push(`\`\`\`python`);
					data.push(`${character.name} | ${character.level} ${character.race} ${character.class} | ${character.realm} | ${character.faction} | ${character.region}`);
					data.push(`\`\`\``);

					data.push(`\`\`\`python`);
					data.push(`${character.totalHonorableKills} Honorable Kills`);
					data.push(`${character.achievementPoints} Achievement Points`);
					data.push(`\`\`\``);

					message.channel.send(data);
				})
				.catch((result) => {
					if (result.statusCode === 404) {
						message.channel.send("Character not found.");
					} else {
						message.channel.send("Something went wrong.");
					}
				});

		} else {
			let reply = `You didn't provide enough arguments, ${message.author}!`;

			if (this.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${this.name} ${this.usage}\``;
			}

			message.channel.send(reply);
		}
	}
};