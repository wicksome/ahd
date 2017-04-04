const config = require("../../config"),
	fs = require("fs-extra"),
	execa = require("execa"),
	colors = require('colors'),
	writeln = require("./utils").writeln,
	path = require("path");

const view = module.exports = {};

view.exec = function(args) {
	const keyword = args.shift();

	let existMatchHeader = false;

	const reg = new RegExp(keyword);
	fs.readdirSync(config._saveDir).forEach(header => {
		if (reg.test(header)) {
			existMatchHeader = true;

			writeln(header.bold.green);
			writeln(fs.readFileSync(path.join(config._saveDir, header), "utf8"));
		}
	});

	if (!existMatchHeader) {
		writeln("Not matched headers".yellow);
	}
};