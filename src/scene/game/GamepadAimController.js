//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *
 * @class
 * @classdesc
 *
 * Handles gamepad aim smoothing and aim target updates.
 */
TerraTactics.scene.GamepadAimController = function (gameScene) {
    this.m_gameScene = gameScene;
    this.m_gamepadAimX = 0;
    this.m_gamepadAimY = 0;
};

TerraTactics.scene.GamepadAimController.prototype.update = function () {
    var aimLength = 180;
    var aimX = this.m_gameScene.m_controls.aimX;
    var aimY = this.m_gameScene.m_controls.aimY;

    var pads = navigator.getGamepads();
    var pad = pads && pads[0];

    if (pad) {
        console.log(pad.axes[0], pad.axes[1]);
    }

    var length = Math.sqrt(aimX * aimX + aimY * aimY);

    if (length < TerraTactics.util.MappingGamepad.AIM_DEADZONE) {
        this.m_gamepadAimX = 0;
        this.m_gamepadAimY = 0;

        if (this.m_gameScene.m_aimInput === "gamepad") {
            this.m_gameScene.m_cancelAim();
        }

        return;
    }

    if (length > 1) {
        aimX /= length;
        aimY /= length;
    }

    var smoothing = 0.5;

    this.m_gamepadAimX += (aimX - this.m_gamepadAimX) * smoothing;
    this.m_gamepadAimY += (aimY - this.m_gamepadAimY) * smoothing;

    aimX = this.m_gamepadAimX;
    aimY = this.m_gamepadAimY;

    if (this.m_gameScene.m_aimInput === "mouse") {
        return;
    }

    if (!this.m_gameScene.m_canAim()) {
        if (this.m_gameScene.m_aimInput === "gamepad") {
            this.m_gameScene.m_cancelAim();
        }

        return;
    }

    if (this.m_gameScene.m_activePlayer != null &&
        this.m_gameScene.m_activePlayer.character != null) {
        this.m_gameScene.m_beginAim(
            "gamepad",
            this.m_gameScene.m_activePlayer.character.centerX + aimX * aimLength,
            this.m_gameScene.m_activePlayer.character.centerY + aimY * aimLength
        );
    } else if (this.m_gameScene.m_aimInput === "gamepad") {
        this.m_gameScene.m_cancelAim();
    }
};
