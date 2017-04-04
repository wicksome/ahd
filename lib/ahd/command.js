var colors = require("colors");

var command = module.exports = {};

command.cmdlist = {
	init : {
		args : false,
		desc : [
			"Initialize ahd. make header.conf for save custom header.",
			"When try install, auto execution this command."
		]
	},
	list : {
		args : false,
		desc : "Display header list."
	},
	view : {
		args : true,
		arg_name : "header-name",
		desc : "Display header item.",
		guide : "ahd view [item]"
	},
	add : {
		args : true,
		arg_name : "header-name",
		options : {
			override : [Boolean, false]
		},
		desc : ["Add header. If aleady header file: run edit header", "change space to underline"],
		guide : "ahd add [header-name]"
	},
	remove : {
		args : true,
		arg_name : "header-name",
		desc : "Remove header",
		guide : "ahd remove [header-name]"
	},
	edit : {
		args : true,
		arg_name : "header-name",
		desc : "Edit header with editor."
	}
};

function abort(msg) {
	msg = msg || "";
	process.stdout.write(msg + "\n");
	process.exit(1);
}

function existTask(cmd) {
	var info = "Fatal error:".red + " '".yellow + cmd.yellow + "' is not a ahd command. See ".yellow + "'ahd --help'".green;
	abort(info);
}

function emptyParam(task) {
	var msg = "Fatal error: ".red + "Missing options or arguments. Nothing specified.".yellow + "\n";
	msg += "Maybe you wanted to say ".red + "\"" + command.cmdlist[task].guide.green + "\"".green;
	abort(msg);
}

command.exec = function(cmd, templates, options) {
	if (!command.cmdlist[cmd]) {
		existTask(cmd);
		return;
	}

	if (command.cmdlist[cmd].args && !templates.length) {
		emptyParam(cmd);
		return;
	}

	const task = require("./" + cmd);
	task.exec(templates, options);
};
