const { Command } = require('discord.js-commando');
const youtube = require('../../services/youtube.js');
const ytdl = require('ytdl-core');

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: [],
			group: 'music',
			memberName: 'play',
			description: 'Connects to a voice channel and starts playing music',
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
		const streamOptions = {volume: 0.1};
		if (channel) {
			channel.join()
				.then((connection) => {
					let stream;
					if(youtube.isValidYouTubeUrl(url)) {
						stream = ytdl(url, {filter: 'audioonly'});
					} else {
						stream = url;
					}
					const dispatcher = connection.playStream(stream, streamOptions);
					dispatcher.on('end', () => {
						console.log('ended');
					});
					connection.on('disconnect', () => {
						dispatcher.end();
					});
				});
		} else {
			msg.reply("please join a voice channel!");
		}
	}
};
