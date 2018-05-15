const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const rp = require('request-promise-native');
const utility = require('../../services/utility.js')

let options = {
    method: 'GET',
    uri: 'http://www.reddit.com/r/ik_ihe/hot.json?limit=1',
    json: true
}

module.exports = class RedditCommand extends Command{
    constructor(client) {
		super(client, {
			name: 'reddit',
			aliases: [],
			group: 'reddit',
			memberName: 'reddit',
			description: 'Returns the selected reddit post from the selected subreddit',
			examples: ['!reddit [subreddit] [post number]'],
			throttling: {
				usages: 2,
				duration: 10
			}, args: [
                {
                    key: 'reddit',
                    prompt: 'What subreddit should I search?',
                    type: 'string'
                },
                {
                    key: 'post',
                    prompt: 'what post(number) should I get?',
                    type: 'string',
                    default: '1'
                }
            ]
		});
    }

    
    async run(msg, {reddit, post}){
        const searchingMsg = await msg.say("Searching...");
        let number = post
        if(post == 'random'){
            number = utility.random(1, 10)
        }

        options.uri = 'http://www.reddit.com/r/' + reddit + '/hot.json?'
        rp(options)
            .then((result) => {
                searchingMsg.edit('https://www.reddit.com' + result.data.children[number].data.permalink)
            })
            .catch((err) => {
                console.log(err)
                searchingMsg.edit('Couldn\'t get your post :\(')
            })
    }
}