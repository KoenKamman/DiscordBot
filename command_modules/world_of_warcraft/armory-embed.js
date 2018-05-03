const wow = require('../../services/wow');
const Discord = require('discord.js');
const {prefix} = require('../../config.js');

module.exports = {
	name: 'armory-embed',
	aliases: [],
	usage: '[character] [realm] [region]',
	cooldown: 5,
	args: true,
	description: 'Armory info',
	execute(message, args) {

		if (args.length === 3) {

			wow.getCharacterData(args[2], args[1], args[0])
				.then((character) => {
					let embed = new Discord.RichEmbed()
						.setTitle(`${character.name} | ${character.level} ${character.race} ${character.class} | ${character.realm} | ${character.faction} | ${character.region}`)
						.setDescription(
							`${character.totalHonorableKills} Honorable Kills\n` +
							`${character.achievementPoints} Achievement Points`
						)
						.setThumbnail("http://render-" + args[2] + ".worldofwarcraft.com/character/" + character.thumbnail);

					if (character.faction === "HORDE") {
						embed.setColor("#950008")
					} else if (character.faction === "ALLIANCE") {
						embed.setColor("#1d337f")
					} else {
						embed.setColor("#eecd20")
					}

					message.channel.send({embed});
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
