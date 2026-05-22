

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends TerraTactics.scene.PowerUp
 *
 * @class
 * @classdesc
 * 
 * Abstract base class for all weapons.
 */
TerraTactics.scene.Health = function (x, y, gameScene) {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
   TerraTactics.scene.PowerUp.call(this);
    this.m_x = x;
    this.m_y = y;
    this.m_gameScene = gameScene;
    this.m_type = "health";
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Health.prototype = Object.create(TerraTactics.scene.PowerUp.prototype);
TerraTactics.scene.Health.prototype.constructor = TerraTactics.scene.Health;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Health.prototype.init = function () {
    rune.display.Sprite.call(this, this.m_x, this.m_y, 48, 48, "pistol");
    
    this.scaleX = 0.4;
    this.scaleY = 0.4;
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Health.prototype.update = function (step) {
   TerraTactics.scene.PowerUp.prototype.update.call(this, step);
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Health.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
