const path = require('path'),
	fs = require('fs-extra'),
	config = require('../../config'),
	utils = require('./utils'),
	colors = require('colors');

const remove = module.exports = {};

/** main */
remove.exec = function(args) {
	const header = args.shift();
	const headerPath = path.join(config._saveDir, header);

	if (fs.existsSync(headerPath)) {
		// remove header file
		fs.removeSync(headerPath);

		// remove header key in enable status
		let newEnableStatus = [];
		fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean).forEach(_header => {
			if (header != _header) {
				newEnableStatus.push(_header);
			}
		});
		fs.outputFileSync(config._ahdStatus, newEnableStatus.join("\n"));

		utils.writeln("Removed header.", utils.type.INFO);
		utils.writeln(`  ${header.white} ${headerPath}`);
	} else {
		utils.writeln(`  Header matched does not exist.`.gray);
		utils.displayHeadersOfRelevantUsingRegex(header);
	}
};
