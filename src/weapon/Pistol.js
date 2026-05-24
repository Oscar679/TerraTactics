


/**
 * @description Sets up the pistol weapon stats and sounds.
 * @constructor
 * @extends TerraTactics.scene.Weapon
 * @class
 */
TerraTactics.scene.Pistol = function () {


    TerraTactics.scene.Weapon.call(this);

    this.m_speed = 0.05;
    this.m_damage = 30;
    this.m_knockback = 1;
    this.m_cooldown = 0;
    this.m_fireSoundId = "pistol_fire";
    this.m_switchSoundId = "switch_pistol";

};


TerraTactics.scene.Pistol.prototype = Object.create(TerraTactics.scene.Weapon.prototype);
TerraTactics.scene.Pistol.prototype.constructor = TerraTactics.scene.Pistol;


TerraTactics.scene.Pistol.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
};


TerraTactics.scene.Pistol.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
};


TerraTactics.scene.Pistol.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
