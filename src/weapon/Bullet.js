
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
 * Options scene.
 */
TerraTactics.scene.Bullet = function (x, y, vx, vy, damage, knockback) {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y - 5, 6, 6, "bullet");

    this.hitbox.debug = true;

    this.m_velocityX = vx;
    this.m_velocityY = vy;
    this.m_gravity = 0.1;
    this.m_damage = damage;
    this.m_knockback = knockback;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Bullet.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.Bullet.prototype.constructor = TerraTactics.scene.Bullet;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Bullet.prototype.init = function () {
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
TerraTactics.scene.Bullet.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.x += this.m_velocityX;
    this.y += this.m_velocityY;
    this.m_velocityY += this.m_gravity;
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Bullet.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};