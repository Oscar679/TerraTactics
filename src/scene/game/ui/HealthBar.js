
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
 * Health UI connected to one character.
 */
TerraTactics.scene.HealthBar = function (x, y, character) {
    rune.display.Sprite.call(this, x, y, 240, 480, "hp-bar-" + character.role);

    this.m_character = character;
    this.m_maxHealth = 100;
    this.m_health = this.m_character.health;
    this.m_healthBar = new rune.ui.Progressbar(40, 3, "#70112e", "#ff004d");
    this.m_healthBar.progress = this.m_health / this.m_maxHealth;

    this.m_healthBar.x = this.x + 70;
    this.m_healthBar.y = this.y + 18;
};

//inheritance
TerraTactics.scene.HealthBar.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.HealthBar.prototype.constructor = TerraTactics.scene.HealthBar;

TerraTactics.scene.HealthBar.prototype.update = function () {
    rune.display.Sprite.prototype.update.call(this);

    this.m_health = this.m_character.health;
    this.m_healthBar.progress = this.m_health / this.m_maxHealth;
};
