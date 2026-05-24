//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Creates a playable character with movement, health, role, and weapons.
 * @constructor
 * @extends rune.display.Sprite
 * @class
 * @param {number} x - x-coordinate of spawn point.
 * @param {number} y - y-coordinate of spawn point.
 * @param {string} role - role assigned to the character.
 */
TerraTactics.scene.Character = function (x, y, role) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    rune.display.Sprite.call(this, x, y, 24, 24, role);

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    this.m_role = role;
    this.m_grounded = false;
    this.m_velocityY = 0;
    this.m_gravity = 0.2;
    this.m_jumpStrength = 3.5;
    this.m_collided = false;
    this.m_movingLeft = false;
    this.m_movingRight = false;
    this.m_isJumping = false;
    this.m_isTouchingLava = false;
    this.m_airborneTicks = 0;
    this.m_speed = 1;

    this.m_maxHealth = 100;
    this.m_health = this.m_maxHealth;

    this.m_healthBar = new rune.ui.Progressbar(20, 3, "#000000", "#ff004d");
    this.m_healthBar.progress = this.m_health / this.m_maxHealth;

    this.hitbox.set(8, 4, 8, 16);

    this.animation.create("idle", [0, 1, 2, 3], 6, true);
    this.animation.create("walk", [4, 5, 6, 7], 6, true);
    this.animation.create("jump", [8, 9, 10], 6, false);

    this.animation.gotoAndPlay("idle", 0);

    this.m_guns = TerraTactics.data.Weapons;

    this.m_weaponState = {
        "currentWeapon": "pistol",
        cooldowns: {
            "pistol": 0,
            "rifle": 0,
            "grenade": 0,
            "melee": 0
        }
    }
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Character.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.Character.prototype.constructor = TerraTactics.scene.Character;

/**
 * @description True when the given weapon is off cooldown.
 * @param {string} weapon - weapon to be checked.
 * @returns {boolean} - if weapon not on cooldown, true, otherwise false.
 */
TerraTactics.scene.Character.prototype.m_canFire = function (weapon) {
    if (this.m_weaponState.cooldowns[weapon] === 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * @description Asks the equipped weapon to create a projectile.
 * @param {number} targetX - x-coordinate of mouse position.
 * @param {number} targetY - y-coordinate of mouse position.
 * @returns {TerraTactics.scene.Bullet} - fired projectile.
 */
TerraTactics.scene.Character.prototype.m_fireProjectile = function (targetX, targetY) {
    var weapon = this.m_guns[this.m_weaponState.currentWeapon];

    if (!weapon || !weapon.m_fireProjectile) {
        throw new Error("Invalid weapon");
    }

    this.m_movingLeft = false;
    this.m_movingRight = false;

    return weapon.m_fireProjectile(this, targetX, targetY);
};


/**
 * @description Changes animation only when a different one is needed.
 * @param {string} name - name of animation to play.
 * @returns {undefined}
 */
TerraTactics.scene.Character.prototype.m_playAnimation = function (name) {
    if (!this.animation.current || this.animation.current.name !== name) {
        this.animation.gotoAndPlay(name, 0);
    }
};


//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Character.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    if (!this.m_grounded) {
        this.m_velocityY += this.m_gravity;
        this.m_airborneTicks++;

        if (this.m_isJumping || this.m_airborneTicks > 2) {
            this.m_playAnimation("jump");
        } else if (this.m_movingLeft || this.m_movingRight) {
            this.m_playAnimation("walk");
        } else {
            this.m_playAnimation("idle");
        }
    } else if (this.m_movingLeft || this.m_movingRight) {
        this.m_velocityY = 0;
        this.m_playAnimation("walk");
    } else {
        this.m_velocityY = 0;
        this.m_playAnimation("idle");
    }

    this.y += this.m_velocityY;

    this.m_healthBar.x = this.x + 2;
    this.m_healthBar.y = this.y - 5;
    this.m_healthBar.progress = this.m_health / this.m_maxHealth;
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Character.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

Object.defineProperty(TerraTactics.scene.Character.prototype, "weapon", {
    get: function () {
        return this.m_weaponState.currentWeapon;
    },
    set: function (value) {
        this.m_weaponState.currentWeapon = value;
    }
});

Object.defineProperty(TerraTactics.scene.Character.prototype, "role", {
    get: function () {
        return this.m_role;
    }
});

Object.defineProperty(TerraTactics.scene.Character.prototype, "getCurrentCooldown", {
    get: function () {
        var weapon = this.weapon;
        return this.m_weaponState.cooldowns[weapon] || 0;
    }
});

Object.defineProperty(TerraTactics.scene.Character.prototype, "maxHealth", {
    get: function () {
        return this.m_maxHealth;
    }
});

Object.defineProperty(TerraTactics.scene.Character.prototype, "health", {
    get: function () {
        return this.m_health;
    },
    set: function (value) {
        this.m_health = value;
    }
});

Object.defineProperty(TerraTactics.scene.Character.prototype, "speed", {
    get: function () {
        return this.m_speed;
    },
    set: function (value) {
        this.m_speed = value;
    }
});

Object.defineProperty(TerraTactics.scene.Character.prototype, "cooldown", {
    set: function (value) {
        var cooldown = TerraTactics.data.Weapons[value].cooldown;

        if (cooldown > 0) {
            this.m_weaponState.cooldowns[value] = cooldown + 1;
        } else {
            this.m_weaponState.cooldowns[value] = 0;
        }
    }
});
