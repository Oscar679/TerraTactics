
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Sprite used behind one of the match timers.
 * @constructor
 * @class
 * @param {number} x - x-coordinate of timer bar.
 * @param {number} y - y-coordinate of timer bar.
 */
TerraTactics.scene.TimeBar = function (x, y) {
    rune.display.Sprite.call(this, x, y, 96, 48, "time-bar");

    this.scaleY = 0.8;
};

//inheritance

TerraTactics.scene.TimeBar.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.TimeBar.prototype.constructor = TerraTactics.scene.TimeBar;

/**
 * @description Switches the timer bar between active and inactive animation.
 * @param {boolean} active - true if the timer bar should appear active.
 * @returns {undefined}
 */
TerraTactics.scene.TimeBar.prototype.m_active = function (active) {
    if (active) {
        this.animation.gotoAndPlay("active", 0);
    } else {
        this.animation.gotoAndStop("inactive", 0);
    }
};
