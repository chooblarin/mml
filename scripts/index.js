const Util = require('./Util.js');
const fs = require('fs');

const MINI_BATCH_SIZE = 10

let fileString = fs.readFileSync('./data/Fisher.csv', 'utf-8');
let lines = fileString.split('\r\n');

let d = lines
    .filter((line) => !line.startsWith('#'))
    .filter((line) => line != '')
    .map((line) => line.split('\t'));
