const { Command } = require('discord.js-commando');
const yt = require('../../services/youtube.js');

module.exports = class ResumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'resume',
			aliases: [],
			group: 'music',
			memberName: 'resume',
			description: 'Resumes the music player',
			examples: ['resume'],
			throttling: {
				usages: 2,
				duration: 10
			}
		});
	}

	async run(msg) {
		msg.member.voiceChannel.connection.dispatcher.resume();
	}
};
