

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Sets up the rifle weapon stats and sounds.
 * @constructor
 * @extends TerraTactics.scene.Weapon
 * @class
 */
TerraTactics.scene.Rifle = function () {


    // Super call
    //--------------------------------------------------------------------------
    TerraTactics.scene.Weapon.call(this);

    this.m_speed = 0.1; // Magic Number
    this.m_damage = 50; // Magic Number
    this.m_knockback = 3; // Magic Number
    this.m_cooldown = 1; // Magic Number
    this.m_fireSoundId = "rifle_fire";
    this.m_switchSoundId = "switch_rifle";
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Rifle.prototype = Object.create(TerraTactics.scene.Weapon.prototype);
TerraTactics.scene.Rifle.prototype.constructor = TerraTactics.scene.Rifle;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Rifle.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Rifle.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Rifle.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
