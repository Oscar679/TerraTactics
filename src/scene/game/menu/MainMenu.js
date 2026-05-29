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
 * Main menu scene.
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

    this.m_player1Controls = new TerraTactics.util.Controls(0);
    this.m_player2Controls = new TerraTactics.util.Controls(1);

    this.m_playGame = new rune.display.Sprite(160, 50, 96, 96, "PlayGame");
    this.m_instructions = new rune.display.Sprite(160, 100, 96, 96, "gameRules");
    this.m_exitGame = new rune.display.Sprite(160, 150, 96, 96, "ExitGame");

    this.m_playGame.animation.create("idle", [0], 1, true);
    this.m_instructions.animation.create("idle", [0], 1, true);
    this.m_exitGame.animation.create("idle", [0], 1, true);

    this.m_playGame.animation.create("selected", [1, 2], 6, true);
    this.m_instructions.animation.create("selected", [1, 2], 6, true);
    this.m_exitGame.animation.create("selected", [1, 2], 6, true);

    this.stage.addChild(this.m_playGame);
    this.stage.addChild(this.m_instructions);
    this.stage.addChild(this.m_exitGame);

    this.m_yAxisLocked = false;

    this.m_selectedIndex = 0;
    this.m_menuItems = [this.m_playGame, this.m_instructions, this.m_exitGame];
    this.m_updateSelection();
};

TerraTactics.scene.MainMenu.prototype.m_updateSelection = function () {
    this.m_menuItems.forEach(function (item) {
        if (item === this.m_menuItems[this.m_selectedIndex]) {
            item.animation.gotoAndPlay("selected");
        } else {
            item.animation.gotoAndPlay("idle");
        }
    }, this);
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
    var aimYValue = 0;

    if (this.m_player1Controls.aimY < -0.5 || this.m_player1Controls.aimY > 0.5) {
        aimYValue = this.m_player1Controls.aimY;
    } else if (this.m_player2Controls.aimY < -0.5 || this.m_player2Controls.aimY > 0.5) {
        aimYValue = this.m_player2Controls.aimY;
    }

    if (aimYValue === 0) {
        this.m_yAxisLocked = false;
    }

    if (this.m_player1Controls.justUp || this.m_player2Controls.justUp || !this.m_yAxisLocked && aimYValue < -0.5) {
        this.m_selectedIndex -= 1;
        this.m_yAxisLocked = true;
        if (this.m_selectedIndex < 0) {
            this.m_selectedIndex = this.m_menuItems.length - 1;
        }
        this.m_updateSelection();
    }

    if (this.m_player1Controls.justDown || this.m_player2Controls.justDown || !this.m_yAxisLocked && aimYValue > 0.5) {
        this.m_selectedIndex += 1;
        this.m_yAxisLocked = true;
        if (this.m_selectedIndex >= this.m_menuItems.length) {
            this.m_selectedIndex = 0;
        }
        this.m_updateSelection();
    }
    if (this.m_player1Controls.confirmHeld || this.m_player2Controls.confirmHeld) {
        if (this.m_selectedIndex === 0) {
            this.application.scenes.load([new TerraTactics.scene.ControllerMenu()]);
        }

        if (this.m_selectedIndex === 1) {
            this.application.scenes.load([new TerraTactics.scene.InstructionMenu()]);
        }

        if (this.m_selectedIndex === 2) {
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
    rune.scene.Scene.prototype.dispose.call(this);
};
