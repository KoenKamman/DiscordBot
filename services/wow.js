const { blizzardToken } = require('../config.js');
const rp = require('request-promise-native');

const options = {
	qs: {
		apikey: blizzardToken,
		locale: "en_GB"
	},
	headers: {
		'User-Agent': 'Request-Promise'
	},
	json: true
};

module.exports = {
	getRaces(region) {
		options.uri = "https://" + region + ".api.battle.net/wow/data/character/races";
		return rp(options);
	},

	getRace(region, index) {
		options.uri = "https://" + region + ".api.battle.net/wow/data/character/races";
		return rp(options);
	},

	getCharacter(region, realm, name) {
		options.uri = "https://" + region + ".api.battle.net/wow/character/" + realm + "/" + name;
		return rp(options);
	}
};