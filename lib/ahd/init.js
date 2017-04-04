const path = require("path"),
	fs = require("fs-extra"),
	colors = require("colors"),
	config = require("../../config");

const init = module.exports = {};

function writeln(msg) {
	msg = msg || "";
	process.stdout.write(msg + "\n");
}

init.exec = function() {
	writeln("Initialized ahd:".green);

	if (fs.existsSync(config._ahdConf)) {
		const backup = config._ahdConf + "." + new Date().getTime();

		fs.copySync(config._ahdConf, backup);

		writeln("    Backup .ahdrc to .ahdrc.<currentTime>".yellow);
		writeln(`        ${config._ahdConf} -> ${backup}`.cyan);
	}

	fs.copySync(config._ahdConfTpl, config._ahdConf, {overwrite : true});
	fs.ensureDirSync(config._saveDir);

	writeln("    Created ahd configuration file: ".yellow + " " + config._ahdConf.cyan);
	writeln("    Created custom header save directory: ".yellow + " " + config._saveDir.cyan);
};