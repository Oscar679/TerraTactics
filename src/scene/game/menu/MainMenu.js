//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Opening menu with play and exit options.
 * @constructor
 * @extends rune.scene.Scene
 * @class
 */
TerraTactics.scene.MainMenu = function () {


    // Super call
    //--------------------------------------------------------------------------
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
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.MainMenu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "background");
    this.stage.addChild(this.bg);

    this.PlayGame = new rune.display.Sprite(160, 60, 96, 96, "Selectedplaygame");
    this.stage.addChild(this.PlayGame);

    this.ExitGame = new rune.display.Sprite(160, 110, 96, 96, "ExitGame");
    this.stage.addChild(this.ExitGame);


    // group of menu items (controller/keyboard navigation)
    this.m_menuItems = [this.PlayGame, this.ExitGame];

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
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
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
            this.application.scenes.load([new TerraTactics.scene.ControllerMenu()]);
        } else if (sel === this.ExitGame) {
            try {
                window.close();
            } catch (err) {
            }
        }
    }
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.MainMenu.prototype.dispose = function () {
    this.m_menuItems = null;
    this.m_updateSelection = null;
    this.m_controls = null;

    rune.scene.Scene.prototype.dispose.call(this);
};
