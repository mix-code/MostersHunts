const utils = require('./utils')

class Player {
    
    constructor({name, attack, defense, hp, mp, spells}) {
        this.name = name;
        this.heavy_attack = attack + 20;
        this.light_attack = attack - 20;
        this.defense = defense;
        this.max_hp = hp;
        this.hp = hp;
        this.max_mp = mp;
        this.mp = mp;
        this.spells = spells;
    }

    attack() {
        return utils.random(this.heavy_attack, this.light_attack);
    }

    get_hurts(damage_point) {
        this.hp -= (damage_point - this.defense);

        return this;
    }

}

module.exports = { Player };