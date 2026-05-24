


/**
 * @description Sets up the rifle weapon stats and sounds.
 * @constructor
 * @extends TerraTactics.scene.Weapon
 * @class
 */
TerraTactics.scene.Rifle = function () {


    TerraTactics.scene.Weapon.call(this);

    this.m_speed = 0.1;
    this.m_damage = 50;
    this.m_knockback = 3;
    this.m_cooldown = 1;
    this.m_fireSoundId = "rifle_fire";
    this.m_switchSoundId = "switch_rifle";
};


TerraTactics.scene.Rifle.prototype = Object.create(TerraTactics.scene.Weapon.prototype);
TerraTactics.scene.Rifle.prototype.constructor = TerraTactics.scene.Rifle;


TerraTactics.scene.Rifle.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};


TerraTactics.scene.Rifle.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
};


TerraTactics.scene.Rifle.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
