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
 * Gamepad input mapping.
 */
TerraTactics.util.MappingGamepad = function (playerID) {

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
};

//------------------------------------------------------------------------------
// Public static properties
//------------------------------------------------------------------------------

// PS4 controller button IDs as exposed by the browser Gamepad API.
TerraTactics.util.MappingGamepad.BUTTON_CROSS = 0;
TerraTactics.util.MappingGamepad.BUTTON_CIRCLE = 1;
TerraTactics.util.MappingGamepad.BUTTON_SQUARE = 2;
TerraTactics.util.MappingGamepad.BUTTON_TRIANGLE = 3;
TerraTactics.util.MappingGamepad.BUTTON_L1 = 4;
TerraTactics.util.MappingGamepad.BUTTON_R1 = 5;
TerraTactics.util.MappingGamepad.BUTTON_L2 = 6;
TerraTactics.util.MappingGamepad.BUTTON_R2 = 7;
TerraTactics.util.MappingGamepad.BUTTON_SHARE = 8;
TerraTactics.util.MappingGamepad.BUTTON_OPTIONS = 9;
TerraTactics.util.MappingGamepad.BUTTON_L3 = 10;
TerraTactics.util.MappingGamepad.BUTTON_R3 = 11;
TerraTactics.util.MappingGamepad.BUTTON_DPAD_UP = 12;
TerraTactics.util.MappingGamepad.BUTTON_DPAD_DOWN = 13;
TerraTactics.util.MappingGamepad.BUTTON_DPAD_LEFT = 14;
TerraTactics.util.MappingGamepad.BUTTON_DPAD_RIGHT = 15;
TerraTactics.util.MappingGamepad.AIM_DEADZONE = 0.25;

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * Up.
 *
 * @member {boolean} up
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "up", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_pressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_UP);
    }
});

/**
 * Up alias kept for older game code.
 *
 * @member {boolean} leftUp
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "leftUp", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.up;
    }
});

/**
 * Up, once per press.
 *
 * @member {boolean} justUp
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "justUp", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_UP);
    }
});

/**
 * Down.
 *
 * @member {boolean} down
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "down", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_pressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_DOWN);
    }
});

/**
 * Down, once per press.
 *
 * @member {boolean} justDown
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "justDown", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_DOWN);
    }
});

/**
 * Right.
 *
 * @member {boolean} right
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "right", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_pressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_RIGHT);
    }
});

/**
 * Right, once per press.
 *
 * @member {boolean} justRight
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "justRight", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_RIGHT);
    }
});

/**
 * Left.
 *
 * @member {boolean} left
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "left", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_pressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_LEFT);
    }
});

/**
 * Left, once per press.
 *
 * @member {boolean} justLeft
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "justLeft", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_LEFT);
    }
});

/**
 * Jump.
 *
 * @member {boolean} jump
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "jump", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_CROSS);
    }
});

/**
 * Fire.
 *
 * @member {boolean} fire
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "fire", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_pressed(TerraTactics.util.MappingGamepad.BUTTON_SQUARE);
    }
});

/**
 * Fire, once when pressed.
 *
 * @member {boolean} firePressed
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "firePressed", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_SQUARE);
    }
});

/**
 * Fire, once when released.
 *
 * @member {boolean} fireReleased
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "fireReleased", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_justReleased(TerraTactics.util.MappingGamepad.BUTTON_SQUARE);
    }
});

/**
 * Confirm.
 *
 * @member {boolean} confirm
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "confirm", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_CROSS) ||
            this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_OPTIONS);
    }
});

/**
 * Toggle weapon menu.
 *
 * @member {boolean} toggleWeapons
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "toggleWeapons", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_R1);
    }
});

/**
 * Weapon shortcut 1.
 *
 * @member {boolean} weaponOne
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "weaponOne", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return false;
    }
});

/**
 * Weapon shortcut 2.
 *
 * @member {boolean} weaponTwo
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "weaponTwo", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return false;
    }
});

/**
 * Weapon shortcut 3.
 *
 * @member {boolean} weaponThree
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "weaponThree", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return false;
    }
});

/**
 * Weapon shortcut 4.
 *
 * @member {boolean} weaponFour
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "weaponFour", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return false;
    }
});

/**
 * Left stick x-axis.
 *
 * @member {number} aimX
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "aimX", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        var gamepad = this.m_getGamepad();
        return gamepad !== null ? gamepad.stickLeft.x : 0;
    }
});

/**
 * Left stick y-axis.
 *
 * @member {number} aimY
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "aimY", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        var gamepad = this.m_getGamepad();
        return gamepad !== null ? gamepad.stickLeft.y : 0;
    }
});

/**
 * Whether the left stick is currently aiming.
 *
 * @member {boolean} aiming
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "aiming", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return Math.abs(this.aimX) > TerraTactics.util.MappingGamepad.AIM_DEADZONE ||
            Math.abs(this.aimY) > TerraTactics.util.MappingGamepad.AIM_DEADZONE;
    }
});

/**
 * Walk left alias.
 *
 * @member {boolean} walkLeft
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "walkLeft", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.left;
    }
});

/**
 * Walk right alias.
 *
 * @member {boolean} walkRight
 * @memberof TerraTactics.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "walkRight", {
    /**
     * @this TerraTactics.util.MappingGamepad
     * @ignore
     */
    get: function () {
        return this.right;
    }
});

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Gets the mapped Rune gamepad.
 *
 * @returns {rune.input.Gamepad|null}
 * @private
 */
TerraTactics.util.MappingGamepad.prototype.m_getGamepad = function () {
    var gamepads = null;

    if (rune.system.Application.instance !== null) {
        gamepads = rune.system.Application.instance.inputs.gamepads;
    }

    if (gamepads !== null) {
        try {
            return gamepads.get(this.m_playerID);
        } catch (error) {
            return null;
        }
    }

    return null;
};

/**
 * Gets a boolean stick property safely.
 *
 * @param {string} property Stick property name.
 *
 * @returns {boolean}
 * @private
 */
TerraTactics.util.MappingGamepad.prototype.m_stick = function (property) {
    var gamepad = this.m_getGamepad();

    if (gamepad !== null) {
        try {
            return gamepad[property] === true;
        } catch (error) {
            return false;
        }
    }

    return false;
};

/**
 * Reads a held button safely.
 *
 * @param {number} button Button ID.
 *
 * @returns {boolean}
 * @private
 */
TerraTactics.util.MappingGamepad.prototype.m_pressed = function (button) {
    var gamepad = this.m_getGamepad();

    if (gamepad !== null) {
        try {
            return gamepad.pressed(button);
        } catch (error) {
            return false;
        }
    }

    return false;
};

/**
 * Reads a just-pressed button safely.
 *
 * @param {number} button Button ID.
 *
 * @returns {boolean}
 * @private
 */
TerraTactics.util.MappingGamepad.prototype.m_justPressed = function (button) {
    var gamepad = this.m_getGamepad();

    if (gamepad !== null) {
        try {
            return gamepad.justPressed(button);
        } catch (error) {
            return false;
        }
    }

    return false;
};

/**
 * Reads a just-released button safely.
 *
 * @param {number} button Button ID.
 *
 * @returns {boolean}
 * @private
 */
TerraTactics.util.MappingGamepad.prototype.m_justReleased = function (button) {
    var gamepad = this.m_getGamepad();

    if (gamepad !== null) {
        try {
            return gamepad.justReleased(button);
        } catch (error) {
            return false;
        }
    }

    return false;
};
