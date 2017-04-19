const config = require("../../config"),
	fs = require("fs-extra"),
	utils = require("./utils"),
	path = require("path");

const edit = module.exports = {};

edit.exec = function(args) {
	const header = args.shift();
	const headerPath = path.join(config._saveDir, header);

	if (!fs.existsSync(headerPath)) {
		utils.writeln(`Not exist header: ${header.white}`, utils.type.INFO);
		utils.displayHeadersOfRelevantUsingRegex(header);
		return;
	}

	fs.ensureFileSync(headerPath);

	utils.openEditor(headerPath);
	// if (conf.conf.editor) {
	// 	execa(conf.conf.editor, [headerPath]);
	// } else {
	// 	editor(headerPath, function(code, sig) {
	// 		utils.writeln('Finished editing with code '.green + code);
	// 	});
	// }
};
