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


    this.stage.m_map.load("map");

    console.log(this.stage.m_map.back);

    console.log(this.stage.m_map.getTilePropertiesOf(1));
    console.log(this.stage.m_map.getTilePropertiesOf(2));
    console.log(this.stage.m_map.getTilePropertiesOf(3));
    console.log(this.stage.m_map.getTilePropertiesOf(13));
    console.log(this.stage.m_map.getTilePropertiesOf(14));
    console.log(this.stage.m_map.getTilePropertiesOf(15));


    this.m_player = new TerraTactics.scene.Character(50, 50);

    this.m_player.scaleY = 0.3;
    this.m_player.scaleX = 0.3

    this.m_player.debug = true;
    this.stage.addChild(this.m_player);
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


    if (this.keyboard.pressed("LEFT")) {
        this.m_player.x -= 1;
    }

    if (this.keyboard.pressed("RIGHT")) {
        this.m_player.x += 1;
    }

    if (this.keyboard.pressed("SPACE") && this.m_player.m_grounded) {

        this.m_player.m_grounded = false;
        this.m_player.m_velocityY = -this.m_player.m_jumpStrength;
    }

    var index = this.stage.m_map.back.getTileIndexOf(this.m_player.bottomLeft.x, this.m_player.bottomLeft.y);
    var value = this.stage.m_map.back.getTileValueAt(index);
    var props = this.stage.m_map.getTilePropertiesOf(value);

    if (props !== null) {
        if (props.leftEdge === true) {
            console.log("left edge island");
            this.m_player.m_grounded = true;
            this.m_player.hitTestAndSeparate(this.stage.m_map.back)
            //apply sprite collision
        }
        if (props.rightEdge === true) {
            console.log("right edge island");
            this.m_player.m_grounded = true;
            this.m_player.hitTestAndSeparate(this.stage.m_map.back)
            //apply sprite collision
        }

        if (props.leftEdge === false && props.rightEdge === false) {
            this.m_player.m_collided = this.m_player.hitTestAndSeparateTilemapLayer(this.stage.m_map.back);
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
