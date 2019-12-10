const chalk = require('chalk');
const log = require('./game/logger');
const utils = require('./game/utils');
const { Player, Monster } = require('./game/Player');
const { Magic } = require('./game/Magic');

const argv = require('yargs')
    .usage(chalk.green(`Play Our CLI Game and Have Fun By ${chalk.bold(chalk.cyan('MixCode'))}.`))
    .option('player-name', {
        description: 'Player Name',
        type: 'string',
        default: '[Player]',
    })
    .option('monster-name', {
        description: 'Monster Name',
        type: 'string',
        default: '[Monster]',
    })
    .version('v1.0.0')
    .alias('h', 'help')
    .alias('v', 'version')
    .alias('p', 'player-name')
    .alias('m', 'monster-name')
    .argv;


// Player Magic Spells Setup
const playerSpells = [
    new Magic({name: 'Fire', type: 'attack', effect_points: 1000, cost: 300}),
    new Magic({name: 'Thunder', type: 'attack', effect_points: 700, cost: 200}),
    new Magic({name: 'Earthquake', type: 'attack', effect_points: 500, cost: 150}),
    new Magic({name: 'Heal', type: 'heal', effect_points: 500, cost: 100}),
    new Magic({name: 'Extra Heal', type: 'heal', effect_points: 1000, cost: 250}),
    new Magic({name: 'Super Heal', type: 'heal', effect_points: null, cost: 400}),
];

// Player Setup
const player = new Player({name: argv.playerName, attack: 500, defense: 100, hp: 12000, mp: 10000, spells: playerSpells});

// Monster Setup
const monster = new Monster({name: argv.monsterName, attack: 700, defense: 150, hp: 20000, mp: 14000, spells: playerSpells});

// Game Start
let gameRunning = true;

while(gameRunning) {

    let attack_damage = 0;

    player.show_statistics();
    console.log('\n');
    monster.show_statistics();

    // Player Turn
    console.log("\n==================================\n");
    log.toSystem('Player Main Menu');

    let player_select = player.show_main_menu();
    
    if (player_select === 0) {        
        attack_damage = player.attack();
        monster.get_hurts(attack_damage);
        
        log.toPlayer(`${chalk.bold(`Player Attacked`)} By ${attack_damage} Points`);
        log.toSystem(`Monster HP Is ${monster.hp} Points\n `);
    } else if (player_select === 1) {
        // Spells Menu
        console.log("==================================\n");

        log.toSystem(`Magic Spells Menu`);
        log.toSubSystem(`Player MP Is: ${player.mp}/${player.max_mp}`);

        let player_spell_select = player.show_spells_menu();
        const spell = player.spells[player_spell_select];
        
        if (player.mp >= spell.cost) {
            player.use_magic(spell.cost);
            
            // PLayer Attack Or Heal
            if (spell.type === 'attack') { // Attack Type
                attack_damage = spell.attack();
                monster.get_hurts(attack_damage);
    
                log.toPlayer(`Player Used ${chalk.bold(`${spell.name}`)} and attacked monster by ${attack_damage} Points\n`);
                log.toSystem(`Monster HP Is ${monster.hp} Points\n `);
            } else if (spell.type === 'heal') { // Heal Type
                player.heal(spell.effect_points);
    
                let message = '';
                
                if (spell.effect_points === null) {
                    message = `Player Used ${chalk.bold(`${spell.name}`)} and fully restored HP\n`;
                } else {
                    message = `Player Used ${chalk.bold(`${spell.name}`)} and healed by ${spell.effect_points} Points\n`;
                }
    
                log.toPlayer(message);
            }
            
        } else {
            log.byMonster(chalk.bold('No Enough MP\n'));
        }
        // Monster get Hurts if player attack
    }
    
    // ==================================

    console.log("==================================\n");

    let monster_menu_select = utils.random(2, 1);
   
    if (monster.mp <= 0) {
        monster_menu_select = 1
    }

    // Attack
    if (monster_menu_select === 1) {        
        // Monster Turn
        attack_damage = monster.attack();
        player.get_hurts(attack_damage);

        log.toMonster(`${chalk.bold(`Monster Attacked`)} By ${attack_damage} Points`);
        log.toSystem(`Player HP Is ${player.hp} Points\n`);    
    
    } else if (monster_menu_select === 2) {
        let monster_spell_select = utils.random(5, 0);        
        const spell = monster.spells[monster_spell_select];
        
        if (monster.mp >= spell.cost) {
            monster.use_magic(spell.cost);
            
            // Monster Attack Or Heal
            if (spell.type === 'attack') { // Attack Type
                attack_damage = spell.attack();
                player.get_hurts(attack_damage);
    
                log.toMonster(`Monster Used ${chalk.bold(`${spell.name}`)} and attacked Player by ${attack_damage} Points\n`);
                log.toSystem(`Player HP Is ${player.hp} Points\n `);
            } else if (spell.type === 'heal') { // Heal Type
                monster.heal(spell.effect_points);
    
                let message = '';
                
                if (spell.effect_points === null) {
                    message = `Monster Used ${chalk.bold(`${spell.name}`)} and fully restored HP\n`;
                } else {
                    message = `Monster Used ${chalk.bold(`${spell.name}`)} and healed by ${spell.effect_points} Points\n`;
                }
    
                log.toMonster(message);
            }
            
        } else {
            log.toMonster(chalk.bold('No Enough MP\n'));
        }
    }
    


    // Game End
    if (player.hp > monster.hp && monster.hp <= 0) {
        log.toPlayer(chalk.bold('You Win!'));
        gameRunning = false;
        
    } else if (monster.hp > player.hp && player.hp <= 0) {
        log.byMonster(chalk.bold('You Lose!'));
        gameRunning = false;
    }
}

