(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    }
})(this, function() {
    'use strict';

    const fs = require('fs'),
        colors = require('colors'),
        exec = require('shelljs').exec;

    const AHD_HEADER_FILE = '/etc/apache2/ahd/headers.conf';

    function enable(key) {
        let content = fs.readFileSync(AHD_HEADER_FILE, 'utf8').split('\n'),
            isActivate = false,
            i;

        console.log(`Enable header: ${key}`.yellow);
        for (i in content) {
            if (content[i].indexOf(`##ahd-start##${key}`) > -1) {
                isActivate = true;
                continue;
            } else if (content[i].indexOf(`##ahd-end##${key}`) > -1) {
                isActivate = false;
                break;
            }

            if (isActivate) {
                if (content[i].charAt(0) === '#') {
                    content[i] = content[i].substr(1);
                }
                console.log(content[i]);
            }
        }

        // 파일 저장
        fs.writeFileSync(AHD_HEADER_FILE, content.join('\n'), 'utf8');
    }

    function disable(key) {
        let content = fs.readFileSync(AHD_HEADER_FILE, 'utf8').split('\n'),
            isActivate = false,
            i;


        console.log(`Disable header: ${key}`.yellow);
        for (i in content) {
            if (content[i].indexOf(`##ahd-start##${key}`) > -1) {
                isActivate = true;
                continue;
            } else if (content[i].indexOf(`##ahd-end##${key}`) > -1) {
                isActivate = false;
                break;
            }

            if (isActivate) {
                if (content[i].charAt(0) !== '#') {
                    content[i] = '#' + content[i];
                }
                console.log(content[i]);
            }
        }

        // 파일 저장
        fs.writeFileSync(AHD_HEADER_FILE, content.join('\n'), 'utf8');
    }


    function a() {
        let content = fs.readFileSync(AHD_HEADER_FILE, 'utf8').split('\n');

        // 파일 저장
        fs.writeFileSync(AHD_HEADER_FILE, content.join('\n'), 'utf8');
    }


    function create(key) {
        console.log('to-do');
    }


    return {
        create: create,
        disable: disable,
        enable: enable,
        list: () => {
            console.log('list');
        },
        modify: (key) => {
            console.log('modify');
        }
    }
});
