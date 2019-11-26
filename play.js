// Player Setup
let playerHP = 0;


// Monster Setup
let monsterHP = 100;

// Game Start
let gameRunning = true;

while(gameRunning) {

    // Game End
    if (playerHP > monsterHP && monsterHP === 0) {
        console.log('You Win!');
        gameRunning = false;
        
    } else if (monsterHP > playerHP && playerHP === 0) {
        console.log('You Lose!');
        gameRunning = false;
    }
}
