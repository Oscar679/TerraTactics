

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Sets up the pistol weapon stats and sounds.
 * @constructor
 * @extends TerraTactics.scene.Weapon
 * @class
 */
TerraTactics.scene.Pistol = function () {


    // Super call
    //--------------------------------------------------------------------------
    TerraTactics.scene.Weapon.call(this);

    this.m_speed = 0.05; // Magic Number
    this.m_damage = 30; // Magic Number
    this.m_knockback = 1; // Magic Number
    this.m_cooldown = 0; // Magic Number
    this.m_fireSoundId = "pistol_fire";
    this.m_switchSoundId = "switch_pistol";

};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Pistol.prototype = Object.create(TerraTactics.scene.Weapon.prototype);
TerraTactics.scene.Pistol.prototype.constructor = TerraTactics.scene.Pistol;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Pistol.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Pistol.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Pistol.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
