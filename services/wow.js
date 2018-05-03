const {blizzardToken} = require('../config.js');
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

	getClasses(region) {
		options.uri = "https://" + region + ".api.battle.net/wow/data/character/classes";
		return rp(options);
	},

	getCharacter(region, realm, name) {
		options.uri = "https://" + region + ".api.battle.net/wow/character/" + realm + "/" + name;
		return rp(options);
	},

	getCharacterData(region, realm, name) {
		let character;
		const promises = [
			this.getCharacter(region, realm, name),
			this.getRaces(region),
			this.getClasses(region)
		];

		return Promise.all(promises)
			.then((result) => {
				character = result[0];
				const races = result[1].races;
				const classes = result[2].classes;

				for (let i = 0; i < races.length; i++) {
					if (races[i].id === character.race) {
						character.race = races[i].name.toUpperCase();
						character.faction = races[i].side.toUpperCase();
					}
				}

				for (let i = 0; i < classes.length; i++) {
					if (classes[i].id === character.class) {
						character.class = classes[i].name.toUpperCase();
					}
				}

				character.region = region.toUpperCase();

				return character;
			});
	}
};
