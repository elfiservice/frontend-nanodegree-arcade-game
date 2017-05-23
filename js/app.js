// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x +=  (this.speed * dt );
        this.checkCollisions();
    } else {
            this.x = -200;
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function(){
    var enemyTail = this.x;
    var enemyBeak = this.x + 75;
    var enemyHeight = this.y;
    var playerPositionHorizt = player.x;
    var playerPositionVert = player.y;

    if ( enemyBeak > playerPositionHorizt && enemyTail <= (playerPositionHorizt + 30)){
        if ( (playerPositionVert == 72 && enemyHeight == 50) || (playerPositionVert == 154 && enemyHeight == 150) || (playerPositionVert == 236 && enemyHeight == 225)) {
            player.x = 203.5;
            player.y = 400;
        }

    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (){
    this.x = 203.5;
    this.y = 400;
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function(){
    // console.log(this.x, this.y);
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode){

    if( keyCode === "up" && this.y > -5){
        this.y -= 82;
    } else if (keyCode === "down" && this.y < 400){
        this.y += 82;
    } else if (keyCode === "left" && this.x > 3.5) {
        this.x -= 100;
    } else if (keyCode === "right" && this.x < 400) {
        this.x += 100;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0,50, 50),
    new Enemy(-250,150, 100),
    new Enemy(-100,225, 80),
    new Enemy(-200,50, 150),
    new Enemy(-550,150, 60),
    new Enemy(-1000,225, 180)
];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
