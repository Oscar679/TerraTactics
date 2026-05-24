

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Common weapon behavior shared by every weapon type.
 *
 * @constructor
 * @extends rune.display.Sprite
 * @class
 */
TerraTactics.scene.Weapon = function () {


    // Super call
    //--------------------------------------------------------------------------
    rune.display.Sprite.call(this);


    this.m_damage = null;
    this.m_speed = null;
    this.m_knockback = null;
    this.m_cooldown = null;
    this.m_fireSoundId = null;
    this.m_switchSoundId = null;

    if (this.constructor === TerraTactics.scene.Weapon) {
        throw new Error("Abstract classes cannot be instantiated.");
    }
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Weapon.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.Weapon.prototype.constructor = TerraTactics.scene.Weapon;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Weapon.prototype.init = function () {
    throw new Error("Child classes must implement this method.");
};

/**
 * @description Builds the starting position and velocity for a shot.
 * @param {TerraTactics.scene.Character} player - character firing the projectile.
 * @param {number} targetX - x-coordinate of target position.
 * @param {number} targetY - y-coordinate of target position.
 * @returns {Object} - projectile position and velocity data.
 */
TerraTactics.scene.Weapon.prototype.m_getProjectileData = function (player, targetX, targetY) {
    var dx = targetX - player.centerX;
    var dy = targetY - player.centerY;

    return {
        x: player.centerX,
        y: player.y + 2,
        vx: dx * this.m_speed,
        vy: dy * this.m_speed
    };
};

/**
 * @description Adjusts weapon damage and knockback for the player role.
 * @param {TerraTactics.scene.Character} player - character using the weapon.
 * @returns {Object} - role specific weapon stats.
 */
TerraTactics.scene.Weapon.prototype.m_getRoleSpecificStats = function (player) {
    var damage = this.m_damage;
    var knockback = this.m_knockback;
    var weapon = player.m_weaponState.currentWeapon;
    var role = player.role;

    if (role === "ninja") {
        switch (weapon) {
            case "pistol":
                break;
            case "grenade":
                damage *= 0.6; // Magic Number
                break;
            case "rifle":
                damage *= 0.8; // Magic Number
                break;
            case "melee":
                damage *= 1.2; // Magic Number
                knockback *= 1.2; // Magic Number
                break;
            default:
                break;
        }
    }

    if (role === "bomber") {
        switch (weapon) {
            case "pistol":
                damage *= 0.8; // Magic Number
                break;
            case "grenade":
                damage *= 1.3; // Magic Number
                knockback *= 1.3; // Magic Number
                break;
            case "rifle":
                damage *= 0.8; // Magic Number
                break;
            case "melee":
                damage *= 0.8; // Magic Number
                knockback *= 0.8; // Magic Number
                break;
            default:
                break;
        }
    }

    if (role === "sniper") {
        switch (weapon) {
            case "pistol":
                damage *= 1.2; // Magic Number
                break;
            case "grenade":
                damage *= 0.8; // Magic Number
                break;
            case "rifle":
                damage *= 1.3; // Magic Number
                break;
            case "melee":
                damage *= 0.8; // Magic Number
                knockback *= 0.8; // Magic Number
                break;
            default:
                break;
        }
    }

    return {
        damage: damage,
        knockback: knockback
    };
};

/**
 * @description Creates the bullet for a shot and plays the fire sound.
 * @param {TerraTactics.scene.Character} player - character firing the projectile.
 * @param {number} targetX - x-coordinate of target position.
 * @param {number} targetY - y-coordinate of target position.
 * @returns {TerraTactics.scene.Bullet} - bullet created by the weapon.
 */
TerraTactics.scene.Weapon.prototype.m_fireProjectile = function (player, targetX, targetY) {
    var projectile = this.m_getProjectileData(player, targetX, targetY);
    this.m_playFireSound();
    var stats = this.m_getRoleSpecificStats(player);
    return new TerraTactics.scene.Bullet(projectile.x, projectile.y, projectile.vx, projectile.vy, stats.damage, stats.knockback);
};

/**
 * @description Plays the requested weapon sound when one is configured.
 * @param {string} soundId - id of the sound to be played.
 * @returns {undefined}
 */
TerraTactics.scene.Weapon.prototype.m_playSound = function (soundId) {
    var sound = null;

    if (soundId === null || soundId === undefined) {
        return;
    }

    sound = rune.system.Application.instance.sounds.sound.get(soundId, true);
    sound.play(true);
};

/**
 * @description Plays the sound used when this weapon fires.
 * @returns {undefined}
 */
TerraTactics.scene.Weapon.prototype.m_playFireSound = function () {
    this.m_playSound(this.m_fireSoundId);
};

/**
 * @description Plays the sound used when switching to this weapon.
 * @returns {undefined}
 */
TerraTactics.scene.Weapon.prototype.m_playSwitchSound = function () {
    this.m_playSound(this.m_switchSoundId);
};


/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Weapon.prototype.update = function (step) {
    throw new Error("Child classes must implement this method.");
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Weapon.prototype.dispose = function () {
    throw new Error("Child classes must implement this method.");
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

Object.defineProperty(TerraTactics.scene.Weapon.prototype, "cooldown", {
    get: function () {
        return this.m_cooldown;
    }
});
