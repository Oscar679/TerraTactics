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

/**
 * Up.
 *
 * @member {boolean} up
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "up", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.up || this.m_gamepad.up;
    }
});

/**
 * Up, once per press.
 *
 * @member {boolean} justUp
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "justUp", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.justUp || this.m_gamepad.justUp;
    }
});

/**
 * Down.
 *
 * @member {boolean} down
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "down", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.down || this.m_gamepad.down;
    }
});

/**
 * Down, once per press.
 *
 * @member {boolean} justDown
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "justDown", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.justDown || this.m_gamepad.justDown;
    }
});

/**
 * Left.
 *
 * @member {boolean} left
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "left", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.left || this.m_gamepad.left;
    }
});

/**
 * Left, once per press.
 *
 * @member {boolean} justLeft
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "justLeft", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.justLeft || this.m_gamepad.justLeft;
    }
});

/**
 * Right.
 *
 * @member {boolean} right
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "right", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.right || this.m_gamepad.right;
    }
});

/**
 * Right, once per press.
 *
 * @member {boolean} justRight
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "justRight", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.justRight || this.m_gamepad.justRight;
    }
});

/**
 * Jump.
 *
 * @member {boolean} jump
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "jump", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.jump || this.m_gamepad.jump;
    }
});

/**
 * Fire.
 *
 * @member {boolean} fire
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "fire", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.fire || this.m_gamepad.fire;
    }
});

/**
 * Fire, once when pressed.
 *
 * @member {boolean} firePressed
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "firePressed", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.firePressed || this.m_gamepad.firePressed;
    }
});

/**
 * Fire, once when released.
 *
 * @member {boolean} fireReleased
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "fireReleased", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.fireReleased || this.m_gamepad.fireReleased;
    }
});

/**
 * Confirm.
 *
 * @member {boolean} confirm
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "confirm", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.confirm || this.m_gamepad.confirm;
    }
});

/**
 * Previous weapon.
 *
 * @member {boolean} weaponPrevious
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "weaponPrevious", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.weaponPrevious || this.m_gamepad.weaponPrevious;
    }
});

/**
 * Next weapon.
 *
 * @member {boolean} weaponNext
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "weaponNext", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_keyboard.weaponNext || this.m_gamepad.weaponNext;
    }
});

/**
 * Aim x-axis.
 *
 * @member {number} aimX
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "aimX", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_gamepad.aimX;
    }
});

/**
 * Aim y-axis.
 *
 * @member {number} aimY
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "aimY", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_gamepad.aimY;
    }
});

/**
 * Whether analog aiming is active.
 *
 * @member {boolean} aiming
 * @memberof TerraTactics.util.Controls
 * @readonly
 */
Object.defineProperty(TerraTactics.util.Controls.prototype, "aiming", {
    /**
     * @this TerraTactics.util.Controls
     * @ignore
     */
    get: function () {
        return this.m_gamepad.aiming;
    }
});
