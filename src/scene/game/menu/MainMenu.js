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

    var obj = {
        "Start Game": new TerraTactics.scene.Game(),
        "Options": new TerraTactics.scene.Options(),
        "Credits": new TerraTactics.scene.Credits(),
        //"Exit": 
    };

    this.application.scenes.load([obj[e.text]]);
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


    this.bg = new rune.display.Graphic(0, 0, 400, 225, "background");
    this.stage.addChild(this.bg);

    this.m_menu = new rune.ui.VTMenu();

    this.m_menu.add("Start Game");
    this.m_menu.add("Options");
    this.m_menu.add("Credits");
    this.m_menu.add("Exit");

    this.m_menu.centerX = this.application.screen.centerX;
    this.m_menu.y = 90;

    this.m_menu.onSelect(this.m_onMenuSelect, this);

    console.log(this.m_menu.m_list);

    this.stage.addChild(this.m_menu);
    this.m_scaleItem();

    this.m_controls = new TerraTactics.util.Controls(0);
};

TerraTactics.scene.MainMenu.prototype.m_scaleItem = function () {
    for (var i = 0; i < this.m_menu.m_list.numChildren; i++) {
        var item = this.m_menu.m_list.getAt(i);

        var selectedItem = i === this.m_menu.m_index;

        this.tweens.removeFrom(item);

        this.tweens.create({
            target: item,
            duration: 100,
            args: {
                scaleX: selectedItem ? 1.2 : 1,
                scaleY: selectedItem ? 1.2 : 1
            }
        });
    }
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

    if (this.m_controls.justUp) {
        this.m_menu.up();
        this.m_scaleItem();
    }

    if (this.m_controls.justDown) {
        this.m_menu.down();
        this.m_scaleItem();
    }

    if (this.m_controls.confirm) {
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
