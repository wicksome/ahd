const config = require("../../config"),
	colors = require("colors"),
	fs = require("fs-extra"),
	path = require("path"),
	utils = require("./utils"),
	ahdrc = require("rc")(config.title);

const enable = module.exports = {};

/** main */
enable.exec = function(keyword) {

	const headers = fs.readdirSync(config._saveDir);
	const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean); // filter for remove blank

	utils.writeln("Enable headers: ".green + keyword.white);

	let enableList = [];
	const reg = new RegExp(keyword);
	headers.forEach(header => {
		if (reg.test(header) && !enableHeaders.includes(header)) {
			enableList.push(header);
			utils.writeln(`    ${header}`.cyan);
		}
	});

	if (enableList.length) {
		fs.appendFileSync(config._ahdStatus, (enableHeaders.length ? "\n" : "") + enableList.join("\n"));
	}

	if (enableList.length) {
		utils.writeln();
		const headersSetting = utils.getEnableHeaderConfigs();

		fs.outputFileSync(path.join(ahdrc.location.httpdconfDir, config._headerConf), headersSetting);

		utils.restartApache();
	}
};

enable.execAll = function() {
	const headers = fs.readdirSync(config._saveDir);

	utils.writeln("Enable All headers: ".green);
	headers.forEach(header => {
		utils.writeln(`    ${header}`.cyan);
	});

	fs.outputFileSync(config._ahdStatus, headers.join("\n"));

	utils.writeln();
	const headersSetting = utils.getEnableHeaderConfigs();

	fs.outputFileSync(path.join(ahdrc.location.httpdconfDir, config._headerConf), headersSetting);

	utils.restartApache();
};