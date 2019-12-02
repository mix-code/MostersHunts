const chalk = require('chalk');
const readline = require('readline-sync');
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

    heal(hp) {
        
        let hp_points = hp === null ? this.max_hp : hp;
        
        this.hp += hp_points;
        
        if (this.hp > this.max_hp) {
            this.hp = this.max_hp
        }
    
        return this;
    }

    use_magic(cost) {
        this.mp -= cost;
    }

    get_hurts(damage_point) {
        this.hp -= (damage_point - this.defense);

        return this;
    }

    show_main_menu() {
        return readline.keyInSelect(['Attack', 'Magic'], chalk.blue('Choose An Option: '));
    }

    show_spells_menu() {
        const spells = this.spells.map(spell => `${spell.name} ${chalk.yellow(`(${spell.type})`)} ${chalk.green(`(effect: ${spell.effect_points})`)} ${chalk.red(`(cost: ${spell.cost})`)}`);

        return readline.keyInSelect(spells, chalk.blue("Choose A Spell: "));
    }

}

module.exports = { Player };