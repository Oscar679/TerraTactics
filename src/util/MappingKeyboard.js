


/**
 * @description Maps keyboard keys into the controls the game expects.
 * @constructor
 * @class
 */
TerraTactics.util.MappingKeyboard = function () {
};


TerraTactics.util.MappingKeyboard.prototype.m_getKeyboard = function () {
    if (rune.system.Application.instance !== null) {
        return rune.system.Application.instance.inputs.keyboard;
    }

    return null;
};


TerraTactics.util.MappingKeyboard.prototype.m_pressed = function (key) {
    var keyboard = this.m_getKeyboard();
    return keyboard !== null ? keyboard.pressed(key) : false;
};


TerraTactics.util.MappingKeyboard.prototype.m_justPressed = function (key) {
    var keyboard = this.m_getKeyboard();
    return keyboard !== null ? keyboard.justPressed(key) : false;
};


TerraTactics.util.MappingKeyboard.prototype.m_justReleased = function (key) {
    var keyboard = this.m_getKeyboard();
    return keyboard !== null ? keyboard.justReleased(key) : false;
};


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
