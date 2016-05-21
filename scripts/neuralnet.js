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

/*
  @numsOfUnits ex. [4, 3, 1] means input 4, hidden 3, output 1.
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

  var layers = [];
  layers.push(inputUnits);
  layers.push(Util.flatten(hiddenUnitArrays));
  layers.push(outputUnits);

  // setup connections
  var connections = [];
  for (var l = 0; l < layers.length - 1; l++) {
    var units = layers[l];
    var connection = [];
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
        connection.push(link);
      }
    }
    connections.push(connection);
  }
};

exports.train = () => {};
exports.test = () => {};
exports.predict = () => {};
