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

    const CONF_PATH = path.join(__dirname, 'config.json');

    function install() {
        // ahd config
        log.info('Install Apache Header Manager');
        if (!existFile(CONF_PATH)) {
            makeConf();
        }
        const config = JSON.parse(fs.readFileSync(CONF_PATH, 'utf8'));

        // 아파치
        const httpd = path.join(config.apache.path, config.apache.httpd);
        const ahdPath = path.join(config.apache.path, 'ahd');
        const ahd = path.join(ahdPath, 'headers.conf');
        try {
            const content = fs.readFileSync(httpd, 'utf8'),
                str = `Include ${ahd}`;
            if (content.indexOf(str) < 0) {
                log.help(`set conf: ${str}`);
                fs.appendFileSync(httpd, str);
            }
        } catch (e) {
            log.error(e.message);
            return;
        }

        // 아파치에 추가
        if (!existFile(ahdPath)) {
            log.help(`Make ahd dir: ${ahdPath}`);
            fs.mkdirSync(ahdPath);
        }
        if (!existFile(ahd)) {
            log.help(`Create ahd: ${ahd}`);
            fs.writeFileSync(ahd, '');
        }

        log.info('success');
    }

    function existFile(path) {
        try {
            fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
            return true;
        } catch (e) {
            return false;
        }
    }

    function makeConf() {
        let config = {
            apache: {}
        };

        log.help('Create config.json');
        log.input('Where is apache directory? (default: /etc/apache2)');
        config.apache.path = readline.prompt({
            defaultInput: '/etc/apache2'
        });

        log.input('What is the httpd.conf? (default: httpd.conf)');
        config.apache.httpd = readline.prompt({
            defaultInput: 'httpd.conf'
        });

        fs.writeFileSync(CONF_PATH, JSON.stringify(config, null, 4), 'utf8');
    }

    return {
        _test: {},
        exist: () => {
            return existFile(CONF_PATH);
        },
        install: install
    }
});
