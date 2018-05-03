const wow = require('../../services/wow');
const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ArmoryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'armory-embed',
			aliases: [],
			group: 'world of warcraft',
			memberName: 'armory-embed',
			description: 'Returns a world of warcraft player character',
			examples: ['armory-embed Noctare Tarren-Mill EU'],
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'character',
					prompt: 'What is the character name?',
					type: 'string'
				},
				{
					key: 'realm',
					prompt: 'What is the realm called?',
					type: 'string'
				},
				{
					key: 'region',
					prompt: 'Which region is the realm located in?',
					type: 'string',
					validate: region => {
						if (region.toUpperCase() === 'EU' || region.toUpperCase() === 'US') return true;
						return 'Please enter a valid region';
					}
				},
			]
		});
	}

	async run(msg, { character, realm, region }) {
		return wow.getCharacterData(region, realm, character)
			.then((character) => {
				let embed = new RichEmbed()
					.setTitle(`${character.name} | ${character.level} ${character.race} ${character.class} | ${character.realm} | ${character.faction} | ${character.region}`)
					.setDescription(
						`${character.totalHonorableKills} Honorable Kills\n` +
						`${character.achievementPoints} Achievement Points`
					)
					.setThumbnail("http://render-" + region + ".worldofwarcraft.com/character/" + character.thumbnail);

				if (character.faction === "HORDE") {
					embed.setColor("#950008")
				} else if (character.faction === "ALLIANCE") {
					embed.setColor("#1d337f")
				} else {
					embed.setColor("#eecd20")
				}

				return msg.embed(embed);
			})
			.catch((result) => {
				if (result.statusCode === 404) {
					return msg.say("Character not found.");
				} else {
					return msg.say("Something went wrong.");
				}
			});
	}
};
