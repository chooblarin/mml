const Util = require('./Util.js');

const DEFAULT_WEIGHT = 0;

let UnitType = {
  INPUT:  Symbol("input"),
  HIDDEN: Symbol("hidden"),
  BIAS: Symbol("bias"),
  OUTPUT: Symbol("output")
};

class Unit {
  constructor(unitType) {
    this.unitType = unitType;
    this.leftLinks = [];
    this.rightLinks = [];

    this.input = 0;
    this.output = 0;
  }

  static connect(left, right) {
    left.rightLinks.push(right);
    right.leftLinks.push(left);
    return new Link(left, right);
  }
}

class Link {
  constructor(leftUnit, rightUnit) {
    this.leftUnit = leftUnit;
    this.rightUnit = rightUnit;
    this.weight = 1;
  }
}

class Network {
  constructor(layers, linksArray) {
    this.layers = layers;
    this.linksArray = linksArray;
  }

  predict(data) {
    let normalizedData = Util.normalize(data);

    let inputLayer = this.layers[0]

    inputLayer
      .filter(unit => UnitType.BIAS != unit.unitType)
      .forEach((unit, index) => {
          unit.input = data[index];
          unit.output = data[index];
      });
    console.log(inputLayer);

    this.layers.slice(1, this.layers.length)
      .forEach(layer => {
        var sumExp
        layer
          .filter(unit => UnitType.BIAS != unit.unitType)
          .forEach(unit => {
            unit.input = unit.leftLinks
              .map(link => link.leftUnit.output * link.weight)
              .reduce((acc, val) => acc + val);

            if (UnitType.OUTPUT === unit.unitType) {
              // unit.output =
              // softmax
            } else if (UnitType.HIDDEN === unit.unitType) {
              unit.output = Math.max(0, unit.input);
            }
          });
      });
  }
}

/**
  * @param numsOfUnits ex. [4, 3, 1] means input 4, hidden 3, output 1.
  * @return network
  */
exports.createNetwork = (numsOfUnits) => {
  if (numsOfUnits.length <= 2) {
    throw new Error("one hidden unit must be specified at least.");
  }

  var inputUnits = [];
  var hiddenUnitArrays = [];
  var outputUnits = [];

  let numOfLayers = numsOfUnits.length;

  // init input layer
  for (var i = 0; i < numsOfUnits[0]; i++) {
    inputUnits.push(new Unit(UnitType.INPUT));
  }

  // init hidden layer
  for (var i = 1; i < numOfLayers - 1; i++) {
    var hiddenUnits = [];
    for (var j = 0; j < numsOfUnits[i]; j ++) {
      hiddenUnits.push(new Unit(UnitType.HIDDEN));
    }
    hiddenUnitArrays.push(hiddenUnits);
  }

  // init output layer
  for (var i = 0; i < numsOfUnits[numOfLayers - 1]; i++) {
    outputUnits.push(new Unit(UnitType.OUTPUT));
  }

  // add bias unit to all layers (except output layer)
  inputUnits.unshift(new Unit(UnitType.BIAS));
  hiddenUnitArrays.forEach((hu) => {
    hu.unshift(new Unit(UnitType.BIAS));
  });

  var layers = [];
  layers.push(inputUnits);
  layers.push(Util.flatten(hiddenUnitArrays));
  layers.push(outputUnits);

  // setup links
  var linksArray = [];
  for (var l = 0; l < layers.length - 1; l++) {
    var units = layers[l];
    var links = [];
    for (var n = 0; n < units.length; n++) {

      let leftUnit = units[n];

      for (var k = 0; k < layers[l + 1].length; k++) {
        let rightUnit = layers[l + 1][k];

        if (rightUnit.unitType === UnitType.BIAS) {
          continue;
        } else {
          link = Unit.connect(leftUnit, rightUnit);
        }

        if (leftUnit.unitType === UnitType.BIAS) {
          link.weight = DEFAULT_WEIGHT;
        } else {
          link.weight = DEFAULT_WEIGHT + Util.rnorm(0, 1);
        }
        links.push(link);
      }
    }
    linksArray.push(links);
  }
  return new Network(layers, linksArray);
};


/**
  * @param dataframe [{ data: [x_0, x_1,..., x_n], expected: c }, ...]
  */
exports.train = (network, dataframe, miniBatchSize = 10) => {
  let data = Util.randomChoice(dataframe.data, miniBatchSize);
  for (var n = 0; n < data.length; n++) {

    for (var l = network.layers.length - 1; 0 < l; l--) {
      var layer = network.layers[l];
      for (var k = 0; k < network.layers[l].length; k++) {
        var unit = layer[k];
        if (UnitType.OUTPUT == unit.unitType
          && UnitType.HIDDEN == unit.unitType) {
            if (UnitType.OUTPUT == unit.unitType) {
              // train
            } else {
              // train
            }
        }
      }
    }
  }
};


exports.test = () => {};
