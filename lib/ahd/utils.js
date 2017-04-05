const config = require('../../config'),
	conf = require("rc")(config.title),
	fs = require('fs-extra'),
	sudo = require('sudo'),
	execa = require("execa"),
	editor = require('editor'),
	emoji = require("node-emoji"),
	path = require("path"),
	colors = require('colors');

// path = require("path"),

const utils = module.exports = {};

utils.write = function(msg) {
	process.stdout.write(msg);
};

utils.writeln = function(msg) {
	msg = msg || "";
	utils.write(msg + "\n");
};

/**
 * Display header list of relevant header using regex.
 * @param {String} keywordRegex
 */
utils.displayHeadersOfRelevantUsingRegex = function(keywordRegex) {
	let existMatchHeader = false;

	let headerHelpMag = "Did you find this?".cyan + "\n";
	const reg = new RegExp(keywordRegex);

	fs.readdirSync(config._saveDir).forEach(header => {
		if (reg.test(header)) {
			existMatchHeader = true;
			headerHelpMag += `    ${header}\n`;
		}
	});

	if (existMatchHeader) {
		utils.write("\n" + headerHelpMag);
	}
};

/**
 * open editor.
 * TODO: custom editor can't get callback. So restart Apache server.
 * @param filePath
 */
utils.openEditor = function(filePath) {
	if (conf.conf.editor) {
		execa(conf.conf.editor, [filePath]);
	} else {
		editor(filePath, function(code, sig) {
			// utils.writeln('Finished editing with code '.green + code);
		});
	}
};

/**
 * Get headers Text used at headers.conf.
 * @returns {string}
 */
utils.getEnableHeaderConfigs = function() {
	const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean); // filter for remove blank

	let ahdHeaders = "<IfModule headers_module>\n";
	ahdHeaders += fs.readFileSync(config._unconditionalHeaders, "utf-8");
	ahdHeaders += "\n";

	enableHeaders.forEach(header => {
		const filePath = path.join(config._saveDir, header);
		ahdHeaders += `# ${header}\n`;
		ahdHeaders += fs.readFileSync(filePath, "utf8");
		ahdHeaders += "\n";
	});
	ahdHeaders += "</IfModule>";

	return ahdHeaders;
};

/**
 * Setting headers to Apache conf.
 */
utils.setHeaderToApacheConf = function() {

};

/**
 * Restart Apache web server.
 */
utils.restartApache = function() {
	const apachectl = conf.location.apachectl || "apachectl";

	const child = sudo([apachectl, "-k", "restart"], {
		cachePassword : true,
		prompt : `${"sudo".italic} are required to start the Apache.\n`.green + `    Password ${emoji.get("key")} :`.cyan,
		spawnOptions : {/* other options for spawn */}
	});

	child.on('close', (code) => {
		if (code === 0) {
			utils.writeln("Apache restart was successful.".green);
		} else {
			utils.writeln(`grep process exited with code ${code}`.red);
		}
	});
};