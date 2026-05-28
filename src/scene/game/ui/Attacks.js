
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
 * Attack icon for selecting a weapon and showing its cooldown.
 */
TerraTactics.scene.Attacks = function (x, y, weapon, onClick) {
    rune.display.Sprite.call(this, x, y, 48, 48, weapon);


    this.m_weapon = weapon;
    this.m_onClick = onClick;

    this.m_cd = 0;

    this.m_cdText = new rune.text.BitmapField(this.m_cd.toString(), "Font8ptwhite");

    this.m_cdText.width = this.m_cdText.textWidth;
    this.m_cdText.height = this.m_cdText.textHeight;
    this.m_cdText.centerX = this.width / 2;
    this.m_cdText.y = this.height - this.m_cdText.height - 7;

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
    if (typeof this.m_onClick === "function" && this.m_cd === 0) {
        this.m_onClick(this.m_weapon, this);
    } else {
        return;
    }
};

TerraTactics.scene.Attacks.prototype.m_selected = function (selected) {
    if (selected && this.m_cd === 0) {
        this.animation.gotoAndPlay("selected", 0);
    } else if (this.m_cd > 0) {
        this.animation.gotoAndPlay("onCooldown", 0);
    } else if (this.m_cd === 0) {
        this.animation.gotoAndStop("idle", 0);
    }
};

TerraTactics.scene.Attacks.prototype.m_playAnimation = function () {
    if (this.m_cd > 0) {
        this.animation.gotoAndPlay("onCooldown", 0);
    } else {
        this.animation.gotoAndStop("idle", 0);
    }
};

Object.defineProperty(TerraTactics.scene.Attacks.prototype, "setCooldown", {
    set: function (cooldown) {
        this.m_cd = cooldown || 0;
        this.m_cdText.text = this.m_cd.toString();
        this.m_playAnimation();
    }
});

TerraTactics.scene.Attacks.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
};
