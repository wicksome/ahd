(function(args) {
    'use strict';
    const conf = require('./conf.js'),
        header = require('./header.js');

    const func = args[2],
        key = args[3];

    switch (func) {
        case '--install':
            conf.install();
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
})(process.argv);
