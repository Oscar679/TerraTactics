


/**
 * @description Shows the credits/options-style menu and lets players go back.
 * @constructor
 * @extends rune.scene.Scene
 * @class
 */
TerraTactics.scene.Credits = function () {


    rune.scene.Scene.call(this);
};


TerraTactics.scene.Credits.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.Credits.prototype.constructor = TerraTactics.scene.Credits;


TerraTactics.scene.Credits.prototype.m_onMenuSelect = function (e) {
    if (e.text === "Back") {
        this.application.scenes.load([new TerraTactics.scene.MainMenu()]);
    }
};


TerraTactics.scene.Credits.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);


    var background = new rune.display.Sprite(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height,
        "background"
    );


    this.stage.addChild(background);

    this.m_menu = new rune.ui.VTMenu();

    this.m_menu.add("Master Volume");
    this.m_menu.add("Music Volume");
    this.m_menu.add("SFX Volume");
    this.m_menu.add("Back");

    this.m_menu.centerX = this.application.screen.centerX;
    this.m_menu.y = 90;

    this.m_menu.onSelect(this.m_onMenuSelect, this);

    this.stage.addChild(this.m_menu);
    this.m_controls = new TerraTactics.util.Controls(0);
};


TerraTactics.scene.Credits.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    if (this.m_controls.justUp) {
        this.m_menu.up();
    }

    if (this.m_controls.justDown) {
        this.m_menu.down();
    }

    if (this.m_controls.confirm) {
        this.m_menu.select();
    }
};


TerraTactics.scene.Credits.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
