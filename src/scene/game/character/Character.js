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

    rune.display.Sprite.call(this, x || 0, y || 0, 32, 32, "player");

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    this.m_grounded = false;
    this.m_jumping = false;
    this.m_falling = true;
    this.m_velocityY = 3;
    this.m_gravity = 0.35;
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

    if (this.m_falling === true) {
        this.y += this.m_velocityY;
    }

    if (this.m_grounded === true) {
        this.m_falling = false;
        this.m_velocityY = 1;
    }

    if (this.m_jumping === true && this.m_falling === false) {
        this.m_velocityY -= this.m_gravity;
        this.y -= this.m_velocityY;

        if (this.m_velocityY <= 0) {
            this.m_jumping = false;
        }
    }
};
