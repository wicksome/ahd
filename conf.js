(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    }
})(this, function() {
    'use strict';
    const log = require('./utils/log.colors'),
        readline = require('readline-sync'),
        fs = require('fs'),
        path = require('path'),
        exec = require('shelljs').exec;

    const CONF_PATH = path.join(__dirname, 'config.json'),
        AHD_DIR = 'ahd',
        AHD_HEADER = 'headers.conf';


    function install() {
        log.info('Install Apache Header Manager');
        try {
            // ahd config
            if (!fs.existsSync(CONF_PATH)) {
                makeConf();
            }
            const config = JSON.parse(fs.readFileSync(CONF_PATH, 'utf8'));

            // 아파치
            const httpd = path.join(config.apache.path, config.apache.httpd),
                ahdPath = path.join(config.apache.path, AHD_DIR),
                ahd = path.join(ahdPath, AHD_HEADER),
                str = `Include ${ahd}`;

            if (fs.readFileSync(httpd, 'utf8').indexOf(str) < 0) {
                log.debug(`Set conf: ${str}`, 1);
                fs.appendFileSync(httpd, str);
            }

            // 아파치에 추가
            if (!fs.existsSync(ahdPath)) {
                log.debug(`Make dir: ${ahdPath}`, 1);
                fs.mkdirSync(ahdPath);
            }
            if (!fs.existsSync(ahd)) {
                log.debug(`Make file: ${ahd}`, 1);
                const headerExample = path.join(__dirname, 'example', 'headers.conf');
                fs.writeFileSync(ahd, fs.readFileSync(headerExample));
            }
        } catch (e) {
            if (e.code === 'EACCES') {
                log.error(`Please sudo: ${e.message}`);
            } else {
                log.error(e.message);
            }
            return;
        }


        // bash에 추가
        const bash_profile = path.join(getUserHome(), '.bash_profile'),
            alias = 'alias ahd="sudo node ' + path.join(__dirname, 'app') + '"';
        if (fs.readFileSync(bash_profile, 'utf8').indexOf(alias) < 0) {
            log.debug('Append alias ahd', 1);
            fs.appendFileSync(bash_profile, alias);
            log.debug(`Restart ${bash_profile}`, 1);
            exec(`source ${bash_profile}`);
        }

        log.info('Success ahd install');
    }

    function getUserHome() {
        return process.env.HOME || process.env.USERPROFILE;
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
        log.info('Create config.json');
        log.input('Where is apache directory? (default: /etc/apache2)');
        config.apache.path = readline.prompt({
            defaultInput: '/etc/apache2'
        });

        log.input('What is the httpd.conf? (default: httpd.conf)');
        config.apache.httpd = readline.prompt({
            defaultInput: 'httpd.conf'
        });

        fs.writeFileSync(CONF_PATH, JSON.stringify(config, null, 4), 'utf8');
        console.log('\n');
    }

    return {
        _test: {},
        exist: () => {
            return existFile(CONF_PATH);
        },
        install: install,
        get: () => {
            return JSON.parse(fs.readFileSync(CONF_PATH, 'utf8'));
        },
        getHeaderName: function() {
            const config = JSON.parse(fs.readFileSync(CONF_PATH, 'utf8'));
            return path.join(config.apache.path, AHD_DIR, AHD_HEADER);
        }
    }
});
