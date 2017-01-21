(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    }
})(this, function() {
    'use strict';
    const log = require('./log.colors'),
        readline = require('readline-sync'),
        fs = require('fs'),
        path = require('path');

    let _conf = {
        PATH: path.join(__dirname, 'config.json')
    };

    let apache = {};


    // @Deprecated
    _conf.open = function() {
        fs.open(_conf.PATH, 'utf-8', (err, fd) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error(`${_conf.PATH} does not exist.`);
                    return;
                }
            } else {
                throw err;
            }

            fs.readFile(_conf.PATH, 'utf8')
        });
    };

    _conf.get = function() {
        if (!_conf.exist()) {
            log.warn('config.json does not exist: ' + _conf.PATH);
            _conf.make();
        }
        return JSON.parse(fs.readFileSync(_conf.PATH, 'utf8'));
    };

    _conf.exist = function() {
        try {
            fs.accessSync(_conf.PATH, fs.constants.R_OK | fs.constants.W_OK);
            return true;
        } catch (e) {
            return false;
        }
    };

    _conf.make = function() {
        log.info('make config.json');
        let config = {
            apache: {}
        };
        config.apache.path = readline.question('apache dir? ', {
            defaultInput: '/etc/apache2'
        });
        config.apache.httpd = readline.question('apache httpd.conf?(default:httpd.conf)', {
            defaultInput: 'httpd.conf'
        });
        config.headersFile = 'headers.conf';

        fs.writeFileSync(_conf.PATH, JSON.stringify(config, null, 4), 'utf8');
    };

    return {
        _test: {
            conf: _conf
        },
        get: _conf.get
    }
});
