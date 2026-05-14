
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
    rune.display.Sprite.call(this, x, y, 48, 48, weapon);


    this.m_weapon = weapon;
    this.m_onClick = onClick;

    this.m_cd = TerraTactics.data.Weapons[this.m_weapon].m_cooldown;
    console.log(this.m_cd);

    this.m_cdText = new rune.text.BitmapField(this.m_cd.toString());

    console.log(this.m_cdText);
    this.addChild(this.m_cdText);

    this.animation.create("idle", [0], 1, true);
    this.animation.create("selected", [1, 2, 3, 4, 5, 6], 6, true);

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
      //  this.animation.gotoAndPlay("selected", 0);
        console.log('selected: ' + this.m_weapon);
    } else {
        this.animation.gotoAndStop("idle", 0);
    }
};
