


/**
 * @description Health UI connected to one character.
 * @constructor
 * @class
 * @param {number} x - x-coordinate of health bar.
 * @param {number} y - y-coordinate of health bar.
 * @param {TerraTactics.scene.Character} character - character tracked by the health bar.
 */
TerraTactics.scene.HealthBar = function (x, y, character) {
    rune.display.Sprite.call(this, x, y, 240, 480, "hp-bar-" + character.role);

    this.m_character = character;
    this.m_maxHealth = 100;
    this.m_health = this.m_character.health;
    this.m_healthBar = new rune.ui.Progressbar(20, 3, "#000000", "#ff004d");
    this.m_healthBar.progress = this.m_health / this.m_maxHealth;

    this.m_healthBar.x = this.x + 60;
    this.m_healthBar.y = this.y + 12;
};


TerraTactics.scene.HealthBar.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.HealthBar.prototype.constructor = TerraTactics.scene.HealthBar;


TerraTactics.scene.HealthBar.prototype.m_active = function (active) {
    if (active) {
        this.animation.gotoAndPlay("active", 0);
    } else {
        this.animation.gotoAndStop("inactive", 0);
    }
};


TerraTactics.scene.HealthBar.prototype.update = function () {
    rune.display.Sprite.prototype.update.call(this);

    this.m_health = this.m_character.health;
    this.m_healthBar.progress = this.m_health / this.m_maxHealth;
};
