
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
 * Displays the game result screen.
 */
TerraTactics.scene.WinnerScreenController = function (x, y, gameScene, winner) {
    rune.display.Sprite.call(this, x, y, 288, 192, winner);
    this.m_gameScene = gameScene;
    this.m_camera = this.m_gameScene.cameras.getCameraAt(0);
    this.m_gameScene = gameScene;
    this.m_camera.addChild(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.WinnerScreenController.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.WinnerScreenController.prototype.constructor = TerraTactics.scene.WinnerScreenController;
