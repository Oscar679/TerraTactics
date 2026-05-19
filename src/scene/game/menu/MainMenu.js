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

    this.PlayGame = new rune.display.Sprite(0, 150, 100, 96, 96, "Selectedplaygame");
    this.stage.addChild(this.PlayGame);

     this.Credits = new rune.display.Sprite(0, 190, 100, 96, 96, "SelectedCredits");
    this.stage.addChild(this.Credits);

     this.Option = new rune.display.Sprite(0, 230, 100, 96, 96, "OptionSelected");
    this.stage.addChild(this.Option);

     this.ExitGame = new rune.display.Sprite(0, 260, 100, 96, 96, "ExitGame");
    this.stage.addChild(this.ExitGame);

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
    rune.scene.Scene.prototype.dispose.call(this);
};