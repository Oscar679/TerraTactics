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

    this.m_artboard = new rune.display.Artboard(0, 0, 400, 225);
    this.stage.addChild(this.m_artboard);

    window.addEventListener("mousemove", function (e) {
        this.m_mouseX = e.offsetX * (400 / e.target.clientWidth);
        this.m_mouseY = e.offsetY * (225 / e.target.clientHeight);
    }.bind(this));

    window.addEventListener("mousedown", function (e) {
        if (this.m_activePlayer !== null && this.m_bullet === null) {
            this.m_mouseDown = true;
            this.m_mouseX = e.offsetX * (400 / e.target.clientWidth);
            this.m_mouseY = e.offsetY * (225 / e.target.clientHeight);
        }
    }.bind(this));

    window.addEventListener("mouseup", function () {
        // im thinking i'll add animation/drawing for the bullet here?
        if (this.m_activePlayer !== null && this.m_bullet === null && this.m_activePlayer.m_canFire(this.m_activePlayer.m_getWeapon())) {
            this.m_bullet = this.m_activePlayer.m_fireProjectile(this.m_mouseX, this.m_mouseY);
            this.m_activePlayer.m_setCooldown(this.m_activePlayer.m_getWeapon());
            this.stage.addChild(this.m_bullet);
        }
        this.m_mouseDown = false;
    }.bind(this));

    this.attack1 = new TerraTactics.scene.Attacks(100, 10, "attack1");
    this.stage.addChild(this.attack1);

    this.attack2 = new TerraTactics.scene.Attacks(135, 10, "attack2");
    this.stage.addChild(this.attack2);

    this.attack3 = new TerraTactics.scene.Attacks(170, 10, "attack3");
    this.stage.addChild(this.attack3);

    this.attack4 = new TerraTactics.scene.Attacks(205, 10, "attack4");
    this.stage.addChild(this.attack4);

    this.m_bullet = null;

    this.m_characters = new TerraTactics.scene.Characters(this.stage);

    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayer = this.m_characters.getInactive();
};

TerraTactics.scene.Game.prototype.m_fireProjectile = function (player, x, y) {
    this.stage.addChild(this.m_bullet);
};

TerraTactics.scene.Game.prototype.m_knockback = function (player, source) {
    console.log(source);
    if (player.centerX < source.centerX) {
        player.x -= source.m_knockback;
    } else {
        player.x += source.m_knockback;
    }
    player.m_grounded = false;
    player.m_velocityY = -2;
};

TerraTactics.scene.Game.prototype.m_drawArc = function (source) {

    if (source === null || source.m_health <= 0) {
        return;
    }

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

    if (this.m_activePlayer === null || this.m_inActivePlayer === null) {
        this.m_mouseDown = false;
        return;
    }

    if (this.m_mouseDown) {
        this.m_drawArc(this.m_activePlayer);
    }

    if (this.keyboard.pressed("LEFT")) {
        this.m_activePlayer.x -= 1;
    }

    if (this.keyboard.pressed("RIGHT")) {
        this.m_activePlayer.x += 1;
    }

    if (this.keyboard.pressed("UP") && this.m_activePlayer.m_grounded) {
        this.m_activePlayer.m_grounded = false;
        this.m_activePlayer.m_velocityY = -this.m_activePlayer.m_jumpStrength;
    }

    if (this.m_bullet !== null) {
        if (this.m_bullet.hitTestTilemapLayer(this.stage.m_map.front)) {
            console.log('hit');
            this.stage.removeChild(this.m_bullet);
            this.m_bullet = null;

            this.m_characters.switchTurn();
        }
    }

    if (this.m_bullet !== null) {
        if (this.m_bullet.hitTest(this.m_inActivePlayer)) {
            this.m_inActivePlayer.m_health -= this.m_bullet.m_damage;
            console.log(this.m_inActivePlayer.m_health);
            this.m_knockback(this.m_inActivePlayer, this.m_bullet);
            this.stage.removeChild(this.m_bullet);
            this.m_bullet = null;

            this.m_characters.switchTurn();
        }
    }

    this.m_characters.update(this.stage.m_map.front);

    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayer = this.m_characters.getInactive();

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
