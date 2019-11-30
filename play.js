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
    console.log('Player Main Menu');

    let player_select = player.show_main_menu();
    console.log("\n");
    
    if (player_select === 0) {        
        attack_damage = player.attack();
        monster.get_hurts(attack_damage);
        
        console.log(`Player Attacked By ${attack_damage}`);
        console.log(`Monster HP Is ${monster.hp}\n`);
    } else if (player_select === 1) {
        // Spells Menu
        let player_spell_select = player.show_spells_menu();
        console.log(player_spell_select);
        
        // PLayer Attack Or Heal
        // Monster get Hurts if player attack
    }
    
    // ==================================

    console.log("==================================\n");
    
    // Monster Turn
    attack_damage = monster.attack();
    player.get_hurts(attack_damage);

    console.log(`Monster Attacked By ${attack_damage}`);
    console.log(`Player HP Is ${player.hp}\n`);


    // Game End
    if (player.hp > monster.hp && monster.hp <= 0) {
        console.log('You Win!');
        gameRunning = false;
        
    } else if (monster.hp > player.hp && player.hp <= 0) {
        console.log('You Lose!');
        gameRunning = false;
    }
}
