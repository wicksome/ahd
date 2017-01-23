(function(args) {
    'use strict';
    const colors = require('colors'),
        path = require('path'),
        blessed = require('blessed'),
        fs = require('fs'),
        exec = require('shelljs').exec,
        log = require('./log.colors');

    const conf = require('./conf.js'),
        header = require('./header.js');

    let func = args[2],
        key = args[3];

    switch (func) {
        case '--install':
            conf.install();
            break;
        case '-d':
            header.disable(key)
            restartHttpd();
            break;
        case '-e':
            header.enable(key);
            restartHttpd();
            break;
        case '-l':
            header.list();
            restartHttpd();
            break;
        case '-m':
            header.modify(key);
            restartHttpd();
            break;
        default:

    }

    function restartHttpd() {
        log.help('Restart httpd'.blue);
        exec('sudo httpd -k restart');
    }


})(process.argv);
