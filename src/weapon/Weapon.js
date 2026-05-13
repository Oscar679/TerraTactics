

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
 * Abstract base class for all weapons.
 */
TerraTactics.scene.Weapon = function () {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this);


    this.m_damage = null;
    this.m_speed = null;
    this.m_knockback = null;
    this.m_cooldown = null;

    if (this.constructor === TerraTactics.scene.Weapon) {
        throw new Error("Abstract classes cannot be instantiated.");
    }
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Weapon.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.Weapon.prototype.constructor = TerraTactics.scene.Weapon;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Weapon.prototype.init = function () {
    throw new Error("Child classes must implement this method.");
};

TerraTactics.scene.Weapon.prototype.m_getProjectileData = function (player, targetX, targetY) {
    var dx = targetX - player.centerX;
    var dy = targetY - player.centerY;

    return {
        x: player.centerX,
        y: player.y + 2,
        vx: dx * this.m_speed,
        vy: dy * this.m_speed
    };
};

TerraTactics.scene.Weapon.prototype.m_fireProjectile = function () {
    throw new Error("Child classes must implement this method.");
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Weapon.prototype.update = function (step) {
    throw new Error("Child classes must implement this method.");
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Weapon.prototype.dispose = function () {
    throw new Error("Child classes must implement this method.");
};
