module.exports = {
	name: 'server',
	aliases: ['guild', 'group'],
	cooldown: 5,
	description: 'Returns information about the server',
	execute(message, args) {
		const data = [];

		data.push(`**Server name:** ${message.guild.name}`);
		data.push(`**Total members:** ${message.guild.memberCount}`);
		data.push(`**Voice region:** ${message.guild.region}`);

		message.channel.send(data);
	},
};
