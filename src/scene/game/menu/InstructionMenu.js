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
 * Instruction menu scene.
 */
TerraTactics.scene.InstructionMenu = function () {


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

TerraTactics.scene.InstructionMenu.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.InstructionMenu.prototype.constructor = TerraTactics.scene.InstructionMenu;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.InstructionMenu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.m_player1Controls = new TerraTactics.util.Controls(0);
    this.m_player2Controls = new TerraTactics.util.Controls(1);

    this.m_background = new rune.display.Sprite(0, 0, 400, 225, "instructions");
    this.stage.addChild(this.m_background);

    this.m_delayFinished = false;

    this.timers.create({
        duration: 3000,
        repeat: 0,
        onComplete: function () {
            this.m_delayFinished = true;
        },
        scope: this
    });
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.InstructionMenu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    if (this.m_delayFinished) {
        if (this.m_player1Controls.anyButton || this.m_player2Controls.anyButton) {
            this.application.scenes.load([new TerraTactics.scene.MainMenu()]);
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
TerraTactics.scene.InstructionMenu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
