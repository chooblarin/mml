
/* Random value by Box-Muller's method */
exports.rnorm = (mean, sd) => {
  let x = Math.random();
  let y = Math.random();
  return mean + sd * Math.sqrt(-2 * Math.log(x)) * Math.cos(2 * Math.PI * y);
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
  } while(count != newArray.length)

  return newArray;
};

exports.getMean = (array) => {
  return array.reduce((acc, val) => acc + val) / array.length;
};

exports.getVarriance = (array, mean) => {
  if (!mean) {
    mean = getMean(array)
  }
  let sumOfSquares = array
        .map((val) => Math.pow(val - mean, 2))
        .reduce((acc, val) => acc + val);
  return sumOfSquares / array.length;
};

exports.getSD = (array, mean) => {
  if (!mean) {
    mean = getMean(array)
  }
  var varriance = getVarriance(array, mean);
  return Math.sqrt(varriance);
};

exports.normalize = (array, mean, sd) => {
  var newArray = [];
  if (!mean) {
    mean = getMean(array)
  }
  if (!sd) {
    sd = getSD(array)
  }
  return array.map((val) => (val - mean) / sd);
};
