const fs = require('fs-extra'),
	writeln = require("./utils").writeln,
	config = require("../../config");

const list = module.exports = {};

list.exec = function(args, opt) {

	if ("enable" in opt) {
		const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);
		enableHeaders.forEach(header => {
			writeln("    [E] ".bold.green + header.cyan);
		});
	} else if ("disable" in opt) {
		const headers = fs.readdirSync(config._saveDir);
		const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);
		headers.forEach(header => {
			if (!enableHeaders.includes(header)) {
				writeln("    [D] ".bold.red + header.cyan);
			}
		});
	} else {
		const headers = fs.readdirSync(config._saveDir);
		const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);
		headers.forEach(header => {
			if (!enableHeaders.includes(header)) {
				writeln("    [D] ".bold.red + header.gray);
			} else {
				writeln("    [E] ".bold.green + header.cyan);
			}
		});
	}
};