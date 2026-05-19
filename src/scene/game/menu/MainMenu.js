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
 * Options scene.
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

    this.PlayGame = new rune.display.Sprite(150, 100, 96, 96, "Selectedplaygame");
    this.stage.addChild(this.PlayGame);

     this.Credits = new rune.display.Sprite(190, 100, 96, 96, "SelectedCredits");
    this.stage.addChild(this.Credits);

     this.Option = new rune.display.Sprite(230, 100, 96, 96, "OptionSelected");
    this.stage.addChild(this.Option);

     this.ExitGame = new rune.display.Sprite(260, 100, 96, 96, "ExitGame");
    this.stage.addChild(this.ExitGame);

    // group of menu items (controller/keyboard navigation)
    this.m_menuItems = [this.PlayGame, this.Credits, this.Option, this.ExitGame];

    // controls (keyboard / gamepad)
    this.m_controls = new TerraTactics.util.Controls(0);

    // selection index for keyboard/gamepad navigation
    this.m_selectedIndex = 0;
    this.m_updateSelection = function () {
        for (var i = 0; i < this.m_menuItems.length; i++) {
            var it = this.m_menuItems[i];
            if (!it) continue;
            if (i === this.m_selectedIndex) {
                if (typeof it.m_selected === 'function') {
                    it.m_selected(true);
                } else {
                    it.scaleX = 1.05;
                    it.scaleY = 1.05;
                    it.alpha = 1.0;
                }
            } else {
                if (typeof it.m_selected === 'function') {
                    it.m_selected(false);
                } else {
                    it.scaleX = 1.0;
                    it.scaleY = 1.0;
                    it.alpha = 0.7;
                }
            }
        }
    }.bind(this);

    this.m_updateSelection();
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

    if (!this.m_controls) {
        this.m_controls = new TerraTactics.util.Controls(0);
    }

    if (this.m_controls.justUp) {
        this.m_selectedIndex -= 1;
        if (this.m_selectedIndex < 0) {
            this.m_selectedIndex = this.m_menuItems.length - 1;
        }
        this.m_updateSelection();
    }

    if (this.m_controls.justDown) {
        this.m_selectedIndex += 1;
        if (this.m_selectedIndex >= this.m_menuItems.length) {
            this.m_selectedIndex = 0;
        }
        this.m_updateSelection();
    }

    if (this.m_controls.confirm) {
        var sel = this.m_menuItems[this.m_selectedIndex];
        if (sel === this.PlayGame) {
            this.application.scenes.load([new TerraTactics.scene.Game()]);
        } else if (sel === this.Credits) {
            this.application.scenes.load([new TerraTactics.scene.Credits()]);
        } else if (sel === this.Option) {
            this.application.scenes.load([new TerraTactics.scene.Options()]);
        } else if (sel === this.ExitGame) {
            try {
                window.close();
            } catch (err) {
                console.log('Exit requested');
            }
        }
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
    this.m_menuItems = null;
    this.m_updateSelection = null;
    this.m_controls = null;

    rune.scene.Scene.prototype.dispose.call(this);
};