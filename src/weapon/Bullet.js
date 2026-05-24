
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Builds a projectile with movement, damage, and knockback.
 *
 * @constructor
 * @extends rune.display.Sprite
 * @class
 * @param {number} x - x-coordinate of bullet spawn point.
 * @param {number} y - y-coordinate of bullet spawn point.
 * @param {number} vx - horizontal velocity of bullet.
 * @param {number} vy - vertical velocity of bullet.
 * @param {number} damage - amount of damage dealt by bullet.
 * @param {number} knockback - amount of knockback applied by bullet.
 */
TerraTactics.scene.Bullet = function (x, y, vx, vy, damage, knockback) {


    // Super call
    //--------------------------------------------------------------------------
    rune.display.Sprite.call(this, x, y, 6, 6, "bullet");

    this.hitbox.set(1, 1, 1, 1);
  //  this.hitbox.debug = true;

    this.m_velocityX = vx;
    this.m_velocityY = vy;
    this.m_gravity = TerraTactics.scene.Bullet.GRAVITY;
    this.m_damage = damage;
    this.m_knockback = knockback;
};

/**
 * @description Downward force applied to bullets every tick.
 * @type {number}
 */
TerraTactics.scene.Bullet.GRAVITY = 0.1;

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Bullet.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.Bullet.prototype.constructor = TerraTactics.scene.Bullet;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Bullet.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
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
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Bullet.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
