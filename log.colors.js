(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    }
})(this, function() {
    'use strict';
    const colors = require('colors/safe');

    // set theme
    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    });

    return {
        info: (txt) => {
            console.log(colors.info(txt))
        },
        silly: (txt) => {
            console.log(colors.silly(txt))
        },
        input: (txt) => {
            console.log(colors.input(txt))
        },
        verbose: (txt) => {
            console.log(colors.verbose(txt))
        },
        prompt: (txt) => {
            console.log(colors.prompt(txt))
        },
        data: (txt) => {
            console.log(colors.data(txt))
        },
        help: (txt) => {
            console.log(colors.help(txt))
        },
        warn: (txt) => {
            console.log(colors.warn(`[WARN] ${txt}`))
        },
        debug: (txt) => {
            console.log(colors.debug(txt))
        },
        error: (txt) => {
            console.log(colors.error(txt))
        }
    };
});
