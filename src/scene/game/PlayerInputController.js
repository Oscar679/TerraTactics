//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Applies movement input to the active character.
 * @constructor
 * @class
 * @param {TerraTactics.scene.Game} gameScene - game scene this helper works with.
 */
TerraTactics.scene.PlayerInputController = function (gameScene) {
    this.m_gameScene = gameScene;
};

/**
 * @description Moves, flips, and jumps the active character from input.
 * @returns {undefined}
 */
TerraTactics.scene.PlayerInputController.prototype.update = function () {
    if (this.m_gameScene.m_projectiles.m_hasProjectile()) {
        return;
    }

    if (this.m_gameScene.m_activePlayer != null &&
        this.m_gameScene.m_activePlayer.character != null) {
        this.m_gameScene.m_activePlayer.character.m_movingLeft = false;
        this.m_gameScene.m_activePlayer.character.m_movingRight = false;
    }

    if (this.m_gameScene.m_controls.left &&
        this.m_gameScene.m_activePlayer != null &&
        this.m_gameScene.m_activePlayer.character != null) {
        this.m_gameScene.m_activePlayer.character.x -= this.m_gameScene.m_activePlayer.character.m_speed;
        this.m_gameScene.m_activePlayer.character.m_movingLeft = true;
        this.m_gameScene.m_activePlayer.character.flippedX = true;
    }

    if (this.m_gameScene.m_controls.right &&
        this.m_gameScene.m_activePlayer != null &&
        this.m_gameScene.m_activePlayer.character != null) {
        this.m_gameScene.m_activePlayer.character.x += this.m_gameScene.m_activePlayer.character.m_speed;
        this.m_gameScene.m_activePlayer.character.m_movingRight = true;
        this.m_gameScene.m_activePlayer.character.flippedX = false;
    }

    if (this.m_gameScene.m_controls.jump &&
        this.m_gameScene.m_counter < 2 &&
        this.m_gameScene.m_activePlayer != null &&
        this.m_gameScene.m_activePlayer.character != null) {
        this.m_gameScene.m_activePlayer.character.m_velocityY = -this.m_gameScene.m_activePlayer.character.m_jumpStrength;
        this.m_gameScene.m_activePlayer.character.m_grounded = false;
        this.m_gameScene.m_counter++;
        this.m_gameScene.m_activePlayer.character.m_isJumping = true;
        this.m_gameScene.m_characters.m_playJumpSound();
    }
};
