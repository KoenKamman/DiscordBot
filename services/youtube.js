const ytdl = require('ytdl-core');

function isValidUrl(url) {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
		const match = url.match(regExp);
		return !!(match && match[2].length === 11);
}

function getAudioStreamFromUrl(url) {
	return ytdl(url, {filter: 'audioonly'});
}

module.exports = {
	isValidUrl,
	getAudioStreamFromUrl
};
