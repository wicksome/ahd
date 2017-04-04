const path = require('path'),
	fs = require('fs-extra'),
	config = require('../../config'),
	colors = require('colors'),
	editor = require('editor');

const remove = module.exports = {};
const _func = {};

function write(msg) {
	msg = msg || "";
	process.stdout.write(msg);
}

function writeln(msg) {
	msg = msg || "";
	write(msg + "\n");
}

_func.headerFindHelper = function(header) {
	let headerHelpMag = "Did you find this?".cyan + "\n";
	let existMatchHeader = false;
	const reg = new RegExp(header);

	fs.readdirSync(config._saveDir).forEach(header => {
		if (reg.test(header)) {
			existMatchHeader = true;
			headerHelpMag += `    ${header}\n`;
		}
	});

	if (existMatchHeader) {
		writeln();
		write(headerHelpMag);
	}
};

/** main */
remove.exec = function(args) {
	const header = args.shift();
	const headerPath = path.join(config._saveDir, header);

	if (fs.existsSync(headerPath)) {
		fs.removeSync(headerPath);
		writeln("Removed header: ".green + header.white);
		writeln("    " + headerPath);
	} else {
		writeln("Not exist header: ".yellow + header.white);
		_func.headerFindHelper(header);
	}
};