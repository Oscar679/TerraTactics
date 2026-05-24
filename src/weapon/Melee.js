

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Sets up the melee weapon stats and sounds.
 * @constructor
 * @extends TerraTactics.scene.Weapon
 * @class
 */
TerraTactics.scene.Melee = function () {


    // Super call
    //--------------------------------------------------------------------------
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
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Melee.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Melee.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Melee.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
