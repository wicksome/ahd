const path = require("path"),
	fs = require("fs-extra"),
	colors = require("colors"),
	config = require("../../config");

exports.exec = function() {

	fs.copySync(config._ahdConfTpl, config._ahdConf, {overwrite : false});
	fs.ensureDirSync(config._saveDir);

	var msg = "Initialized ahd:".green + "\n";
	msg += "  Created ahd configuration file: ".yellow + " " + config._ahdConf.cyan + "\n";
	msg += "  Created custom header save directory: ".yellow + " " + config._saveDir.cyan + "\n";
	process.stdout.write(msg);

	// .ahdrc 생성

	// apache httpd 재시작 스크립트 확인

	// apache config 확인

};