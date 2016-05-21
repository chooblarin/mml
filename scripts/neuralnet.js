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
}

class Link {
  constructor() {
    this.leftUnit = {}
    this.rightUnit = {}
    this.wight = 1
  }
}
