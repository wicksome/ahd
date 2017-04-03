const option = require("./option"),
	command = require("./command"),
	config = require("../../config"),
	colors = require("colors"),
	emoji = require('node-emoji');

const tab = "    ",
	appName = config.title.bold;

let _public = {},
	_private = {};

/**
 * Create Help text.
 * @returns {{}}
 */
_private.createHelp = function() {
	let info = {};

	info.title = "----------------------------------------------------------------------\n";
	info.title += `${emoji.get("rocket")} ${"AHD".bold.white} ${config.version} - Helper you configure Apache headers\n`;
	info.title += "----------------------------------------------------------------------\n";

	info.usage = "  Usage:\n\n".cyan;
	info.usage += `    ${appName} [command] [header-name]`.green + "\n";
	info.usage += `    ${appName} [option] [header-name]`.green + "\n";

	info.command = _private.getCommandHelpText();

	info.options = _private.createOptionHelp();
	info.see = _private.createSeeHelp();

	return info;
};

/**
 * create help text for commands.
 * @returns {string} help text
 */
_private.getCommandHelpText = function() {
	const commands = command.cmdlist;

	let helpText = "  Commands:".cyan + "\n\n";

	let taskLeng = 0;
	let tasks = {};
	Object.keys(commands).forEach(function(task) {
		const cmd = tab + task + (commands[task].arg_name ? ` <${commands[task].arg_name}>` : "");
		if (cmd.length > taskLeng) {
			taskLeng = cmd.length;
		}

		tasks[task] = cmd;
	});

	Object.keys(commands).forEach(function(task) {
		let cmd = _private.pad(tasks[task], taskLeng);

		cmd = cmd.green;
		cmd = `${cmd.replace(/(<.+>)/, "$1".yellow)}`;

		let desc;
		if (commands[task].desc instanceof Array) {
			var i;
			desc = commands[task].desc[0];
			for (i = 1; i < commands[task].desc.length; i++) {
				desc += "\n";
				desc += _private.pad("", taskLeng) + `    ${commands[task].desc[i]}`;
			}
		} else {
			desc = commands[task].desc;
		}
		helpText += cmd.green + "    " + desc.white + "\n";
	});

	return helpText;
};

/**
 * create help text for options.
 * @returns {string} help text
 */
_private.createOptionHelp = function() {
	const options = option.optlist;

	let helpText = "  Options:".cyan + "\n\n";
	let opts = {};
	let maxLang = 0;

	Object.keys(options).forEach(function(key) {
		opts[key] = {
			opt : `    -${options[key].shortcut}, --${options[key].detour ? options[key].detour : key}`,
			arg : options[key].arg_name ? ` <${options[key].arg_name}>` : " "
		};

		const leng = (opts[key].opt + opts[key].arg).length;
		if (leng > maxLang) {
			maxLang = leng;
		}
	});

	// set text
	Object.keys(options).forEach(function(key) {

		let opt = _private.pad(opts[key].opt + opts[key].arg, maxLang);
		opt = opt.green;
		opt = `${opt.replace(/(<.+>)/, "$1".yellow)}`;

		let desc;
		if (options[key].desc instanceof Array) {
			let i;
			desc = options[key].desc[0];
			for (i = 1; i < options[key].desc.length; i++) {
				desc += "\n";
				desc += _private.pad("", maxLang) + `    ${options[key].desc[i]}`;
			}
		} else {
			desc = options[key].desc;
		}

		helpText += `${opt}    ${desc.white}\n`;
	});

	return helpText;
};

/**
 * create help text for see and etc.
 * @returns {string} help text
 */
_private.createSeeHelp = function() {
	let helpText = "  See also:".cyan + "\n\n";
	helpText += "    http://httpd.apache.org/docs/current/mod/mod_headers.html";

	return helpText;
};

_private.pad = function(str, length) {
	var i = 0,
		s = str;

	if (str.length >= length) {
		return str;
	}

	for (; i < (length - str.length); i++) {
		s = s.concat(" ");
	}
	return s;
};

/** Display Help */
_public.display = function() {
	const info = _private.createHelp();

	Object.keys(info).forEach(function(key) {
		process.stdout.write(info[key] + "\n");
	});
};

exports.display = _public.display;