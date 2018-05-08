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

let races_EU = [];
let classes_EU = [];
let races_US = [];
let classes_US = [];

refreshRacesAndClasses();

function refreshRacesAndClasses() {
	const promises = [
		getRaces('EU'),
		getRaces('US'),
		getClasses('EU'),
		getClasses('US')
	];

	return Promise.all(promises)
		.then((result) => {
			races_EU = result[0].races;
			races_US = result[1].races;
			classes_EU = result[2].classes;
			classes_US = result[3].classes;
		});
}

function findCharacterRace(character) {
	if (character.region === 'EU') {
		return races_EU.find(item => item.id === character.race);
	} else if (character.region === 'US') {
		return races_US.find(item => item.id === character.race);
	}
}

function findCharacterClass(character) {
	if (character.region === 'EU') {
		return classes_EU.find(item => item.id === character.class);
	} else if (character.region === 'US') {
		return classes_US.find(item => item.id === character.class);
	}
}

function getRaces(region) {
	options.uri = "https://" + region + ".api.battle.net/wow/data/character/races";
	return rp(options);
}

function getClasses(region) {
	options.uri = "https://" + region + ".api.battle.net/wow/data/character/classes";
	return rp(options);
}

function getCharacter(region, realm, name) {
	options.uri = "https://" + region + ".api.battle.net/wow/character/" + realm + "/" + name;
	let character;
	let charRace;
	let charClass;

	return rp(options)
		.then((result) => {
			character = result;
			character.region = region.toUpperCase();
			charRace = findCharacterRace(character);
			charClass = findCharacterClass(character);

			if (!charRace || !charClass) {
				return refreshRacesAndClasses()
					.then(() => {
						charRace = findCharacterRace(character);
						charClass = findCharacterClass(character);
					});
			}
		})
		.then(() => {
			character.race = charRace.name.toUpperCase();
			character.class = charClass.name.toUpperCase();
			character.faction = charRace.side.toUpperCase();
			return character;
		});
}

module.exports = {
	getRaces,
	getClasses,
	getCharacter
};
