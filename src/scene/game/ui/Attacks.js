

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * UI class for switching attacks.
 */
TerraTactics.scene.Attacks = function (x, y, attack) {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 8, 8, "attacks");
    this.attack1 = this.animation.create("attack1", [0], 1);
    this.attack2 = this.animation.create("attack2", [1], 1);
    this.attack3 = this.animation.create("attack3", [2], 1);
    this.attack4 = this.animation.create("attack4", [3], 1);

    this.animation.gotoAndStop(attack, 0);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Attacks.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.Attacks.prototype.constructor = TerraTactics.scene.Attacks;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Attacks.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Attacks.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Attacks.prototype.dispose = function () {
};
