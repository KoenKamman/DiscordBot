const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leave',
			aliases: [],
			group: 'music',
			memberName: 'leave',
			description: 'Disconnects from the voice channel',
			examples: ['leave'],
			throttling: {
				usages: 2,
				duration: 10
			}
		});
	}

	async run(msg) {
		const channel = msg.member.voiceChannel;
		channel.leave();
	}
};
