

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Shared falling and type behavior for all powerups.
 * @constructor
 * @extends rune.display.Sprite
 * @class
 *
 */
TerraTactics.scene.PowerUp = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    rune.display.Sprite.call(this);
    this.m_grounded = true;
    this.m_velocityY = 0;
    this.m_gravity = 0.2;

    if (this.constructor === TerraTactics.scene.PowerUp) {
        throw new Error("Abstract classes cannot be instantiated.");
    }
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.PowerUp.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.PowerUp.prototype.constructor = TerraTactics.scene.PowerUp;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.PowerUp.prototype.init = function () {
    throw new Error("Child classes must implement this method.");
};


/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.PowerUp.prototype.update = function (step) {
    if (!this.m_grounded) {
        this.m_velocityY += this.m_gravity;
        this.y += this.m_velocityY;
    }
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.PowerUp.prototype.dispose = function () {
    throw new Error("Child classes must implement this method.");
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

Object.defineProperty(TerraTactics.scene.PowerUp.prototype, "grounded", {
    get: function () {
        return this.m_grounded;
    },
    set: function (value) {
        this.m_grounded = value;
    }
});

Object.defineProperty(TerraTactics.scene.PowerUp.prototype, "velocity", {
    get: function () {
        return this.m_velocityY;
    },
    set: function (value) {
        this.m_velocityY = value;
    }
});

Object.defineProperty(TerraTactics.scene.PowerUp.prototype, "type", {
    get: function () {
        return this.m_type;
    },
});
