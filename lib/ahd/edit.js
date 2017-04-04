const config = require("../../config"),
	fs = require("fs-extra"),
	conf = require("rc")(config.title),
	execa = require("execa"),
	colors = require('colors'),
	path = require("path"),
	editor = require('editor');

const edit = module.exports = {};
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

edit.exec = function(args) {
	const header = args.shift();
	const headerPath = path.join(config._saveDir, header);

	if (!fs.existsSync(headerPath)) {
		writeln("Not exist header.".yellow);
		writeln(`    ${header.white}`);
		_func.headerFindHelper(header);
		return;
	}

	fs.ensureFileSync(headerPath);

	if (conf.conf.editor) {
		execa(conf.conf.editor, [headerPath]);
	} else {
		editor(headerPath, function(code, sig) {
			writeln('Finished editing with code '.green + code);
		});
	}
};