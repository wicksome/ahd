const config = require('../config'),
	command = require('./ahd/command'),
	colcors = require('colors');

let ahd = module.exports = {};
let _func = {};

ahd.config = require('../config');
ahd.version = ahd.config.version;

/**
 * ahd main.
 * @param cmd - add/delete/edit/init/list/view
 * @param opt - enable/disable/help/version
 */
ahd.exec = function(cmd, opt) {
	if (_func.options(opt)) {
		return;
	}
	_func.command(cmd);
};

/**
 * exec options.
 * @param opt
 * @return Boolean 작업실행 여부
 */
_func.options = function(opt) {
	console.log(opt);

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
		console.log("ERROR".red);
		return true;
	}

	if (opt.enable) {
		console.log("enable".green);
		return true;
	}

	if (opt.disable) {
		console.log("disable".green);
		return true;
	}

	if (opt["enable-all"]) {
		console.log("enable-all".green);
		return true;
	}

	if (opt["disable-all"]) {
		console.log("disable-all".green);
		return true;
	}

	return false;
};

/**
 * exec command.
 * @param cmd
 */
_func.command = function(cmd) {

	let _task = cmd.shift(),
		_headerName = cmd;

	if (_task) {
		command.exec(_task, _headerName);
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