

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Speed pickup that boosts a character's movement for a turn.
 * @constructor
 * @extends TerraTactics.scene.PowerUp
 * @class
 * @param {number} x - x-coordinate for spawnpoint.
 * @param {number} y - y-coordinate for spawnpoint.
 * @param {Object} gameScene - game scene this helper works with.
 */
TerraTactics.scene.Speed = function (x, y, gameScene) {


    // Super call
    //--------------------------------------------------------------------------
    TerraTactics.scene.PowerUp.call(this);
    this.m_x = x;
    this.m_y = y;
    this.m_gameScene = gameScene;
    this.m_type = "speed";
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Speed.prototype = Object.create(TerraTactics.scene.PowerUp.prototype);
TerraTactics.scene.Speed.prototype.constructor = TerraTactics.scene.Speed;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Speed.prototype.init = function () {
    rune.display.Sprite.call(this, this.m_x, this.m_y, 48, 48, "speed");

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
TerraTactics.scene.Speed.prototype.update = function (step) {
    TerraTactics.scene.PowerUp.prototype.update.call(this, step);
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Speed.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
