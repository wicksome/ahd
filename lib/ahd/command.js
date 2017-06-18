var colors = require("colors");

var command = module.exports = {};

command.cmdlist = {
    "init": {
        "args": false,
        "desc": [
            "Initialize ahd. Make " + ".ahdrc".italic + " for save custom configuration.",
            "When try install, auto execution this command."
        ]
    },
    "list": {
        "args": false,
        "shortcut": "l",
        "arg_name": "option",
        "desc": [
            "Show header list. It can have option(" + "-e".underline + "|" + "-d".underline + ") with command.",
            "The option is to show only the " + "e".bold + "nabled state or the " + "d".bold + "isabled state only."
        ],
        "guide": "ahd list [(all)|-e|-d]"
    },
    "view": {
        "args": true,
        "shortcut": "v",
        "arg_name": "keyword",
        "desc": "View headers. The keyword is a " + "regular expressions".underline + ".",
        "guide": "ahd view [header-name | regex]"
    },
    "add": {
        "args": true,
        "shortcut": "a",
        "arg_name": "header",
        "options": {
            "override": [Boolean, false]
        },
        "desc": ["Add header. If already exist header, run editor with the header.", "change space to underline."],
        "guide": "ahd add [header]"
    },
    "remove": {
        "args": true,
        "shortcut": "r",
        "arg_name": "header",
        "desc": "Remove header",
        "guide": "ahd remove [header]"
    },
    "edit": {
        "args": true,
        "shortcut": "e",
        "arg_name": "header",
        "desc": "Edit header with editor."
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
    if (command.cmdlist[task].guide) {
        msg += "Maybe you wanted to say ".red + "\"" + command.cmdlist[task].guide.green + "\"".green;
    }
    abort(msg);
}

command.exec = function(cmd, templates, options) {
    // apply shortcut
    Object.keys(command.cmdlist).map(key => {
        const shortcut = command.cmdlist[key].shortcut;
        if (cmd === shortcut) {
            cmd = key;
            return;
        }
    }).filter(Boolean);

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
