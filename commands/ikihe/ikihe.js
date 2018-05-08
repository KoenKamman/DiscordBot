const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const rp = require('request-promise-native');

let options = {
    method: 'GET',
    uri: 'http://www.reddit.com/r/ik_ihe/hot.json?limit=1',
    json: true
}

module.exports = class TestCommand extends Command{
    constructor(client) {
		super(client, {
			name: 'ikihe',
			aliases: [],
			group: 'ik',
			memberName: 'reddit',
			description: 'Returns the top reddit post on /r/ik_ihe',
			examples: ['ikihe'],
			throttling: {
				usages: 2,
				duration: 10
			}
		});
    }

    //searchingMsg.edit('https://www.reddit.com' + body.data.children[0].data.crosspost_parent_list[0].permalink)

    
    async run(msg, {}){
        const searchingMsg = await msg.say("lOoKInG fOR mEMEs...");
        rp(options)
            .then((result) => {
                searchingMsg.edit('https://www.reddit.com' + result.data.children[0].data.crosspost_parent_list[0].permalink)
            })
            .catch((err) => {
                searchingMsg.edit('gEeN mEMEs oP dIt mOMEnT')
            })
    }
}