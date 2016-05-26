const Util = require('./Util.js');
const fs = require('fs');
const _ = require('lodash')

const MINI_BATCH_SIZE = 10

let fileString = fs.readFileSync('./data/Fisher.csv', 'utf-8');
let lines = fileString.split('\r\n');

let data = lines
    .filter((line) => !line.startsWith('#'))
    .filter((line) => line != '')
    .map((line) => line.split('\t'));

let chunked_data = _.chunk(d, MINI_BATCH_SIZE);
