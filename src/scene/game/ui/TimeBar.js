
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 *
 * Timer bar used by the match timers.
 */
TerraTactics.scene.TimeBar = function (x, y) {
    rune.display.Sprite.call(this, x, y, 96, 48, "time-bar");

    this.scaleY = 0.8;
};

//inheritance

TerraTactics.scene.TimeBar.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.TimeBar.prototype.constructor = TerraTactics.scene.TimeBar;
