

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends TerraTactics.scene.Weapon
 *
 * @class
 * @classdesc
 * 
 * Grenade Class Extends Weapon.
 */
TerraTactics.scene.Grenade = function () {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    TerraTactics.scene.Weapon.call(this);

    this.m_speed = 0.1; // Magic Number
    this.m_damage = 50; // Magic Number
    this.m_knockback = 5; // Magic Number
    this.m_cooldown = 2; // Magic Number
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Grenade.prototype = Object.create(TerraTactics.scene.Weapon.prototype);
TerraTactics.scene.Grenade.prototype.constructor = TerraTactics.scene.Grenade;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Grenade.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};

TerraTactics.scene.Grenade.prototype.m_fireProjectile = function (player, targetX, targetY) {
    var dx = targetX - player.centerX;
    var dy = targetY - player.centerY;
    var vx = dx * this.m_speed;
    var vy = dy * this.m_speed;

    var bullet = new TerraTactics.scene.Bullet(player.centerX + 10, player.centerY - 20, vx, vy, this.m_damage, this.m_knockback);
    return bullet;
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Grenade.prototype.update = function (step) {
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
TerraTactics.scene.Grenade.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};