const config = require('../config'),
	command = require('./ahd/command'),
	isRoot = require("is-root"),
	writeln = require("./ahd/utils").writeln,
	colcors = require('colors');

let ahd = module.exports = {};
let _func = {};

ahd.config = require('../config');
ahd.version = ahd.config.version;

/**
 * exec options.
 * @param opt
 * @return Boolean 작업실행 여부
 */
_func.options = function(opt) {
	if (opt.version) {
		writeln('ahd v'.cyan + ahd.version.cyan);
		return true;
	}

	if (opt.help) {
		const help = require('./ahd/help');
		help.display();
		return true;
	}

	if (opt.argv.cooked.length !== opt.argv.original.length) {
		writeln("COMMAND ERROR".red);
		return true;
	}

	if (opt.enable) {
		require("./ahd/enable").exec(opt.enable);
		return true;
	}

	if (opt["enable-only"]) {
		require("./ahd/enable").execOnlyMatched(opt["enable-only"]);
	}

	if (opt.disable) {
		require("./ahd/disable").exec(opt.disable);
		return true;
	}

	if (opt["enable-all"]) {
		require("./ahd/enable").execAll();
		return true;
	}

	if (opt["disable-all"]) {
		require("./ahd/disable").execAll();
		return true;
	}

	return false;
};

/**
 * exec command.
 * @param cmd
 */
_func.command = function(cmd, opt) {

	let _task = cmd.shift(),
		_args = cmd;

	if (_task) {
		command.exec(_task, _args, opt);
	}
};

/**
 * ahd main.
 * @param cmd - add/delete/edit/init/list/view
 * @param opt - enable/disable/help/version
 */
ahd.exec = function(cmd, opt) {
	writeln();

	if (!isRoot()) {
		writeln(` Please execute as ${"sudo".italic}: sudo ahd `.yellow.bgBlack.bold);
		writeln(
			`because it is needed to access the http.conf and restart server.\n` +
			`In addition, recommend that you add alias in shell conf: ` + `${"alias ahd=\"sudo ahd\"".cyan}`
		);
		process.exit(1);
	}

	if (_func.options(opt)) {
		return;
	}
	_func.command(cmd, opt);
};