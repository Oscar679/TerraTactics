


/**
 * @description Menu scene for game options and returning to the main menu.
 * @constructor
 * @extends rune.scene.Scene
 * @class
 */
TerraTactics.scene.Options = function () {


    rune.scene.Scene.call(this);
};


TerraTactics.scene.Options.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.Options.prototype.constructor = TerraTactics.scene.Options;


TerraTactics.scene.Options.prototype.m_onMenuSelect = function (e) {

    this.application.scenes.load([new TerraTactics.scene.MainMenu()]);
};


TerraTactics.scene.Options.prototype.decrease = function (x) {
    var items = this.m_menu.m_list.getChildren();
    var item = items[x];
};


TerraTactics.scene.Options.prototype.increase = function (x) {
    var items = this.m_menu.m_list.getChildren();
    var item = items[x];
};


TerraTactics.scene.Options.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.counter = 0;

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


TerraTactics.scene.Options.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    if (this.m_controls.justUp && this.counter > 0) {
        this.counter--;
        this.m_menu.up();
    }

    if (this.m_controls.justDown && this.counter < 3) {
        this.counter++;
        this.m_menu.down();
    }

    if (this.m_controls.left && this.counter !== 3) {
        this.decrease(this.counter);
    }

    if (this.m_controls.right && this.counter !== 3) {
        this.increase(this.counter);
    }

    if (this.m_controls.confirm && this.counter === 3) {
        this.m_menu.select();
    }
};


TerraTactics.scene.Options.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
