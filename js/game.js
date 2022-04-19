// create a new scene
let gameScene = new Phaser.Scene('Game');

//Load assets
gameScene.preload = function(){
    //load images
    this.load.image('background', './assets/background.png');
    this.load.image('player', './assets/player.png');

};

// called once after the preload ends
gameScene.create = function(){
    //create bg sprite
    let bg = this.add.sprite(0,0,'background');

    //change the origin of the bg
    bg.setOrigin(0,0);

    //create the player
    let player = this.add.sprite(100,360/2, 'player')
    player.setScale(0.5)
};

// set the configuration of the scene
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
}

// create a new game, pass the configuration
let game = new Phaser.Game(config);