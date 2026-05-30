//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *
 * @class
 * @classdesc
 *
 * Represents a manager for keyboard and gamepad input.
 */
TerraTactics.util.Controls = function (playerID) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Player ID.
     *
     * @type {number}
     * @private
     */
    this.m_playerID = playerID || 0;

    /**
     * Gamepad handler.
     *
     * @type {TerraTactics.util.MappingGamepad}
     * @private
     */
    this.m_gamepad = new TerraTactics.util.MappingGamepad(this.m_playerID);

    /**
     * Keyboard handler.
     *
     * @type {TerraTactics.util.MappingKeyboard}
     * @private
     */
    this.m_keyboard = new TerraTactics.util.MappingKeyboard(this.m_playerID);
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

Object.defineProperty(TerraTactics.util.Controls.prototype, "up", {
    get: function () {
        return this.m_keyboard.up || this.m_gamepad.up;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "justUp", {
    get: function () {
        return this.m_keyboard.justUp || this.m_gamepad.justUp;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "justDown", {
    get: function () {
        return this.m_keyboard.justDown || this.m_gamepad.justDown;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "left", {
    get: function () {
        return this.m_keyboard.left || this.m_gamepad.left;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "justLeft", {
    get: function () {
        return this.m_keyboard.justLeft || this.m_gamepad.justLeft;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "right", {
    get: function () {
        return this.m_keyboard.right || this.m_gamepad.right;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "justRight", {
    get: function () {
        return this.m_keyboard.justRight || this.m_gamepad.justRight;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "jump", {
    get: function () {
        return this.m_keyboard.jump || this.m_gamepad.jump;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "firePressed", {
    get: function () {
        return this.m_keyboard.firePressed || this.m_gamepad.firePressed;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "confirm", {
    get: function () {
        return this.m_keyboard.confirm || this.m_gamepad.confirm;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "circle", {
    get: function () {
        return this.m_keyboard.circle || this.m_gamepad.circle;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "weaponPrevious", {
    get: function () {
        return this.m_keyboard.weaponPrevious || this.m_gamepad.weaponPrevious;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "weaponNext", {
    get: function () {
        return this.m_keyboard.weaponNext || this.m_gamepad.weaponNext;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "aimX", {
    get: function () {
        return this.m_gamepad.aimX;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "aimY", {
    get: function () {
        return this.m_gamepad.aimY;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "anyButton", {
    get: function () {
        return this.m_gamepad.anyButton;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "confirmHeld", {
    get: function () {
        return this.m_keyboard.confirm || this.m_gamepad.confirmHeld;
    }
});
