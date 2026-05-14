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
 * Character object.
 */
TerraTactics.scene.Character = function (x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    //rune.display.Sprite.call(this, x, y, 25, 18, "character_2_25x18");
    rune.display.Sprite.call(this, x, y, 24, 48, "ninja-24x48");

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    this.m_grounded = false;
    this.m_velocityY = 0;
    this.m_gravity = 0.2;
    this.m_jumpStrength = 3.5;
    this.m_collided = false;
    this.m_movingLeft = false;
    this.m_movingRight = false;
    this.m_isJumping = false;
    this.m_isTouchingLava = false;

    this.m_maxHealth = 100;
    this.m_health = this.m_maxHealth;

    this.m_healthBar = new rune.ui.Progressbar(20, 3, "#000000", "#ff004d");
    this.m_healthBar.progress = this.m_health / this.m_maxHealth;

    this.hitbox.set(8, 0, 8, 12);
    this.hitbox.debug = true;
    this.hitbox.debugColor = "green";


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

TerraTactics.scene.Character.prototype.m_getHealth = function () {
    return this.m_health;
}

TerraTactics.scene.Character.prototype.m_canFire = function (weapon) {
    if (this.m_weaponState.cooldowns[weapon] === 0) {
        return true;
    } else {
        return false;
    }
}

TerraTactics.scene.Character.prototype.m_setWeapon = function (weapon) {
    this.m_weaponState.currentWeapon = weapon;
}

TerraTactics.scene.Character.prototype.m_getWeapon = function () {
    return this.m_weaponState.currentWeapon;
}

TerraTactics.scene.Character.prototype.m_setCooldown = function (weapon) {
    switch (weapon) {
        case "pistol":
            this.m_weaponState.cooldowns[weapon] = 0;
            break;
        case "rifle":
            this.m_weaponState.cooldowns[weapon] = 1;
            break;
        case "grenade":
            this.m_weaponState.cooldowns[weapon] = 2;
            break;
        case "melee":
            this.m_weaponState.cooldowns[weapon] = 3;
            break;
        default:
            throw new Error("Invalid weapon");
    }
}

TerraTactics.scene.Character.prototype.m_fireProjectile = function (targetX, targetY) {
    var weapon = this.m_guns[this.m_weaponState.currentWeapon];

    if (!weapon || !weapon.m_fireProjectile) {
        throw new Error("Invalid weapon");
    }

    return weapon.m_fireProjectile(this, targetX, targetY);
};

TerraTactics.scene.Character.prototype.m_getCollided = function () {
    return this.m_collided;
};

TerraTactics.scene.Character.prototype.m_setCollided = function (value) {
    this.m_collided = value;
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once per "tick". The method is used for
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Character.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    if (!this.m_grounded) {
        this.m_velocityY += this.m_gravity;
        // jump & falling animations
        this.animation.gotoAndPlay("jump", 0);
    } else if (this.m_movingLeft || this.m_movingRight) {
        this.m_velocityY = 0;
        if (!this.animation.current || this.animation.current.name !== "walk") {
            this.animation.gotoAndPlay("walk", 0);
        }
    } else {
        this.m_velocityY = 0;
        if (!this.animation.current || this.animation.current.name !== "idle") {
            this.animation.gotoAndPlay("idle", 0);
        }
    }

    this.y += this.m_velocityY;

    this.m_healthBar.x = this.x + 2;
    this.m_healthBar.y = this.y - 5;
    this.m_healthBar.progress = this.m_health / this.m_maxHealth;
};

TerraTactics.scene.Character.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
