const fs = require('fs-extra'),
	config = require("../../config");

const list = module.exports = {};

function writeln(msg) {
	msg = msg || "";
	process.stdout.write(msg + "\n");
}

list.exec = function(args, opt) {
	const headers = fs.readdirSync(config._saveDir);

	if ("enable" in opt) {
		headers.forEach(header => {
			writeln("    [E] ".bold.green + header.cyan);
		});
	} else if ("disable" in opt) {
		headers.forEach(header => {
			writeln("    [D] ".bold.red + header.cyan);
		});
	} else {
		headers.forEach(header => {
			writeln("    [E] ".bold.green + header.cyan);
		});
	}
};