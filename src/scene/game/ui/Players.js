
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
TerraTactics.scene.Players = function (x, y, weapon, onClick) {
    rune.display.Sprite.call(this, x, y, 48, 48, weapon);

    this.scaleX = 0.9;
    this.scaleY = 0.9;


};

//inheritance

TerraTactics.scene.Players.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.Players.prototype.constructor = TerraTactics.scene.Players;

TerraTactics.scene.Players.prototype.m_active = function (active) {
    if (active) {
        this.animation.gotoAndPlay("active", 0);
    } else {
        this.animation.gotoAndStop("inactive", 0);
    }
};
