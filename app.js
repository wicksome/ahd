(function(args) {
    'use strict';
    const colors = require('colors'),
        path = require('path'),
        blessed = require('blessed'),
        fs = require('fs');

    const conf = require('./conf.js');

    args.forEach((val, index) => {
        console.log(`${index}: ${val}`);
    });

    if (!conf.exist()) {
        conf.install();
    }

    // const config = getConf();
    // const apaacheHeader = ApacheHeader(config);
    var key = args[3];

    switch (args[2]) {
        case '-d':
            // apacheHeader.disable(key)
            break;
        case '-e':
            // apacheHeader.enable(key);
            break;
    }
})(process.argv);
