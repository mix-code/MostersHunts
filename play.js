const { Player } = require('./game/Player');

// Player Setup
const player = new Player({name: 'Player1', attack: 500, defense: 100, hp: 1000, mp: 500, spells: []});

// Monster Setup
const monster = new Player({name: 'Monster1', attack: 700, defense: 150, hp: 2000, mp: 1000, spells: []});

// Game Start
let gameRunning = true;

while(gameRunning) {

    let attack_damage = 0;

    // Player Turn
    attack_damage = player.attack();
    monster.get_hurts(attack_damage);
    
    console.log('Player Attacked By' , attack_damage);
    console.log('Monster HP Is' , monster.hp);
    
    
    // ==================================

    // Monster Turn
    attack_damage = monster.attack();
    player.get_hurts(attack_damage);

    console.log('Monster Attacked By' , attack_damage);
    console.log('Player HP Is' , player.hp);

    // Game End
    if (player.hp > monster.hp && monster.hp <= 0) {
        console.log('You Win!');
        gameRunning = false;
        
    } else if (monster.hp > player.hp && player.hp <= 0) {
        console.log('You Lose!');
        gameRunning = false;
    }
}
