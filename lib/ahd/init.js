const path = require("path"),
	fs = require("fs-extra"),
	colors = require("colors"),
	writeln = require("./utils").writeln,
	readlineSync = require('readline-sync'),
	config = require("../../config");

const init = module.exports = {};
const _func = {};

/**
 * set .ahdrc config file.
 * TODO: refactoring
 */
_func.setAhdrc = function() {

	// 기존 값 백업
	if (fs.existsSync(config._ahdrc)) {
		const backup = config._ahdrc + "." + new Date().getTime();

		fs.copySync(config._ahdrc, backup);
		fs.removeSync(config._ahdrc);

		writeln("    Backup .ahdrc to .ahdrc.<currentTime>".yellow);
		writeln(`        ${config._ahdrc} -> ${backup}`);
	}

	// httpd.conf 경로 확인
	let findHttpConf = false;
	let count = 0;
	let httpdDir;
	let httpdconfPath;

	while (count++ < 3) {
		const tempHttpdDir = readlineSync.question(`    Where is the ${"httpd.conf".italic}? `.cyan);
		httpdconfPath = path.join(tempHttpdDir, "httpd.conf");

		if (fs.existsSync(httpdconfPath)) {
			findHttpConf = true;
			httpdDir = tempHttpdDir;
			break;
		} else {
			console.log(`        Not found ${"httpd.conf".italic}, Please re-enter. ${httpdconfPath}`);
		}
	}

	if (!findHttpConf) {
		writeln(`\nNot found ${"httpd.conf".italic}. Please check the httpd.conf dir and try again.`.red);
		writeln(`    ${"ahd init".white}`);
		return;
	}

	let ahdrc = [];
	fs.readFileSync(config._ahdrcTpl, "utf8").split("\n").forEach(line => {
		if (line.startsWith("httpdconfDir = ")) {
			line = ("httpdconfDir = " + httpdDir);
		}
		ahdrc.push(line);
	});

	fs.outputFileSync(config._ahdrc, ahdrc.join("\n"));
	writeln("    Created ahd configuration file: ".cyan + config._ahdrc);

	// apache 디렉토리에 ahd headers 생성
	const ahdHeaderPath = path.join(httpdDir, config._headerConf);
	fs.ensureFileSync(ahdHeaderPath);
	writeln("    Created ahd headers to httpd dir: ".cyan + ahdHeaderPath);

	// httpd.conf에 include 추가
	const httpdconf = fs.readFileSync(httpdconfPath, "utf8").split("\n")
	const includeAhdHeaderText = `Include ${ahdHeaderPath}`;
	if (!httpdconf.includes(includeAhdHeaderText)) {
		fs.appendFileSync(httpdconfPath, "\n" + includeAhdHeaderText);
		writeln("    Append text that include ahd headers: ".cyan);
	}
};

init.exec = function() {
	writeln("Initialized ahd:".green);

	_func.setAhdrc();

	fs.ensureFileSync(config._ahdStatus);
	fs.copySync(path.join(config._tplDir, ".ahd.uncond.conf"), config._unconditionalHeaders, {overwrite : false});
	fs.ensureDirSync(config._saveDir);

	writeln(`    Created ${".ahd.status".italic} for save header status: `.cyan + config._ahdStatus);
	writeln(`    Created ${".ahd.cond.conf".italic} for header unconditionally applied: `.cyan + config._unconditionalHeaders);
	writeln("    Made directory for save custom header: ".cyan + config._saveDir);
};