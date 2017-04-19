const config = require("../../config"),
	colors = require("colors"),
	fs = require("fs-extra"),
	path = require("path"),
	utils = require("./utils");

const enable = module.exports = {};
const func = {};
const status = {
	ENABLE: 1,
	DISABLE: 0
}

/** main */

/**
 * Enable headers matched keyword.
 */
enable.exec = function(keyword) {
	utils.writeln("Enable".bold + " headers: " + keyword.white, utils.type.INFO);

	const headers = fs.readdirSync(config._saveDir);
	const enableHeaders = utils.getEnableHeaders();

	let enableList = [];
	const reg = new RegExp(keyword);
	headers.forEach(header => {
		if (reg.test(header) && !enableHeaders.includes(header)) {
			enableList.push(header);
			func.writeln(`${header}`, status.ENABLE);
		}
	});

	if (enableList.length) {
		fs.appendFileSync(config._ahdStatus, (enableHeaders.length ? "\n" : "") + enableList.join("\n"));
		utils.writeln();
		utils.updateApacheHeader();
		utils.restartApache();
	} else {
		utils.writeln(`    There are no matched headers.`.gray);
	}
};

/**
 * Enable all headers.
 */
enable.execAll = function() {
	utils.writeln("Enable".bold + " all headers:", utils.type.INFO);

	const headers = fs.readdirSync(config._saveDir);

	if (headers.length) {
		headers.forEach(header => {
			func.writeln(`${header}`, status.ENABLE);
		});
	} else {
		utils.writeln(`    There are no matched headers.`.gray);
	}

	fs.outputFileSync(config._ahdStatus, headers.join("\n"));

	utils.writeln();
	utils.updateApacheHeader();
	utils.restartApache();
};

/**
 * Enable matched headers and disable other headers.
 */
enable.execOnlyMatched = function(keyword) {
	utils.writeln("Enable".bold + " headers and " + "Disable".bold + " other headers:", utils.type.INFO);

	const headers = fs.readdirSync(config._saveDir);
	const reg = new RegExp(keyword);
	let enableList = [];
	let isNone = true;

	headers.forEach(header => {
		if (reg.test(header)) {
			enableList.push(header);
			func.writeln(`${header.white}`, status.ENABLE);
			isNone = false;
		}
	});
	const enableHeaders = utils.getEnableHeaders();
	enableHeaders.forEach(enableHeader => {
		if (!enableList.includes(enableHeader)) {
			func.writeln(`${enableHeader.gray}`, status.DISABLE);
			isNone = false;
		}
	});

	if(isNone) {
		utils.writeln(`    There are no changed headers.`.gray);
	}

	utils.setEnableHeaders(enableList);

	utils.writeln();
	utils.updateApacheHeader();
	utils.restartApache();
};

/**
 * custom println.
 * @param {status} stat
 */
func.writeln = function(msg, stat) {
	const prefix = stat === status.ENABLE ? "+".bold.green : "-".bold.red;
	utils.writeln(`  ${prefix} ${msg}`);
}
