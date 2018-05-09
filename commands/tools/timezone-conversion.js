const { Command } = require('discord.js-commando');
const moment = require('moment-timezone');

module.exports = class TimezoneConversion extends Command {
    constructor(client) {
        super(client, {
            name: 'tc',
	        group: 'tools',
	        memberName: 'tc',
            description: 'Converts the given time in given timezone to the time in the requested timezone',
            examples: [''],
            args: [
                {
                    key: 'time',
                    prompt: 'What time needs to be converted?',
                    type: 'integer'
                },
                {
                    key: 'timezoneFrom',
                    prompt: 'What timezone is the time being converted from?',
                    type: 'string'
                },
                {
                    key: 'timezoneTo',
                    prompt: 'What timezone is the time being converted to?',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { time, timezoneFrom, timezoneTo }) {
        let date = new Date();
        date.getDate();
        console.log('Current date: ' + date);

        date.set
        console.log('Updated date: ' + date);

        let toConvert = moment.tz(date, timezoneFrom);
        let converted = toConvert.clone().tz(timezoneTo);
        converted.format();

    }
};