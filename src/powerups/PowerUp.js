

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
 * Abstract base class for all weapons.
 */
TerraTactics.scene.PowerUp = function () {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
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
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.PowerUp.prototype.init = function () {
    throw new Error("Child classes must implement this method.");
};

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

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
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
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
TerraTactics.scene.PowerUp.prototype.dispose = function () {
    throw new Error("Child classes must implement this method.");
};
