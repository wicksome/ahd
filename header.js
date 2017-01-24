(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    }
})(this, function() {
    'use strict';

    const fs = require('fs'),
        log = require('./utils/log.colors'),
        exec = require('shelljs').exec;

    const AHD_HEADER_FILE = '/etc/apache2/ahd/headers.conf';

    function enable(key) {
        const stReg = new RegExp(`^##st##(${key})$`),
            endReg = new RegExp(`^##end##(${key})$`);
        let active = false,
            isChanged = false;

        // modify header
        modifyHeader((content) => {
            log.info(`Enable(Regex): ${key}`);
            for (let i = 0; i < content.length; i++) {
                let row = content[i];

                if (!active && stReg.test(row)) {
                    log.data(row.match(stReg)[1]);
                    active = true;
                } else if (active && endReg.test(row)) {
                    active = false;
                }

                if (active) {
                    if (/^#(Header|RequestHeader) /.test(row)) {
                        isChanged = true;
                        content[i] = row.substr(1);
                        console.log(content[i]);
                    }
                }
            }

            return content;
        });

        // restart httpd
        if (isChanged) {
            restartHttpd();
        }
    }

    function disable(key) {
        const stReg = new RegExp(`^##st##(${key})$`),
            endReg = new RegExp(`^##end##(${key})$`);
        let active = false,
            isChanged = false;

        // modify header
        modifyHeader((content) => {
            log.info(`Disable(Regex): ${key}`);
            for (let i = 0; i < content.length; i++) {
                let row = content[i];

                // 포함 영역 설정
                if (!active && stReg.test(row)) {
                    log.data(row.match(stReg)[1]);
                    active = true;
                } else if (active && endReg.test(row)) {
                    active = false;
                }

                if (active) {
                    if (/^(Header|RequestHeader) /.test(row)) {
                        isChanged = true;
                        content[i] = '#' + row;
                        console.log(content[i]);
                    }
                }
            }

            return content;
        });

        // restart httpd
        if (isChanged) {
            restartHttpd();
        }
    }

    /**
     * Modify the header with the help of the Func that excute on line.
     * @param {Function} lineFunc - Functions to execute on each line
     */
    function modifyHeader(lineFunc) {
        try {
            // load header
            let content = fs.readFileSync(AHD_HEADER_FILE, 'utf8').split('\n');
            // modify header content
            content = lineFunc(content);
            // update header
            fs.writeFileSync(AHD_HEADER_FILE, content.join('\n'), 'utf8');
        } catch (e) {
            log.error('Please input \'ahd --install\'');
            log.error(e.message, 1);
        }
    }


    function create(key) {
        console.log('to-do');
    }

    function modify() {
        console.log('TODO');
    }

    function disableAll() {
        console.log('TODO');
    }

    function enableAll() {
        console.log('TODO');
    }

    function list() {
        console.log('TODO');
    }

    function restartHttpd() {
        log.info('Restart httpd');
        exec('sudo httpd -k restart');
    }

    return {
        create: create,
        disable: disable,
        enable: enable,
        list: list,
        modify: modify
    }
});
