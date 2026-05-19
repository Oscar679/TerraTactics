
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @class
 * @classdesc
 * 
 * UI class for switching attacks.
 */
TerraTactics.scene.Attacks = function (x, y, weapon, onClick) {
    rune.display.Sprite.call(this, x, y, 96, 136, weapon);

    this.scaleX = 0.85;
    this.scaleY = 0.85;

    this.m_weapon = weapon;
    this.m_onClick = onClick;

    this.m_cd = 0;

    this.m_cdText = new rune.text.BitmapField(this.m_cd.toString());

    this.addChild(this.m_cdText);

    this.animation.create("idle", [0], 1, true);
    this.animation.create("selected", [1, 2], 6, true);
    this.animation.create("onCooldown", [3], 6, true);

    this.animation.gotoAndStop("idle", 0);
};

//inheritance

TerraTactics.scene.Attacks.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.Attacks.prototype.constructor = TerraTactics.scene.Attacks;

TerraTactics.scene.Attacks.prototype.m_click = function () {
    if (typeof this.m_onClick === "function") {
        this.m_onClick(this.m_weapon, this);
    }
};

TerraTactics.scene.Attacks.prototype.m_selected = function (selected) {
    if (selected) {
        this.animation.gotoAndPlay("selected", 0);
    } else {
        this.animation.gotoAndStop("idle", 0);
    }
};

Object.defineProperty(TerraTactics.scene.Attacks.prototype, "setCooldown", {
    set: function (cooldown) {
        this.m_cd = cooldown;
        this.m_cdText.text = this.m_cd.toString();
    }
});

TerraTactics.scene.Attacks.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);

    if (this.m_cd > 0) {
        this.animation.gotoAndPlay("onCooldown", 0);
    } else {
        this.animation.gotoAndPlay("idle", 0);
    }
};