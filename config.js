const optional = require("optional");
const secret = optional('./secret.json');

module.exports = {
	token: process.env.TOKEN || secret.token,
	prefix: process.env.PREFIX || "!"
};