const { Command } = require('discord.js-commando');
const yt = require('../../services/youtube.js');

module.exports = class PauseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pause',
			aliases: [],
			group: 'music',
			memberName: 'pause',
			description: 'Pauses the music player',
			examples: ['pause'],
			throttling: {
				usages: 2,
				duration: 10
			}
		});
	}

	async run(msg) {
		msg.member.voiceChannel.connection.dispatcher.pause();
	}
};
