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
TerraTactics.scene.ControllerMenu = function () {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */

    rune.scene.Scene.call(this);

    // controls (keyboard / gamepad)
    this.m_controls = new TerraTactics.util.Controls(0);

    this.m_gamePad1 = new rune.display.Sprite(20, 20, 40, 48, "gamepad");
    this.stage.addChild(this.m_gamePad1);

    this.m_gamePad2 = new rune.display.Sprite(80, 20, 40, 48, "gamepad");
    this.stage.addChild(this.m_gamePad2);


};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.ControllerMenu.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.ControllerMenu.prototype.constructor = TerraTactics.scene.ControllerMenu;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.ControllerMenu.prototype.init = function () {
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
TerraTactics.scene.ControllerMenu.prototype.update = function (step) {
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
TerraTactics.scene.ControllerMenu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};