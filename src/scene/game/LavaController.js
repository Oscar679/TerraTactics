//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 *
 * Handles lava movement and lava death checks.
 */
TerraTactics.scene.LavaController = function (gameScene) {
    this.m_gameScene = gameScene;

    rune.display.Sprite.call(this, 0, 225, 400, 225, "lava");
    this.m_gameScene.stage.addChild(this);

    this.animation.create("idle", [0, 1, 2], 1.5, true);
    this.animation.play("idle");

    this.m_lavaTween = this.m_gameScene.tweens.create({
        target: this,
        scope: this.m_gameScene,
        duration: 300000,
        easing: rune.tween.Linear.easeIn,
        args: {
            y: -225
        }
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.LavaController.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.LavaController.prototype.constructor = TerraTactics.scene.LavaController;

TerraTactics.scene.LavaController.prototype.m_checkCollisions = function (activePlayer, inactivePlayers) {
    if (activePlayer != null && activePlayer.character != null) {
        if (activePlayer.character.bottom >= this.top) {
            activePlayer.character.m_isTouchingLava = true;
            activePlayer.character.m_health = 0;
        }
    }

    for (var i = 0; i < inactivePlayers.length; i++) {
        if (inactivePlayers[i].character !== null) {
            if (inactivePlayers[i].character.bottom >= this.top) {
                inactivePlayers[i].character.m_isTouchingLava = true;
                inactivePlayers[i].character.m_health = 0;
            }
        }
    }
};

Object.defineProperty(TerraTactics.scene.LavaController.prototype, "lava", {
    get: function () {
        return this;
    }
});
