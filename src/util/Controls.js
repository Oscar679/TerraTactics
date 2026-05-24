


/**
 * @description Combines keyboard and gamepad input for one player.
 * @constructor
 * @class
 * @param {number} playerID - player input index.
 */
TerraTactics.util.Controls = function (playerID) {


    this.m_playerID = playerID || 0;


    this.m_gamepad = new TerraTactics.util.MappingGamepad(this.m_playerID);


    this.m_keyboard = new TerraTactics.util.MappingKeyboard(this.m_playerID);
};


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

Object.defineProperty(TerraTactics.util.Controls.prototype, "down", {
    get: function () {
        return this.m_keyboard.down || this.m_gamepad.down;
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

Object.defineProperty(TerraTactics.util.Controls.prototype, "fire", {
    get: function () {
        return this.m_keyboard.fire || this.m_gamepad.fire;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "firePressed", {
    get: function () {
        return this.m_keyboard.firePressed || this.m_gamepad.firePressed;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "fireReleased", {
    get: function () {
        return this.m_keyboard.fireReleased || this.m_gamepad.fireReleased;
    }
});

Object.defineProperty(TerraTactics.util.Controls.prototype, "confirm", {
    get: function () {
        return this.m_keyboard.confirm || this.m_gamepad.confirm;
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

Object.defineProperty(TerraTactics.util.Controls.prototype, "aiming", {
    get: function () {
        return this.m_gamepad.aiming;
    }
});
