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
 * Game over scene with restart and exit choices.
 */
TerraTactics.scene.GameOverMenu = function (winnerText) {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */

    rune.scene.Scene.call(this);

    this.m_winner = winnerText;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.GameOverMenu.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.GameOverMenu.prototype.constructor = TerraTactics.scene.GameOverMenu;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.GameOverMenu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "background");
    this.stage.addChild(this.bg);

    this.m_player1Controls = new TerraTactics.util.Controls(0);
    this.m_player2Controls = new TerraTactics.util.Controls(1);

    this.playGame = new rune.display.Sprite(160, 80, 96, 96, "Selectedplaygame");
    this.exitGame = new rune.display.Sprite(160, 130, 96, 96, "ExitGame");

    this.playGame.animation.create("idle", [0], 1, true);
    this.exitGame.animation.create("idle", [0], 1, true);

    this.playGame.animation.create("selected", [1, 2], 6, true);
    this.exitGame.animation.create("selected", [1, 2], 6, true);

    this.stage.addChild(this.playGame);
    this.stage.addChild(this.exitGame);

    this.m_selectedIndex = 0;
    this.m_menuItems = [this.playGame, this.exitGame];

    this.m_winnerText = new rune.text.BitmapField(this.m_winner, "Font8ptwhite");

    this.m_winnerText.centerX = 200;
    this.m_winnerText.centerY = 45;
    this.m_winnerText.scaleX = 2;
    this.m_winnerText.scaleY = 2;

    this.stage.addChild(this.m_winnerText);

    this.m_updateSelection();
};

TerraTactics.scene.GameOverMenu.prototype.m_updateSelection = function () {
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
TerraTactics.scene.GameOverMenu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    if (this.m_player1Controls.justUp || this.m_player2Controls.justUp) {
        this.m_selectedIndex -= 1;
        if (this.m_selectedIndex < 0) {
            this.m_selectedIndex = this.m_menuItems.length - 1;
        }
        this.m_updateSelection();
    }

    if (this.m_player1Controls.justDown || this.m_player2Controls.justDown) {
        this.m_selectedIndex += 1;
        if (this.m_selectedIndex >= this.m_menuItems.length) {
            this.m_selectedIndex = 0;
        }
        this.m_updateSelection();
    }
    if (this.m_player1Controls.confirm || this.m_player2Controls.confirm) {
        if (this.m_selectedIndex === 0) {
            this.application.scenes.load([new TerraTactics.scene.RoleMenu()]);
        }

        if (this.m_selectedIndex === 1) {
            try {
                window.close();
            } catch (err) {
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
TerraTactics.scene.GameOverMenu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
