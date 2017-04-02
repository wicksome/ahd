(function webpackUniversalModuleDefinition(root, factory) {
	if (typeof exports === 'object' && typeof module === 'object') {
		module.exports = factory();
	}
})(this, function() {
	'use strict';
	const colors = require('colors/safe'),
		PREFIX = '-- ';

	// set theme
	colors.setTheme({
		silly : 'rainbow',
		prompt : 'grey',
		info : 'green',
		data : 'white',
		help : 'cyan',
		warn : 'yellow',
		debug : 'blue',
		error : 'red'
	});

	function getTabDepth(depth) {
		return (depth && typeof depth === 'number') ? '  '.repeat(depth) : '';
	}

	return {
		info : (txt, depth) => {
			console.log(PREFIX + getTabDepth(depth) + colors.info(txt));
		},
		silly : (txt) => {
			console.log(colors.silly(txt))
		},
		input : (txt) => {
			console.log(txt)
		},
		prompt : (txt) => {
			console.log(colors.prompt(txt))
		},
		data : (txt) => {
			console.log('-- ' + colors.data(txt))
		},
		help : (txt, depth) => {
			console.log(PREFIX + getTabDepth(depth) + colors.help(txt));
		},
		warn : (txt) => {
			console.log(PREFIX + getTabDepth(depth) + colors.warn(txt));
		},
		debug : (txt, depth) => {
			console.log(PREFIX + getTabDepth(depth) + colors.debug(txt));
		},
		error : (txt, depth) => {
			console.log(PREFIX + getTabDepth(depth) + colors.error(txt));
		}
	};
});
