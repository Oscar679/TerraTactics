
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @class
 * @classdesc
 * 
 * UI class for switching attacks.
 */
TerraTactics.scene.TimeBar = function (x, y) {
    rune.display.Sprite.call(this, x, y, 96, 48, "time-bar");

    this.scaleY = 0.8;
};

//inheritance

TerraTactics.scene.TimeBar.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.TimeBar.prototype.constructor = TerraTactics.scene.TimeBar;

TerraTactics.scene.TimeBar.prototype.m_active = function (active) {
    if (active) {
        this.animation.gotoAndPlay("active", 0);
    } else {
        this.animation.gotoAndStop("inactive", 0);
    }
};
