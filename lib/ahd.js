'use strict';
let ahd = module.exports = {};

ahd.exec = (args) => {
    const install = require('./actions/install.js'),
        header = require('./actions/header.js');

    const func = args[2],
        key = args[3];

    switch (func) {
        case '--install':
            install.exec();
            break;
        case '-d':
            header.disable(key)
            break;
        case '-e':
            header.enable(key);
            break;
        case '-c':
            header.create(key);
            break
        case '-l':
            header.list();
            break;
        case '-m':
            header.modify(key);
            break;
        default:

    }
};
