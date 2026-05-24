


/**
 * @description Sets up the grenade weapon stats and sounds.
 * @constructor
 * @extends TerraTactics.scene.Weapon
 * @class
 */
TerraTactics.scene.Grenade = function () {


    TerraTactics.scene.Weapon.call(this);

    this.m_speed = 0.1;
    this.m_damage = 50;
    this.m_knockback = 5;
    this.m_cooldown = 2;
    this.m_fireSoundId = "grenade_throw";
    this.m_switchSoundId = "switch_grenade";
};


TerraTactics.scene.Grenade.prototype = Object.create(TerraTactics.scene.Weapon.prototype);
TerraTactics.scene.Grenade.prototype.constructor = TerraTactics.scene.Grenade;


TerraTactics.scene.Grenade.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};


TerraTactics.scene.Grenade.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
};


TerraTactics.scene.Grenade.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
