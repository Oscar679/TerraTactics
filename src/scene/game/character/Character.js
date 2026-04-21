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
 * Character object.
 */
TerraTactics.scene.Character = function (x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.display.Sprite.call(this, x, y, 25, 18, "character_2_25x18");

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    this.m_grounded = false;
    this.m_velocityY = 0;
    this.m_gravity = 0.2;
    this.m_jumpStrength = 3.5;

    this.animation.create("idle", [0], 1, true);
    this.animation.create("jump", [0], 1, false);

};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Character.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.Character.prototype.constructor = TerraTactics.scene.Character;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once per "tick". The method is used for
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Character.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    if (!this.m_grounded) {
        this.m_velocityY += this.m_gravity;
        if (!this.animation.current || this.animation.current.name !== "jump") {
            this.animation.gotoAndPlay("jump", 0);
        }
    } else {
        this.m_velocityY = 0;
        if (!this.animation.current || this.animation.current.name !== "idle") {
            this.animation.gotoAndStop("idle", 0);
        }
    }

    this.y += this.m_velocityY;
};
