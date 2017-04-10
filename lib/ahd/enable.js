const config = require("../../config"),
	colors = require("colors"),
	fs = require("fs-extra"),
	path = require("path"),
	utils = require("./utils");

const enable = module.exports = {};

/** main */
enable.exec = function(keyword) {
	utils.writeln("Enable".blue.bold.italic + " headers: ".green + keyword.white);

	const headers = fs.readdirSync(config._saveDir);
	const enableHeaders = utils.getEnableHeaders();

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
		utils.updateApacheHeader();
		utils.restartApache();
	}
};

enable.execAll = function() {
	utils.writeln("Enable".blue.bold.italic + " All headers: ".green);

	const headers = fs.readdirSync(config._saveDir);
	headers.forEach(header => {
		utils.writeln(`    ${header}`.cyan);
	});

	fs.outputFileSync(config._ahdStatus, headers.join("\n"));

	utils.writeln();
	utils.updateApacheHeader();
	utils.restartApache();
};

enable.execOnlyMatched = function(keyword) {
	utils.writeln("Enable".blue.bold.italic + " headers and ".green + "disable".red.italic + " other headers: ".green);

	const headers = fs.readdirSync(config._saveDir);
	let enableList = [];
	const reg = new RegExp(keyword);
	utils.writeln();
	headers.forEach(header => {
		if (reg.test(header)) {
			enableList.push(header);
			utils.writeln(`    ${"[E]".green} ${header.cyan}`);
		}
	});
	const enableHeaders = utils.getEnableHeaders();
	enableHeaders.forEach(enableHeader => {
		if (!enableList.includes(enableHeader)) {
			utils.writeln(`    ${"[D]".red} ${enableHeader.gray}`);
		}
	});

	utils.setEnableHeaders(enableList);

	utils.writeln();
	utils.updateApacheHeader();
	utils.restartApache();
};