class Magic {
    constructor({name, type, effect_points, cost}) {
        this.name = name;
        this.type = type;
        this.effect_points = effect_points;
        this.cost = cost;
    }
}

module.exports = { Magic };