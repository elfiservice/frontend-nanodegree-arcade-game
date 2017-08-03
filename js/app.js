var TILE_WIDTH = 100;
var TILE_HEIGHT = 82;
// Enemies our player must avoid
// Parameter: x and y, to mark the Start Position and
// speed to mark how fast he`d be
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // Setting start Position and Speed of each Enemy
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
    /*
    multiply any movement by the dt parameter
    which will ensure the game runs at the same speed forall computers.

    when the Enemy stay out off the screen (canvas) on the x position > than 505
    He back to the start of the canvas with a Random negative number

    If your position is less than 505 He is keep going ahead and
    checking Collisions with the player, invoking the method checkCollisions()
    */
    if (this.x < 505) {
        this.x +=  (this.speed * dt );
        this.checkCollisions();
    } else {
        this.x = Math.floor((Math.random() * 500) + 100) * -1;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Checking the collisions with Player, invoked from Enemy`s update method
Enemy.prototype.checkCollisions = function(){
    //selecting the point of the contact of the Enemy with the Player
    //(The Beak until the Tail of Enemy)
    var enemyTail = this.x;
    var enemyBeak = this.x + 75;
    var enemyHeight = this.y;
    var playerPositionHorizt = player.x;
    var playerPositionVert = player.y;

    /*
        cheking IF the Player toch the Beak or the Tail of the Enemy, being True,
        cheking IF both are in the same Hight (position vertical)
        Then, moving the Player to Start Position, He die.
    */
    if ( enemyBeak > playerPositionHorizt && enemyTail <= (playerPositionHorizt + 30)){
        if ( (playerPositionVert == 72 && enemyHeight == 50) || (playerPositionVert == 154 && enemyHeight == 150) || (playerPositionVert == 236 && enemyHeight == 225)) {
            player.startPosition();
        }

    }
};

/*
    Player class constructor
    Sprits the image of the Player and
    Invoke the Start Position of the Player into the canvas
*/
var Player = function (){
    this.startPosition();
    this.sprite = "images/char-boy.png";
};
/*
    Marking the Start Position of the Player
*/
Player.prototype.startPosition = function (){
    this.x = 203.5;
    this.y = 400;
};
/*
    Cheking IF the Player Arrived on the Water in the Canvas game, He Win!
    Then, he is back to the Start Position after 500ms
*/
Player.prototype.update = function(){
    var self = this;
    if( this.y === -10) {
        setTimeout(function(){ self.startPosition(); }, 500);
    }
};
/*
    Draw the Player on the screen
*/
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
/*
    Receiving the pressed key and moving the Player on the Canvas
    Parameter: keyCode, indicate Which direction the Player have to go
    (up, down, left or right)
*/
Player.prototype.handleInput = function(keyCode){
    if( keyCode === "up" && this.y > -5){
        this.y -= TILE_HEIGHT;
    } else if (keyCode === "down" && this.y < 400){
        this.y += TILE_HEIGHT;
    } else if (keyCode === "left" && this.x > 3.5) {
        this.x -= TILE_WIDTH;
    } else if (keyCode === "right" && this.x < 400) {
        this.x += TILE_WIDTH;
    }
};

//game information
function Level(){
    this.label = "Level";
    this.number = 1;

}

Level.prototype.render = function(){
    ctx.fillStyle = "white";
            ctx.font = "20px Arial";
    ctx.fillText(this.label + ": " + this.number, 400, 80);
}



// instantiate objects
// Enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(0,50, 50),
    new Enemy(-250,150, 100),
    new Enemy(-100,225, 80),
    new Enemy(-200,50, 350),
    new Enemy(-550,150, 160),
    new Enemy(-1000,225, 280)
];
// Player object in a variable called player
var player = new Player();

var level = new Level();

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
