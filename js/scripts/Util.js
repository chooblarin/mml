const flatten = (list) => {
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])
}
exports.flatten = flatten

/* Random value by Box-Muller's method */
const rnorm = (mean, sd) => {
  let x = Math.random();
  let y = Math.random();
  return mean + sd * Math.sqrt(-2 * Math.log(x)) * Math.cos(2 * Math.PI * y);
};
exports.rnorm = rnorm;

/**
  * n dimentional vector initialized randomly
  * using a Gaussian distribution with mean 0 and varriance 1.
  */
const randomVector = (n) => {
  var v = [];
  for (var i = 0; i < n; i++) {
    v.push(rnorm(0, 1));
  }
  return v;
};
exports.randomVector = randomVector;

exports.randomMatrix = (n, m) => {
  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix.push(randomVector(m));
  }
  return matrix;
};

exports.randomChoice = (array, count) => {

  if (array.length <= count) {
    return array;
  }

  var newArray = [];
  var usedIndexes = [];

  do {
    let randomIndex = Math.floor(Math.random() * array.length);
    if (usedIndexes.includes(randomIndex)) {
      continue;
    }
    newArray.push(array[randomIndex]);
    usedIndexes.push(randomIndex);
  } while(count != newArray.length);

  return newArray;
};

const getMean = (array) => {
  return array.reduce((acc, val) => acc + val) / array.length;
};
exports.getMean = getMean;

const getVarriance = (array, mean) => {
  if (!mean) {
    mean = getMean(array)
  }
  let sumOfSquares = array
        .map((val) => Math.pow(val - mean, 2))
        .reduce((acc, val) => acc + val);
  return sumOfSquares / array.length;
};
exports.getVarriance = getVarriance;

const getSD = (array, mean) => {
  if (!mean) {
    mean = getMean(array);
  }
  var varriance = getVarriance(array, mean);
  return Math.sqrt(varriance);
};
exports.getSD = getSD;

exports.normalize = (array, mean, sd) => {
  var newArray = [];
  if (!mean) {
    mean = getMean(array);
  }
  if (!sd) {
    sd = getSD(array);
  }
  return array.map((val) => (val - mean) / sd);
};

/**
  * The sigmoid function.
  */
const sigmoid = (z) => {
  return 1.0 / (1.0 + Math.exp(-z));
};
exports.sigmoid = sigmoid;

/**
  * Derivative of the sigmoid function.
  */
const derivativeSigmoid = (z) => {
  return sigmoid(z) * (1 - sigmoid(z));
}
