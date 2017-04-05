const config = require("../../config"),
	colors = require("colors"),
	fs = require("fs-extra"),
	path = require("path"),
	utils = require("./utils"),
	ahdrc = require("rc")(config.title);

const disable = module.exports = {};

/** main */
disable.exec = function(keyword) {
	const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean); // filter for remove blank

	utils.writeln("Disable".red.bold.italic + " headers: ".green + keyword.white);

	let enableList = [];
	const reg = new RegExp(keyword);
	enableHeaders.forEach(header => {
		if (!reg.test(header)) {
			enableList.push(header);
		} else {
			utils.writeln(`    ${header}`.cyan);
		}
	});

	fs.outputFileSync(config._ahdStatus, (enableHeaders.length ? enableList.join("\n") : ""));

	// 값 만들어서 아파치에 넣고 재시작
	if (enableHeaders.length !== enableList.length) {
		utils.writeln();
		const headersSetting = utils.getEnableHeaderConfigs();

		fs.outputFileSync(path.join(ahdrc.location.httpdconfDir, config._headerConf), headersSetting);

		utils.restartApache();
	}
};

disable.execAll = function() {

	const enableHeader = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);

	utils.writeln("Disable".red.bold.italic + " All headers: ".green);
	enableHeader.forEach(header => {
		utils.writeln(`    ${header}`.cyan);
	});

	if (enableHeader.length) {
		fs.outputFileSync(config._ahdStatus, "");

		utils.writeln();
		const headersSetting = utils.getEnableHeaderConfigs();

		fs.outputFileSync(path.join(ahdrc.location.httpdconfDir, config._headerConf), headersSetting);

		utils.restartApache();
	}
};