const { Command } = require('discord.js-commando');

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: [],
			group: 'music',
			memberName: 'play',
			description: 'streams radio',
			examples: ['play'],
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'url',
					prompt: 'What is the stream url?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { url }) {
		const channel = msg.member.voiceChannel;
		const broadcast = this.client.createVoiceBroadcast();
		channel.join()
			.then((connection) => {
				const dispatcher = broadcast.playStream(url, {volume: 0.1});
				connection.playBroadcast(broadcast);
				connection.on('disconnect', () => {
					dispatcher.end();
					broadcast.destroy();
				});
			});
	}
};
