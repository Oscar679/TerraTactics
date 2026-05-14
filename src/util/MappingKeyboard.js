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
 * Keyboard input mapping.
 */
TerraTactics.util.MappingKeyboard = function () {
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "up", {
    get: function () {
        return this.m_pressed("UP");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "justUp", {
    get: function () {
        return this.m_justPressed("UP");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "down", {
    get: function () {
        return this.m_pressed("DOWN");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "justDown", {
    get: function () {
        return this.m_justPressed("DOWN");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "left", {
    get: function () {
        return this.m_pressed("LEFT");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "justLeft", {
    get: function () {
        return this.m_justPressed("LEFT");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "right", {
    get: function () {
        return this.m_pressed("RIGHT");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "justRight", {
    get: function () {
        return this.m_justPressed("RIGHT");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "jump", {
    get: function () {
        return this.justUp;
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "fire", {
    get: function () {
        return this.m_pressed("SPACE");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "firePressed", {
    get: function () {
        return this.m_justPressed("SPACE");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "fireReleased", {
    get: function () {
        return this.m_justReleased("SPACE");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "confirm", {
    get: function () {
        return this.m_justPressed("ENTER") || this.m_justPressed("SPACE");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "weaponPrevious", {
    get: function () {
        return this.m_justPressed("Q");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "weaponNext", {
    get: function () {
        return this.m_justPressed("E");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "weaponOne", {
    get: function () {
        return this.m_justPressed("ONE");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "weaponTwo", {
    get: function () {
        return this.m_justPressed("TWO");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "weaponThree", {
    get: function () {
        return this.m_justPressed("THREE");
    }
});

Object.defineProperty(TerraTactics.util.MappingKeyboard.prototype, "weaponFour", {
    get: function () {
        return this.m_justPressed("FOUR");
    }
});

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Gets the Rune keyboard handler.
 *
 * @returns {rune.input.Keyboard|null}
 * @private
 */
TerraTactics.util.MappingKeyboard.prototype.m_getKeyboard = function () {
    if (rune.system.Application.instance !== null) {
        return rune.system.Application.instance.inputs.keyboard;
    }

    return null;
};

/**
 * Reads a held key safely.
 *
 * @param {string} key Key name.
 *
 * @returns {boolean}
 * @private
 */
TerraTactics.util.MappingKeyboard.prototype.m_pressed = function (key) {
    var keyboard = this.m_getKeyboard();
    return keyboard !== null ? keyboard.pressed(key) : false;
};

/**
 * Reads a just-pressed key safely.
 *
 * @param {string} key Key name.
 *
 * @returns {boolean}
 * @private
 */
TerraTactics.util.MappingKeyboard.prototype.m_justPressed = function (key) {
    var keyboard = this.m_getKeyboard();
    return keyboard !== null ? keyboard.justPressed(key) : false;
};

/**
 * Reads a just-released key safely.
 *
 * @param {string} key Key name.
 *
 * @returns {boolean}
 * @private
 */
TerraTactics.util.MappingKeyboard.prototype.m_justReleased = function (key) {
    var keyboard = this.m_getKeyboard();
    return keyboard !== null ? keyboard.justReleased(key) : false;
};
