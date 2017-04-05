const config = require('../config'),
	command = require('./ahd/command'),
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
		_func.writeln('ahd v'.cyan + ahd.version.cyan);
		return true;
	}

	if (opt.help) {
		const help = require('./ahd/help');
		help.display();
		return true;
	}

	if (opt.argv.cooked.length !== opt.argv.original.length) {
		console.log("COMMAND ERROR".red);
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

_func.write = function(msg) {
	msg = msg || '';
	process.stdout.write(msg);
};

_func.writeln = function(msg) {
	msg = msg || '';
	_func.write(msg + '\n');
};

/**
 * ahd main.
 * @param cmd - add/delete/edit/init/list/view
 * @param opt - enable/disable/help/version
 */
ahd.exec = function(cmd, opt) {
	_func.writeln();

	if (_func.options(opt)) {
		return;
	}
	_func.command(cmd, opt);
};