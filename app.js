'use strict';
const colors = require('colors'),
    blessed = require('blessed'),
    fs = require('fs');

const conf = require('./conf.js');

var config = conf.get();
console.log(JSON.stringify(config).green);
