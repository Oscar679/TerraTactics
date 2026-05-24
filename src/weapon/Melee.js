


/**
 * @description Sets up the melee weapon stats and sounds.
 * @constructor
 * @extends TerraTactics.scene.Weapon
 * @class
 */
TerraTactics.scene.Melee = function () {


    TerraTactics.scene.Weapon.call(this);

    this.m_speed = 0.05;

    this.m_damage = 10;
    this.m_knockback = 20;
    this.m_cooldown = 0;
    this.m_fireSoundId = "fist_punch";
    this.m_switchSoundId = "switch_melee";

};


TerraTactics.scene.Melee.prototype = Object.create(TerraTactics.scene.Weapon.prototype);
TerraTactics.scene.Melee.prototype.constructor = TerraTactics.scene.Melee;


TerraTactics.scene.Melee.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};


TerraTactics.scene.Melee.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
};


TerraTactics.scene.Melee.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
