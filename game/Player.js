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

    show_statistics() {        
        let hp_bar = this._calculate_statistics(this.hp, this.max_hp, 50);
        let mp_bar = this._calculate_statistics(this.mp, this.max_mp, 30);

        let hp_bar_color = 'green';
        let mp_bar_color = 'cyan';

        let half_hp_bar = 50 / 2;
        let half_mp_bar = 30 / 2;

        if (hp_bar.trim().length < half_hp_bar) {
            hp_bar_color = 'red';
        }

        if (mp_bar.trim().length < half_mp_bar) {
            mp_bar_color = 'yellow';
        }

        console.log(`${chalk.blue(`${this.name}`)}          |${chalk[hp_bar_color](`${hp_bar}`)}| ${this.hp}/${this.max_hp} HP          |${chalk[mp_bar_color](`${mp_bar}`)}| ${this.mp}/${this.max_mp} MP`);
        
    }

    _calculate_statistics(current_points, total_points, bar_length) {
        let bar_tick = '';
        let empty_bar_tick = '';

        // HP Percentage
        let hp_percentage = current_points * 100 / total_points;

        // bar ticks
        let ticks = Math.floor(bar_length * (hp_percentage / 100)) 
        let empty_ticks = bar_length - ticks;

        for(let i = 0; i < ticks; i++) {
            bar_tick += '\u2588';
        }

        for(let i = 0; i < empty_ticks; i++) {
            empty_bar_tick += ' ';
        }

        return bar_tick + empty_bar_tick;
    }

}

class Monster extends Player {
    constructor({name, attack, defense, hp, mp, spells}) {
        super({name, attack, defense, hp, mp, spells});
    }
}


module.exports = { Player, Monster };