const chalk = require('chalk');
const { Player } = require('./game/Player');
const { Magic } = require('./game/Magic');

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
const player = new Player({name: 'Player1', attack: 500, defense: 100, hp: 1000, mp: 500, spells: playerSpells});

// Monster Setup
const monster = new Player({name: 'Monster1', attack: 700, defense: 150, hp: 2000, mp: 1000, spells: []});

// Game Start
let gameRunning = true;

while(gameRunning) { 
    let attack_damage = 0;

    // Player Turn
    console.log("==================================\n");
    console.log(chalk.blue('Player Main Menu'));

    let player_select = player.show_main_menu();
    
    if (player_select === 0) {        
        attack_damage = player.attack();
        monster.get_hurts(attack_damage);
        
        console.log(chalk.green(`${chalk.bold(`Player Attacked`)} By ${attack_damage} Points`));
        console.log(chalk.blue(`Monster HP Is ${monster.hp} Points\n `));
    } else if (player_select === 1) {
        // Spells Menu
        console.log("==================================\n");

        console.log(chalk.blue(`Magic Spells Menu`));
        console.log(chalk.yellow(`Player MP Is: ${player.mp}/${player.max_mp}`));

        let player_spell_select = player.show_spells_menu();
        const spell = player.spells[player_spell_select];
        
        if (player.mp >= spell.cost) {
            player.use_magic(spell.cost);
            
            // PLayer Attack Or Heal
            if (spell.type === 'attack') { // Attack Type
                attack_damage = spell.attack();
                monster.get_hurts(attack_damage);
    
                console.log(chalk.green(`Player Used ${chalk.bold(`${spell.name}`)} and attacked monster by ${attack_damage} Points\n`));
                console.log(chalk.blue(`Monster HP Is ${monster.hp} Points\n `));
            } else if (spell.type === 'heal') { // Heal Type
                player.heal(spell.effect_points);
    
                let message = '';
                
                if (spell.effect_points === null) {
                    message = `Player Used ${chalk.bold(`${spell.name}`)} and fully restored HP\n`;
                } else {
                    message = `Player Used ${chalk.bold(`${spell.name}`)} and healed by ${spell.effect_points} Points\n`;
                }
    
                console.log(chalk.green(message));
            }
            
        } else {
            console.log(chalk.bold(chalk.red('No Enough MP\n')));
        }
        
        

        // Monster get Hurts if player attack
    }
    
    // ==================================

    console.log("==================================\n");
    
    // Monster Turn
    attack_damage = monster.attack();
    player.get_hurts(attack_damage);

    console.log(chalk.red(`${chalk.bold(`Monster Attacked`)} By ${attack_damage} Points`));
    console.log(chalk.blue(`Player HP Is ${player.hp} Points\n`));


    // Game End
    if (player.hp > monster.hp && monster.hp <= 0) {
        console.log(chalk.bold(chalk.green('You Win!')));
        gameRunning = false;
        
    } else if (monster.hp > player.hp && player.hp <= 0) {
        console.log(chalk.bold(chalk.red('You Lose!')));
        gameRunning = false;
    }
}

