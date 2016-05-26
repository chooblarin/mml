const _ = require('lodash')
const Util = require('./Util.js');

class Network {

  /**
    * @param sizes : the array contains the number of neurons in the respective layers.
    * For example, if we want to create a Network instance with
    * 2 neurons in the first layer,
    * 3 neurons in the second layer,
    * and 1 neuron in the last layer, we would give [2, 3, 1] to the constructor.
    */
  constructor(sizes) {
    this.sizes = sizes;
    this.numOfLayers = sizes.length;
    /*
      biases and weights are all initialized randomly, using a Gaussian distributions
      with mean 0 and standard deviation 1.
    */
    this.biases = sizes
          .slice(1, sizes.length).map(n => Math.random());
    this.weights = _.zip(sizes, sizes)
          .map(pair => Util.randomMatrix(pair[1], pair[0]));
  }

  feedforward(input) {
  }

  stochasticGradientDecscent() {
  }

  updateMiniBatch(miniBatch, eta) {
  }

  backPropagation(x, y) {
  }
}
