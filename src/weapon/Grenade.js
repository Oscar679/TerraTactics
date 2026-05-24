

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Sets up the grenade weapon stats and sounds.
 * @constructor
 * @extends TerraTactics.scene.Weapon
 * @class
 */
TerraTactics.scene.Grenade = function () {


    // Super call
    //--------------------------------------------------------------------------
    TerraTactics.scene.Weapon.call(this);

    this.m_speed = 0.1; // Magic Number
    this.m_damage = 50; // Magic Number
    this.m_knockback = 5; // Magic Number
    this.m_cooldown = 2; // Magic Number
    this.m_fireSoundId = "grenade_throw";
    this.m_switchSoundId = "switch_grenade";
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
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Grenade.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Grenade.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Grenade.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
