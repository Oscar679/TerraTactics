

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
 * Melee Class Extends Weapon.
 */
TerraTactics.scene.Melee = function (damage, speed, knockback, cooldown) {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    TerraTactics.scene.Weapon.call(this);

    var speed = 0.05; // Magic Number

    this.m_damage = 30; // Magic Number
    this.m_knockback = 1; // Magic Number
    this.m_cooldown = 0; // Magic Number

};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Melee.prototype = Object.create(TerraTactics.scene.Weapon.prototype);
TerraTactics.scene.Melee.prototype.constructor = TerraTactics.scene.Melee;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Melee.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};

TerraTactics.scene.Melee.m_fireProjectile = function (player, targetX, targetY) {
    var speed = 0.05; // Magic Number
    var dx = targetX - player.centerX;
    var dy = targetY - player.centerY;
    var vx = dx * speed;
    var vy = dy * speed;

    var bullet = new TerraTactics.scene.Bullet(player.centerX, player.centerY, vx, vy, this.m_damage, this.m_knockback);
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
TerraTactics.scene.Melee.prototype.update = function (step) {
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
TerraTactics.scene.Melee.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};