'use strict';
const expect = require('chai').expect,
    should = require('chai').should(),
    path = require('path'),
    colors = require('colors'),
    fs = require('fs'),
    conf = require(path.join(__dirname, '..', 'conf.js'))._test.conf;

describe('conf.js', () => {
    const TEST_CONFIG_PATH = path.join(__dirname, 'test.config.json'),
        TEST_CONFIG = {
            "apacheDir": __dirname,
            "headersFile": "test.ahd.headers.conf"
        };

    before(() => {
        fs.writeFileSync(TEST_CONFIG_PATH, JSON.stringify(TEST_CONFIG));
        console.log('[BEFORE] Create test config file: '.blue + TEST_CONFIG_PATH);
        conf.PATH = TEST_CONFIG_PATH;
    });

    after(() => {
        fs.unlinkSync(TEST_CONFIG_PATH);
        console.log('[AFTER] Remove test config'.blue);
    });

    describe('#config.json', () => {

        // app이 실행되면 파일을 연다.
        // 파일이 확인을 하고 있을 경우, 데이터를 json 형식으로 가져온다
        // json 형식이 아닐 경우 에러를 출력한다.
        // apache의 header 파일의 경로를 가져와서 파일을 연다

        // app이 실행되면 파일을 연다.
        // 파일이 없을 경우 conf 파일을 생성한다.
        // apacht의 header 파일의 경로를 입력 받는다.
        // conf.conf 파일을 생성한다.
        // header파일을 연다.

        it('Check file exists', done => {
            // given
            const origin = conf.PATH
            // when
            // then
            conf.PATH = 'undefined';
            expect(conf.exist()).to.be.false;

            conf.PATH = origin;
            expect(conf.exist()).to.be.true;

            done();
        });

        it('Get \'conf.json\' file', done => {
            // given
            // when
            let config = conf.get();

            // then
            config.should.be.an('object');
            config.should.have.property('apacheDir').equal(TEST_CONFIG.apacheDir);
            config.should.have.property('headersFile').equal(TEST_CONFIG.headersFile);
            done();
        });

        it('Make config.file', done => {
            const origin = conf.PATH;

            conf.PATH = TEST_CONFIG_PATH + '.make.test'
            // TODO: input line test
            console.log('\tTODO: input line test'.warn);
            // conf.make();
            // fs.unlinkSync(conf.PATH);

            conf.PATH = origin;
            done();
        });

        it('apache httpd.conf', done => {
            const config = {
                "apache": {
                    "path": __dirname,
                    "httpd": "test.httpd.conf"
                },
                "headersFile": "headers.conf"
            }

            let httpdConf = path.join(config.apache.path, config.apache.httpd);
            console.log(httpdConf);


            // conf.getApacheConf

            // 아파치 폴더에서 httpd.conf 파일 찾기
            // 파일에 Include /etcapache/ahd/headers.conf 있는지 확인
            // 없으면 디렉토리 및 파일 추가
            //
            done();
        });
    });


    describe('#Open header file of Apache', () => {});

    describe('#Setting headers', () => {
        // 1. 설정 섹션으로 묶을 수 있다.
        // 2. 순서에 영향을 받는다.
        // 3. mod_headers.c 존재 확인
        // ㄴ <IfModule mod_headers.c> </IfModule>
        // ㄴ 없으면 에러 메시지 출력
        // 4. 구분자로 기존 header.conf에 접근해서 변경할까?
        // ㄴ ##ahd_start##wicksome#timestamp
        // ㄴ ##ahd_end##wicksome#timestamp

        it('json to header setting', () => {});
    });
});
