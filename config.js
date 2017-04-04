const path = require('path');
const conf = require('./package.json');

const config = {
	title : 'ahd',
	version : conf.version,
	_baseDir : __dirname,
	_libDir : path.join(__dirname, 'lib'),
	_moduleDir : path.join(__dirname, 'lib', 'ahd'),
	_tplDir : path.join(__dirname, 'lib', 'ahd', "templates"),
	_userDir : process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
	_saveDir : path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.ahd'),
	_ahdrc : path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.ahdrc'),
	_ahdrcTpl : path.join(__dirname, "lib", "ahd", "templates", '.ahdrc'),
	_ahdStatus : path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, ".ahd.status"),
	_unconditionalHeaders : path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, ".ahd.uncond.conf"),
	_headerConf : "ahd_headers.conf"
};

module.exports = config;