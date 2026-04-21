//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * MainMenu scene.
 */
TerraTactics.scene.MainMenu = function () {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.MainMenu.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.MainMenu.prototype.constructor = TerraTactics.scene.MainMenu;
TerraTactics.scene.MainMenu.prototype.m_onMenuSelect = function (e) {
    console.log(e.text);

    var m_this = this;

    var obj = {
        "Start Game": new TerraTactics.scene.Game(),
        "Options": new TerraTactics.scene.Options(),
        "Credits": new TerraTactics.scene.Credits(),
        //"Exit": 
    };

    m_this.application.scenes.load([obj[e.text]]);
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.MainMenu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);


    this.bg = new rune.display.Graphic(0, 0, 400, 225, "game_bg");
    this.stage.addChild(this.bg);

    this.m_menu = new rune.ui.VTMenu();

    this.m_menu.add("Start Game");
    this.m_menu.add("Options");
    this.m_menu.add("Credits");
    this.m_menu.add("Exit");

    this.m_menu.centerX = this.application.screen.centerX;
    this.m_menu.y = 90;

    this.m_menu.onSelect(this.m_onMenuSelect, this);

    this.stage.addChild(this.m_menu);
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.MainMenu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    if (this.keyboard.justPressed("UP")) {
        this.m_menu.up();
    }

    if (this.keyboard.justPressed("DOWN")) {
        this.m_menu.down();
    }

    if (this.keyboard.justPressed("ENTER")) {
        this.m_menu.select();
    }
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
TerraTactics.scene.MainMenu.prototype.dispose = function () {
    window.removeEventListener("keydown", this.m_onKeyDown);
    this.m_onKeyDown = null;

    rune.scene.Scene.prototype.dispose.call(this);
};