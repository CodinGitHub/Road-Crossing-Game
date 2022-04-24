// create a new scene
let gameScene = new Phaser.Scene('Game');

// innitiate scene parameters
gameScene.init = function(){
    //player speed
    this.playerSpeed = 5;
    this.enemyMinSpeed = 2;
    this.enemyMaxSpeed = 4.5;
    this.enemyMinY = 80;
    this.enemyMaxY = 280;
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
    
    //Change the sprite Scale
    this.player.setScale(0.5);
    // this.player.scale= 0.5;
    // this.player.scaleX= 0.5;
    // this.player.scaleY= 0.5;

    //create the treasure
    this.treasure = this.add.sprite(this.sys.game.config.width -80, this.sys.game.config.height/2, 'treasure');
    this.treasure.setScale(0.5);

    // create enemies
    this.enemies = this.add.group({
        key:'enemy',
        repeat: 5,
        setXY: {
            x: 110,
            y: 100,
            stepX: 80,
            stepY: 20
        }
    });

    this.enemy = this.add.sprite(100, this.sys.game.config.height/2,'enemy');
    this.enemy.flipX = true;

    this.enemies.add(this.enemy)

    //setting scale to all group elements
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4)

    //set flipX and speed
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
        //flip enemy
        enemy.flipX = true;

         //set ememy spped
        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed)
        enemy.speed = dir*speed;
    }, this)

   

    // this.enemy.setScale(3);

    //Rotacion por el metodo de los angulos
    // this.enemy.angle = 45;
    // this.enemy.setAngle(-45);

    //Rotacion por el metodo de los grados
    // enemy.setOrigin(0,0);
    // this.enemy.rotation = Math.PI / 4;
    // this.enemy.setRotation(Math.PI / 4);
};

// UPDATE
gameScene.update = function(){
    // this.enemy.x += 1;
    // this.enemy.angle += 1;
    // if(this.player.scaleX < 2){
    //     this.player.scaleX += 0.01;
    //     this.player.scaleY += 0.01;
    // }

    //check for active input
    if(this.input.activePointer.isDown){
        //player Walks
        this.player.x +=this.playerSpeed; 
    }

    //Enemy movement
    this.enemy.y += this.enemy.speed;

    let conditionUp = this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY;
    let conditionDown = this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY;
    if(conditionUp || conditionDown){
        this.enemy.speed *=-1;
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

    //enemy overlap check
    let enemyRect = this.enemy.getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)){
        this.scene.restart();
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