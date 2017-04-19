const fs = require('fs-extra'),
	writeln = require("./utils").writeln,
	config = require("../../config");

const list = module.exports = {};
const func = {};
const status = {
	ENABLE: 1,
	DISABLE: 0
}

list.exec = function(args, opt) {

	if ("enable" in opt) {
		const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);
		enableHeaders.forEach(header => {
			func.writeln(`${header}`, status.ENABLE);
		});
	} else if ("disable" in opt) {
		const headers = fs.readdirSync(config._saveDir);
		const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);
		headers.forEach(header => {
			if (!enableHeaders.includes(header)) {
				func.writeln(`${header}`, status.DISABLE);
			}
		});
	} else {
		const headers = fs.readdirSync(config._saveDir);
		const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);
		headers.forEach(header => {
			if (!enableHeaders.includes(header)) {
				func.writeln(`${header.gray}`, status.DISABLE);
			} else {
				func.writeln(`${header.white}`, status.ENABLE);
			}
		});
	}
};

/**
 * custom println.
 * @param {status} stat
 */
func.writeln = function(msg, stat) {
	const prefix = stat === status.ENABLE ? "+".bold.green : "-".bold.red;
	writeln(`  ${prefix} ${msg}`);
}
