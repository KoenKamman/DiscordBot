const optional = require("optional");
const {token} = optional('./secret.json');

module.exports = {
	token: process.env.TOKEN || token,
	prefix: process.env.PREFIX || "!"
};