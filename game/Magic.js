const utils = require('./utils');

class Magic {
    constructor({name, type, effect_points, cost}) {
        this.name = name;
        this.type = type;
        this.effect_points = effect_points;
        this.cost = cost;
    }

    attack() {
        return utils.random(this.effect_points + 30, this.effect_points - 30);
    }
}

module.exports = { Magic };