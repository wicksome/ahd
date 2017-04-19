const config = require("../../config"),
	colors = require("colors"),
	fs = require("fs-extra"),
	path = require("path"),
	utils = require("./utils"),
	ahdrc = require("rc")(config.title);

const disable = module.exports = {};
const func = {};
const status = {
	ENABLE: 1,
	DISABLE: 0
}

/** main */
disable.exec = function(keyword) {
	const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean); // filter for remove blank

	utils.writeln("Disable".bold + " headers: " + keyword.white, utils.type.INFO);

	let enableList = [];
	const reg = new RegExp(keyword);
	enableHeaders.forEach(header => {
		if (!reg.test(header)) {
			enableList.push(header);
		} else {
			func.writeln(`${header}`, status.DISABLE);
		}
	});

	fs.outputFileSync(config._ahdStatus, (enableHeaders.length ? enableList.join("\n") : ""));

	// 값 만들어서 아파치에 넣고 재시작
	if (enableHeaders.length !== enableList.length) {
		utils.writeln();
		const headersSetting = utils.makeEnableApacheHeaderConfig();

		fs.outputFileSync(path.join(ahdrc.location.httpdconfDir, config._headerConf), headersSetting);

		utils.restartApache();
	}
};

disable.execAll = function() {

	const enableHeader = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);

	utils.writeln("Disable".bold + " All headers.", utils.type.INFO);

	if (enableHeader.length) {
		enableHeader.forEach(header => {
			func.writeln(`${header}`, status.DISABLE);
		});

		fs.outputFileSync(config._ahdStatus, "");

		utils.writeln();
		const headersSetting = utils.makeEnableApacheHeaderConfig();

		fs.outputFileSync(path.join(ahdrc.location.httpdconfDir, config._headerConf), headersSetting);

		utils.restartApache();
	} else {
		utils.writeln(`    There are no enable headers.`.gray);
	}
};

/**
 * custom println.
 * @param {status} stat
 */
func.writeln = function(msg, stat) {
	const prefix = stat === status.ENABLE ? "+".bold.green : "-".bold.red;
	utils.writeln(`  ${prefix} ${msg}`);
}
