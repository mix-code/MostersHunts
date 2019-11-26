const { Player } = require('./game/Player');

// Player Setup
const player = new Player({name: 'Player1', attack: 500, defense: 100, hp: 1000, mp: 500, spells: []});

// Monster Setup
const monster = new Player({name: 'Monster1', attack: 1000, defense: 500, hp: 20000, mp: 10000, spells: []});

console.log(player);


// Game Start
let gameRunning = false;

while(gameRunning) {

    // Game End
    if (player.hp > monster.hp && monster.hp === 0) {
        console.log('You Win!');
        gameRunning = false;
        
    } else if (monster.hp > player.hp && player.hp === 0) {
        console.log('You Lose!');
        gameRunning = false;
    }
}
