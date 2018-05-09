const { Command } = require('discord.js-commando');
const yt = require('../../services/youtube.js');

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: [],
			group: 'music',
			memberName: 'play',
			description: 'Connects to a voice channel and starts playing music',
			examples: ['play [youtube-url/audio-stream-url]'],
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'url',
					prompt: 'What is the youtube/radio url?',
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
					if(yt.isValidUrl(url)) {
						stream = yt.getAudioStreamFromUrl(url);
					} else {
						stream = url;
					}
					const dispatcher = connection.playStream(stream, streamOptions);
					this.client.on('voiceStateUpdate', () => {
						const channelMembers = Array.from(connection.channel.members.values());
						if (channelMembers.length === 1) {
							channel.leave();
						}
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
