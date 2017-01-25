'use strict';
const expect = require('chai').expect,
    should = require('chai').should(),
    path = require('path'),
    colors = require('colors'),
    fs = require('fs');

describe('conf.js', () => {
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

        it('Get \'conf.json\' file', done => {
            // given
            // when
            // then
            done();
        });

        it('apache httpd.conf', done => {
            // 아파치 폴더에서 httpd.conf 파일 찾기
            // 파일에 Include /etcapache/ahd/headers.conf 있는지 확인
            // 없으면 디렉토리 및 파일 추가
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

        it('json to header setting', () => {
            //


        });
    });
});
