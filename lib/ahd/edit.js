const config = require("../../config"),
	fs = require("fs-extra"),
	conf = require("rc")(config.title),
	execa = require("execa"),
	path = require("path"),
	editor = require('editor');

const edit = module.exports = {};

let _func = {};

_func.test = function(header) {
	const headerPath = path.join(config._saveDir, header);

	fs.ensureFileSync(headerPath);
	// execa(conf.conf.editor, [headerPath]);

	editor(headerPath, function(code, sig) {
		console.log('finished editing with code ' + code);
	});
};

edit.exec = function(header) {
	console.log("TODO :: Unimplemented Features: ".blue);
	console.log(arguments);

	_func.test(header.shift());
};