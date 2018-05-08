const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('request');

module.exports = class TestCommand extends Command{
    constructor(client) {
		super(client, {
			name: 'ikihe',
			aliases: [],
			group: 'ik',
			memberName: 'reddit',
			description: 'Return the top reddit post on /r/ik_ihe',
			examples: ['!ik'],
			throttling: {
				usages: 2,
				duration: 10
			}
		});
    }
    
    async run(msg, {test}){
        const searchingMsg = await msg.say("Searching...");
        request.get('http://www.reddit.com/r/ik_ihe/hot.json?limit=1', {json: true}, (err, res, body) =>{
            if(err) {msg.say('gEeN mEMEs OP dIt mOmENt!')}
            searchingMsg.edit('https://www.reddit.com' + body.data.children[0].data.crosspost_parent_list[0].permalink)
        })
    }
}