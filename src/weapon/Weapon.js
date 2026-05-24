


/**
 * @description Common weapon behavior shared by every weapon type.
 *
 * @constructor
 * @extends rune.display.Sprite
 * @class
 */
TerraTactics.scene.Weapon = function () {


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


TerraTactics.scene.Weapon.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.Weapon.prototype.constructor = TerraTactics.scene.Weapon;


TerraTactics.scene.Weapon.prototype.init = function () {
    throw new Error("Child classes must implement this method.");
};


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
                damage *= 0.6;
                break;
            case "rifle":
                damage *= 0.8;
                break;
            case "melee":
                damage *= 1.2;
                knockback *= 1.2;
                break;
            default:
                break;
        }
    }

    if (role === "bomber") {
        switch (weapon) {
            case "pistol":
                damage *= 0.8;
                break;
            case "grenade":
                damage *= 1.3;
                knockback *= 1.3;
                break;
            case "rifle":
                damage *= 0.8;
                break;
            case "melee":
                damage *= 0.8;
                knockback *= 0.8;
                break;
            default:
                break;
        }
    }

    if (role === "sniper") {
        switch (weapon) {
            case "pistol":
                damage *= 1.2;
                break;
            case "grenade":
                damage *= 0.8;
                break;
            case "rifle":
                damage *= 1.3;
                break;
            case "melee":
                damage *= 0.8;
                knockback *= 0.8;
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


TerraTactics.scene.Weapon.prototype.m_fireProjectile = function (player, targetX, targetY) {
    var projectile = this.m_getProjectileData(player, targetX, targetY);
    this.m_playFireSound();
    var stats = this.m_getRoleSpecificStats(player);
    return new TerraTactics.scene.Bullet(projectile.x, projectile.y, projectile.vx, projectile.vy, stats.damage, stats.knockback);
};


TerraTactics.scene.Weapon.prototype.m_playSound = function (soundId) {
    var sound = null;

    if (soundId === null || soundId === undefined) {
        return;
    }

    sound = rune.system.Application.instance.sounds.sound.get(soundId, true);
    sound.play(true);
};


TerraTactics.scene.Weapon.prototype.m_playFireSound = function () {
    this.m_playSound(this.m_fireSoundId);
};


TerraTactics.scene.Weapon.prototype.m_playSwitchSound = function () {
    this.m_playSound(this.m_switchSoundId);
};


TerraTactics.scene.Weapon.prototype.update = function (step) {
    throw new Error("Child classes must implement this method.");
};


TerraTactics.scene.Weapon.prototype.dispose = function () {
    throw new Error("Child classes must implement this method.");
};


Object.defineProperty(TerraTactics.scene.Weapon.prototype, "cooldown", {
    get: function () {
        return this.m_cooldown;
    }
});
