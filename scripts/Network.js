const _ = require('lodash')
const Util = require('./Util.js');

class Network {

  constructor(sizes) {
    this.sizes = sizes;
    this.numOfLayers = sizes.length;
    this.biases = sizes.slice(1, sizes.length).map(n => Math.random());
    // this.weights = 
  }
}