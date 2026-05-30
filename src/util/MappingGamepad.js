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

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "up", {
    get: function () {
        return this.m_pressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_UP);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "circle", {
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_CIRCLE);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "justUp", {
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_UP);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "justDown", {
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_DOWN);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "right", {
    get: function () {
        return this.m_pressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_RIGHT);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "justRight", {
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_RIGHT);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "left", {
    get: function () {
        return this.m_pressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_LEFT);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "justLeft", {
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_DPAD_LEFT);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "jump", {
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_CROSS);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "firePressed", {
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_SQUARE);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "confirm", {
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_CROSS) ||
            this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_OPTIONS);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "confirmHeld", {
    get: function () {
        return this.m_pressed(TerraTactics.util.MappingGamepad.BUTTON_CROSS) ||
            this.m_pressed(TerraTactics.util.MappingGamepad.BUTTON_OPTIONS);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "weaponPrevious", {
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_L1);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "weaponNext", {
    get: function () {
        return this.m_justPressed(TerraTactics.util.MappingGamepad.BUTTON_R1);
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "aimX", {
    get: function () {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : null;
        var gamepad = gamepads !== null ? gamepads[this.m_playerID] : null;

        return gamepad !== null && gamepad.axes ? gamepad.axes[0] || 0 : 0;
    }
});

Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "aimY", {
    get: function () {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : null;
        var gamepad = gamepads !== null ? gamepads[this.m_playerID] : null;

        return gamepad !== null && gamepad.axes ? gamepad.axes[1] || 0 : 0;
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
 * Reads a held button.
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
 * Reads a just-pressed button.
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
 * Reads a just-released button.
 *
 * @param {number} button Button ID.
 *
 * @returns {boolean}
 * @private
 */
Object.defineProperty(TerraTactics.util.MappingGamepad.prototype, "anyButton", {
    get: function () {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : null;
        var gamepad = gamepads !== null ? gamepads[this.m_playerID] : null;

        if (gamepad === null ||
            gamepad === undefined ||
            gamepad.buttons === null ||
            gamepad.buttons === undefined) {
            return false;
        }

        for (var i = 0; i < gamepad.buttons.length; i++) {
            if (i === TerraTactics.util.MappingGamepad.BUTTON_DPAD_LEFT ||
                i === TerraTactics.util.MappingGamepad.BUTTON_DPAD_RIGHT) {
                continue;
            }

            if (gamepad.buttons[i] !== null &&
                gamepad.buttons[i] !== undefined &&
                gamepad.buttons[i].pressed) {
                return true;
            }
        }

        return false;
    }
});
