

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
TerraTactics.scene.Melee = function () {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    TerraTactics.scene.Weapon.call(this);

    this.m_speed = 0.05; // Magic Number

    this.m_damage = 10; // Magic Number
    this.m_knockback = 20; // Magic Number
    this.m_cooldown = 0; // Magic Number
    this.m_fireSoundId = "fist_punch";
    this.m_switchSoundId = "switch_melee";
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

//overwrite superclass method
TerraTactics.scene.Melee.prototype.m_fireProjectile = function (player, targetX, targetY, scene) {
    var gameScene = scene;
    var projectile = this.m_getProjectileData(player, targetX, targetY);
    this.m_playFireSound();
    var stats = this.m_getRoleSpecificStats(player);
    this.m_attack(player, projectile.x, projectile.y, stats.damage, stats.knockback, gameScene);
    return null;
};

TerraTactics.scene.Melee.prototype.m_attack = function (player, x, y, damage, knockback, scene) {
    var gameScene = scene;
    var inactivePlayers = gameScene.m_characters.getInactive();

    for (var i = 0; i < inactivePlayers.length; i++) {
        var inactivePlayer = inactivePlayers[i];

        if (inactivePlayer.character !== null) {
            var distance = rune.geom.Point.distance(player.centerX, player.centerY, inactivePlayer.character.centerX, inactivePlayer.character.centerY);

            if (distance < 30) {
                gameScene.m_characters.m_damageTaken(inactivePlayer.character, damage);
                gameScene.m_projectiles.m_knockback(inactivePlayer.character, {
                    centerX: player.centerX,
                    m_knockback: knockback
                });
                return;
            }
        }
    }
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
