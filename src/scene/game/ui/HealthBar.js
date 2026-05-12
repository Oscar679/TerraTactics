
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
TerraTactics.scene.HealthBar = function (x, y) {
    rune.display.Sprite.call(this, x, y, 240, 480, "hp-bar");

};

//inheritance

TerraTactics.scene.HealthBar.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.HealthBar.prototype.constructor = TerraTactics.scene.HealthBar;

TerraTactics.scene.HealthBar.prototype.m_active = function (active) {
    if (active) {
        this.animation.gotoAndPlay("active", 0);
    } else {
        this.animation.gotoAndStop("inactive", 0);
    }
};
