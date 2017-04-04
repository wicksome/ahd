var path = require('path'),
	fs = require('fs-extra'),
	config = require('../../config'),
	ahdrc = require("rc")(config.title),
	colors = require('colors'),
	execa = require("execa"),
	editor = require('editor');

const add = module.exports = {};

function writeln(msg) {
	msg = msg || "";
	process.stdout.write(msg + "\n");
}

add.exec = function(args) {
	const header = args.shift();
	const headerPath = path.join(config._saveDir, header);
	let isAlreadyHeader = false;

	if (fs.existsSync(headerPath)) {
		isAlreadyHeader = true;
		writeln("Already exist header: ".yellow);
		writeln(`    ${header}`);
	}

	fs.ensureFileSync(headerPath);

	if (ahdrc.conf.editor) {
		execa(ahdrc.conf.editor, [headerPath]);
	} else {
		editor(headerPath, function(code, sig) {
			const msg = "Finished " + (isAlreadyHeader ? "edit" : "add") + " with code " + code;
			writeln(msg.green);
		});
	}
};