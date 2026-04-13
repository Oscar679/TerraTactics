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

    console.log("MainMenu init");

    var background = new rune.display.Sprite(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height,
        "main-background"
    );


    this.stage.addChild(background);

    var text = new rune.text.BitmapField("WELCOME TO TERRATACTICS!");
    text.autoSize = true;
    text.center = this.application.screen.center;

    var text2 = new rune.text.BitmapField("PRESS ANY KEY TO CONTINUE");

    text2.autoSize = true;
    text2.scaleX = 1.5;
    text2.scaleY = 1.5;
    text2.center = this.application.screen.center;
    text2.y += 50;

    var m_this = this;

    this.m_onKeyDown = function (e) {
        console.log(e.key);
        m_this.application.scenes.load([new TerraTactics.scene.Game()]);
    }

    window.addEventListener("keydown", this.m_onKeyDown);

    this.stage.addChild(text);
    this.stage.addChild(text2);
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