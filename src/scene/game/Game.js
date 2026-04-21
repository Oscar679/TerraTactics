//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
TerraTactics.scene.Game = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);

    this.m_player = null;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.Game.prototype.constructor = TerraTactics.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    console.log(rune.display.Graphic);
    this.bg = new rune.display.Graphic(0, 0, 400, 225, "game_bg");
    this.stage.addChild(this.bg);


    // load tilemap
    this.stage.m_map.load("map");
    console.log(this.stage.m_map.m_bufferB.m_tmpTile);

    // create & add player
    this.m_player = new TerraTactics.scene.Character(100, 10);


    this.m_player.debug = true;
    this.stage.addChild(this.m_player);

    this.m_player2 = new TerraTactics.scene.Character(70, 10);


    this.m_player2.debug = true;
    this.stage.addChild(this.m_player2);

    this.m_collided = false;

    this.m_artboard = new rune.display.Artboard(0, 0, 400, 225);
    this.stage.addChild(this.m_artboard);

    window.addEventListener("mousemove", function (e) {
        this.m_mouseX = e.offsetX * (400 / e.target.clientWidth);
        this.m_mouseY = e.offsetY * (225 / e.target.clientHeight);
    }.bind(this));

    window.addEventListener("mousedown", function (e) {
        this.m_mouseDown = true;
        this.m_mouseX = e.offsetX * (400 / e.target.clientWidth);
        this.m_mouseY = e.offsetY * (225 / e.target.clientHeight);
    }.bind(this));

    window.addEventListener("mouseup", function () {
        // im thinking i'll add animation/drawing for the bullet here?
        this.m_fireProjectile(this.m_player, this.m_mouseX, this.m_mouseY)
        this.m_mouseDown = false;
        this.m_artboard.canvas.clear();
    }.bind(this));

    this.m_bullet = null;
};

TerraTactics.scene.Game.prototype.m_fireProjectile = function (player, x, y) {
    var vx = (x - player.centerX) * 0.05;
    var vy = (y - player.centerY) * 0.05;

    this.m_bullet = new TerraTactics.scene.Bullet(
        player.centerX,
        player.centerY,
        vx,
        vy
    );

    this.m_bullet.debug = true;

    this.stage.addChild(this.m_bullet);
};

TerraTactics.scene.Game.prototype.m_knockback = function (player, source) {
    if (player.centerX < source.centerX) {
        player.x -= 4;
    } else {
        player.x += 4;
    }
    player.m_grounded = false;
    player.m_velocityY = -2;
};

TerraTactics.scene.Game.prototype.m_drawArc = function (source) {
    var angle = Math.atan2(this.m_mouseY - source.centerY, this.m_mouseX - source.centerX);
    var aimLength = 30;

    var endX = source.centerX + Math.cos(angle) * aimLength;
    var endY = source.centerY + Math.sin(angle) * aimLength;

    this.m_artboard.canvas.clear();
    this.m_artboard.canvas.drawLine(
        source.centerX,
        source.centerY,
        endX,
        endY,
        "red",
        3,
        1
    );
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Game.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_artboard.canvas.clear();

    if (this.m_mouseDown) {
        this.m_drawArc(this.m_player);
    }

    if (this.keyboard.pressed("LEFT")) {
        this.m_player.x -= 1;
    }

    if (this.keyboard.pressed("RIGHT")) {
        this.m_player.x += 1;
    }

    if (this.keyboard.pressed("A")) {
        this.m_player2.x -= 1;
    }

    if (this.keyboard.pressed("D")) {
        this.m_player2.x += 1;
    }

    if (this.keyboard.pressed("W") && this.m_player2.m_grounded) {
        this.m_player2.m_grounded = false;
        this.m_player2.m_velocityY = -this.m_player2.m_jumpStrength;
    }

    if (this.keyboard.pressed("UP") && this.m_player.m_grounded) {
        this.m_player.m_grounded = false;
        this.m_player.m_velocityY = -this.m_player.m_jumpStrength;
    }

    var index = this.stage.m_map.front.getTileIndexOf(this.m_player.centerX, this.m_player.bottom);
    var value = this.stage.m_map.front.getTileValueAt(index);
    var props = this.stage.m_map.getTilePropertiesOf(value);

    if (props !== null && (props.leftEdge === true || props.rightEdge === true || props.bottomEdge === true)) {
        this.m_player.m_grounded = this.m_player.hitTestAndSeparate(this.stage.m_map.front);
    }
    else {
        this.m_player.m_grounded = this.m_player.hitTestAndSeparateTilemapLayer(this.stage.m_map.front);
        this.m_player2.m_grounded = this.m_player2.hitTestAndSeparateTilemapLayer(this.stage.m_map.front);
    }


    var index2 = this.stage.m_map.front.getTileIndexOf(this.m_player2.centerX, this.m_player2.bottom);
    var value2 = this.stage.m_map.front.getTileValueAt(index2);
    var props2 = this.stage.m_map.getTilePropertiesOf(value2);

    if (props2 !== null && (props2.leftEdge === true || props2.rightEdge === true || props2.bottomEdge === true)) {
        this.m_player2.m_grounded = this.m_player2.hitTestAndSeparate(this.stage.m_map.front);
    }
    else {
        this.m_player2.m_grounded = this.m_player2.hitTestAndSeparateTilemapLayer(this.stage.m_map.front);
    }

    if (this.m_player.hitTest(this.m_player2)) {
        if (!this.m_collided) {
            this.m_knockback(this.m_player2, this.m_player);
            this.m_collided = true;
        }
    } else {
        this.m_collided = false;
    }

    if (this.m_bullet !== null) {
        if (this.m_bullet.hitTestTilemapLayer(this.stage.m_map.front)) {
            console.log('hit');
            this.stage.removeChild(this.m_bullet);
            this.m_bullet = null;
        }
    }

    if (this.m_bullet !== null) {
        if (this.m_bullet.hitTest(this.m_player2)) {
            this.m_knockback(this.m_player2, this.m_bullet);
            this.stage.removeChild(this.m_bullet);
            this.m_bullet = null;
        }
    }
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
