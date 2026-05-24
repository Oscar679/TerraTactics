//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description First screen shown before entering the main menu.
 * @constructor
 * @extends rune.scene.Scene
 * @class
 */
TerraTactics.scene.Intro = function () {
    // Super call
    //--------------------------------------------------------------------------
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Intro.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.Intro.prototype.constructor = TerraTactics.scene.Intro;

/**
 * @description Leaves the intro once and loads the main menu.
 * @returns {undefined}
 */
TerraTactics.scene.Intro.prototype.m_continue = function () {
    if (this.m_done !== true) {
        this.m_done = true;
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
TerraTactics.scene.Intro.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.m_done = false;
    this.m_controls = new TerraTactics.util.Controls(0);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "game_bg");
    this.stage.addChild(this.bg);

    var text = new rune.text.BitmapField("WELCOME TO TERRATACTICS!");
    text.autoSize = true;
    text.center = this.application.screen.center;

    var text2 = new rune.text.BitmapField("PRESS X TO CONTINUE");

    text2.autoSize = true;
    text2.scaleX = 1.5;
    text2.scaleY = 1.5;
    text2.center = this.application.screen.center;
    text2.y += 50;

    var m_this = this;

    this.m_onKeyDown = function (e) {
        m_this.m_continue();
    }

    window.addEventListener("keydown", this.m_onKeyDown);

    this.stage.addChild(text);
    this.stage.addChild(text2);
};

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Intro.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    if (this.m_controls.confirm ||
        this.m_controls.firePressed ||
        this.m_controls.justUp ||
        this.m_controls.justDown ||
        this.m_controls.justLeft ||
        this.m_controls.justRight ||
        this.m_controls.toggleWeapons) {
        this.m_continue();
    }
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Intro.prototype.dispose = function () {
    window.removeEventListener("keydown", this.m_onKeyDown);
    this.m_onKeyDown = null;

    rune.scene.Scene.prototype.dispose.call(this);
};
