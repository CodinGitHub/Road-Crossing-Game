// create a new scene
let gameScene = new Phaser.Scene('Game');

// innitiate scene parameters
gameScene.init = function(){
    //player speed
    this.playerSpeed = 5
}


//Load assets
gameScene.preload = function(){
    //load images
    this.load.image('background', './assets/background.png');
    this.load.image('player', './assets/player.png');
    this.load.image('enemy', './assets/dragon.png');
    this.load.image('treasure', './assets/treasure.png')
};

// called once after the preload ends
gameScene.create = function(){
    //create bg sprite
    let bg = this.add.sprite(0,0,'background');

    //change the origin of the bg
    bg.setOrigin(0,0);

    //create the player
    this.player = this.add.sprite(40,this.sys.game.config.height/2, 'player');

    //create the treasure
    this.treasure = this.add.sprite(this.sys.game.config.width -80, this.sys.game.config.height/2, 'treasure');
    this.treasure.setScale(0.5);
    
    //Change the sprite Scale
    this.player.setScale(0.5);
    // this.player.scale= 0.5;
    // this.player.scaleX= 0.5;
    // this.player.scaleY= 0.5;

    //create an enemy
    // this.enemy1 = this.add.sprite(250,180,'enemy');
    // this.enemy1.setScale(3);

    //Rotacion por el metodo de los angulos
    // this.enemy1.angle = 45;
    // this.enemy1.setAngle(-45);

    //Rotacion por el metodo de los grados
    // enemy1.setOrigin(0,0);
    // this.enemy1.rotation = Math.PI / 4;
    // this.enemy1.setRotation(Math.PI / 4);
};

// UPDATE
gameScene.update = function(){
    // this.enemy1.x += 1;
    // this.enemy1.angle += 1;
    // if(this.player.scaleX < 2){
    //     this.player.scaleX += 0.01;
    //     this.player.scaleY += 0.01;
    // }

    //check for active input
    if(this.input.activePointer.isDown){
        //player Walks
        this.player.x +=this.playerSpeed; 
    }

    //treasure overlap check
    let playerRect = this.player.getBounds();
    let treasureRect = this.treasure.getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)){
        console.log('reached goal!');
        //restart the scene
        this.scene.restart();
        return;
    }
}

// set the configuration of the scene
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
}

// create a new game, pass the configuration
let game = new Phaser.Game(config);