const wow = require('../../services/wow');
const { Command } = require('discord.js-commando');

module.exports = class ArmoryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'armory',
			aliases: [],
			group: 'world of warcraft',
			memberName: 'armory',
			description: 'Returns a world of warcraft player character',
			examples: ['armory Noctare Tarren-Mill EU'],
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
		const searchingMsg = await msg.say("Searching...");
		return wow.getCharacter(region, realm, character)
			.then((character) => {
				const data = [];

				data.push(`\`\`\`python`);
				data.push(`${character.name} | ${character.level} ${character.race} ${character.class} | ${character.realm} | ${character.faction} | ${character.region}`);
				data.push(`\`\`\``);

				data.push(`\`\`\`python`);
				data.push(`${character.totalHonorableKills} Honorable Kills`);
				data.push(`${character.achievementPoints} Achievement Points`);
				data.push(`\`\`\``);

				return searchingMsg.edit(data);
			})
			.catch((result) => {
				if (result.statusCode === 404) {
					return searchingMsg.edit("Character not found.");
				} else {
					return searchingMsg.edit("Something went wrong.");
				}
			});
	}
};
