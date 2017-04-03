const path = require('path');
const conf = require('./package.json');

const config = {
	title : 'ahd',
	version : conf.version,
	_baseDir : __dirname,
	_libDir : path.join(__dirname, 'lib'),
	_moduleDir : path.join(__dirname, 'lib', 'ahd'),
	_ext : '.gitignore',
	_saveDir : path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.ahd'),
	_ahdConf : path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.ahdrc'),
	_ahdConfTpl : path.join(__dirname, "lib", "ahd", "templates", '.ahdrc')
};

module.exports = config;