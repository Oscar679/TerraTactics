//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Shows the credits/options-style menu and lets players go back.
 * @constructor
 * @extends rune.scene.Scene
 * @class
 */
TerraTactics.scene.Credits = function () {


    // Super call
    //--------------------------------------------------------------------------
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Credits.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.Credits.prototype.constructor = TerraTactics.scene.Credits;

/**
 * @description Reacts to choices made in the credits menu.
 * @param {Object} e - menu select event.
 * @returns {undefined}
 */
TerraTactics.scene.Credits.prototype.m_onMenuSelect = function (e) {
    if (e.text === "Back") {
        this.application.scenes.load([new TerraTactics.scene.MainMenu()]);
    }
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
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

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
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

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Credits.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
