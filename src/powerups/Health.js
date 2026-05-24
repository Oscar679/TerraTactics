

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Health pickup that restores part of a character's health.
 * @constructor
 * @extends TerraTactics.scene.PowerUp
 * @class
 * @param {number} x - x-coordinate for spawnpoint.
 * @param {number} y - y-coordinate for spawnpoint.
 * @param {Object} gameScene - game scene this helper works with.
 */
TerraTactics.scene.Health = function (x, y, gameScene) {


    // Super call
    //--------------------------------------------------------------------------
    TerraTactics.scene.PowerUp.call(this);
    this.m_x = x;
    this.m_y = y;
    this.m_gameScene = gameScene;
    this.m_type = "health";
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
TerraTactics.scene.Health.prototype = Object.create(TerraTactics.scene.PowerUp.prototype);
TerraTactics.scene.Health.prototype.constructor = TerraTactics.scene.Health;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Health.prototype.init = function () {
    rune.display.Sprite.call(this, this.m_x, this.m_y, 48, 48, "health");

    this.scaleX = 0.4;
    this.scaleY = 0.4;
};

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Health.prototype.update = function (step) {
    TerraTactics.scene.PowerUp.prototype.update.call(this, step);
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Health.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
