var path = require('path'),
	fs = require('fs-extra'),
	config = require('../../config'),
	ahdrc = require("rc")(config.title),
	colors = require('colors'),
	execa = require("execa"),
	utils = require("./utils"),
	editor = require('editor');

const add = module.exports = {};

add.exec = function(args) {
	const header = args.shift();
	const headerPath = path.join(config._saveDir, header);
	let isAlreadyHeader = false;

	if (fs.existsSync(headerPath)) {
		isAlreadyHeader = true;
		utils.writeln("Already exist header: ".yellow);
		utils.writeln(`  ${header}`);
	}

	fs.ensureFileSync(headerPath);

	if (ahdrc.conf.editor) {
		execa(ahdrc.conf.editor, [headerPath]);
	} else {
		editor(headerPath, function(code, sig) {
			const msg = "Finished " + (isAlreadyHeader ? "edit" : "add") + " with code " + code;
			utils.writeln(msg, utils.type.INFO);
		});
	}
};
