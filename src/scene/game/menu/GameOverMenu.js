//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description End screen showing the winner with restart and exit choices.
 * @constructor
 * @extends rune.scene.Scene
 * @class
 * @param {string} winnerText - text describing the winner.
 */
TerraTactics.scene.GameOverMenu = function (winnerText) {


    // Super call
    //--------------------------------------------------------------------------
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
 * @description Sets up this object after Rune creates it.
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

    this.stage.addChild(this.playGame);
    this.stage.addChild(this.exitGame);

    this.m_selectedIndex = 0;
    this.m_menuItems = [this.playGame, this.exitGame];

    this.m_winnerText = new rune.text.BitmapField(this.m_winner);

    this.m_winnerText.centerX = 200;
    this.m_winnerText.centerY = 45;
    this.m_winnerText.scaleX = 2;
    this.m_winnerText.scaleY = 2;

    this.stage.addChild(this.m_winnerText);

    this.m_updateSelection();
};

/**
 * @description Highlights the currently selected game over menu option.
 * @returns {undefined}
 */
TerraTactics.scene.GameOverMenu.prototype.m_updateSelection = function () {
    this.m_menuItems.forEach(function (item) {
        if (item === this.m_menuItems[this.m_selectedIndex]) {
            item.scaleX = 1.05;
            item.scaleY = 1.05;
            item.alpha = 1.0;

        } else {
            item.scaleX = 1.0;
            item.scaleY = 1.0;
            item.alpha = 0.7;
        }
    }, this);
};

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
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
            this.application.scenes.load([new TerraTactics.scene.ControllerMenu()]);
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
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.GameOverMenu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
