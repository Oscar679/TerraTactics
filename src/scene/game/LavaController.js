//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Creates the rising lava hazard and checks who falls into it.
 * @constructor
 * @class
 * @param {TerraTactics.scene.Game} gameScene - game scene this helper works with.
 */
TerraTactics.scene.LavaController = function (gameScene) {
    this.m_gameScene = gameScene;

    this.m_lava = new rune.display.Sprite(0, 225, 400, 2000, "lava");
    this.m_gameScene.stage.addChild(this.m_lava);

    this.m_lavaTween = this.m_gameScene.tweens.create({
        target: this.m_lava,
        scope: this.m_gameScene,
        duration: 700000,
        easing: rune.tween.Linear.easeIn,
        args: {
            y: -225
        }
    });
};

/**
 * @description Marks any player touching the lava as dead.
 * @param {Object} activePlayer - active player entry.
 * @param {Array} inactivePlayers - inactive player entries.
 * @returns {undefined}
 */
TerraTactics.scene.LavaController.prototype.update = function (activePlayer, inactivePlayers) {
    if (activePlayer != null && activePlayer.character != null) {
        if (activePlayer.character.bottom >= this.m_lava.top) {
            activePlayer.character.m_isTouchingLava = true;
            activePlayer.character.m_health = 0;
        }
    }

    for (var i = 0; i < inactivePlayers.length; i++) {
        if (inactivePlayers[i].character !== null) {
            if (inactivePlayers[i].character.bottom >= this.m_lava.top) {
                inactivePlayers[i].character.m_isTouchingLava = true;
                inactivePlayers[i].character.m_health = 0;
            }
        }
    }
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

Object.defineProperty(TerraTactics.scene.LavaController.prototype, "lava", {
    get: function () {
        return this.m_lava;
    }
});
