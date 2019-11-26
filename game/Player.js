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

}

module.exports = { Player };