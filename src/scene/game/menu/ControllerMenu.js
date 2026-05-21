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

    this.m_player1Controls = new TerraTactics.util.Controls(0);
    this.m_player2Controls = new TerraTactics.util.Controls(1);

    this.m_background = new rune.display.Sprite(0, 0, 432, 240, "controllerMenuBackground");
    this.stage.addChild(this.m_background);

    this.m_background.animation.create("idle", [0, 1, 2, 3], 3, true);

    this.m_gamepad1 = new rune.display.Sprite(160, 90, 40, 48, "gamepad");
    this.stage.addChild(this.m_gamepad1);
    this.m_gamepad1.isPlayingTween = false;
    this.m_gamepad1.chosenSide = false;
    this.m_gamepad1.side = "middle";
    this.m_gamepad1.middleX = this.m_gamepad1.x;

    this.m_gamepad2 = new rune.display.Sprite(220, 90, 40, 48, "gamepad");
    this.stage.addChild(this.m_gamepad2);
    this.m_gamepad2.isPlayingTween = false;
    this.m_gamepad2.chosenSide = false;
    this.m_gamepad2.side = "middle";
    this.m_gamepad2.middleX = this.m_gamepad2.x;

    this.m_continueText = new rune.text.BitmapField("PRESS X TO CHOOSE ROLES");
    this.stage.addChild(this.m_continueText);
    this.m_continueText.centerX = this.stage.centerX;
    this.m_continueText.centerY = this.stage.centerY + 40;
    this.m_continueText.visible = false;

};

TerraTactics.scene.ControllerMenu.prototype.m_startTween = function (target, x) {
    target.isPlayingTween = true;

    this.tweens.create({
        target: target,
        scope: this,
        duration: 500,
        easing: rune.tween.Linear.easeIn,
        onDispose: function () {
            target.isPlayingTween = false;
        },
        args: {
            x: x
        }
    });
};

TerraTactics.scene.ControllerMenu.prototype.m_moveController = function (target, side) {
    if (target.isPlayingTween) {
        return;
    }

    var x = target.middleX;
    if (side === "left") {
        x = 80;
    } else if (side === "right") {
        x = 280;
    }
    target.side = side;
    target.chosenSide = side !== "middle";

    this.m_startTween(target, x);
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

    if (this.m_gamepad1.chosenSide && this.m_gamepad2.chosenSide) {
        this.m_continueText.visible = true;
    } else {
        this.m_continueText.visible = false;
    }

    if ((this.m_gamepad1.chosenSide && this.m_gamepad2.chosenSide) && (this.m_player1Controls.confirm || this.m_player2Controls.confirm)) {
        this.application.scenes.load([new TerraTactics.scene.RoleMenu()]);
    }

    if (this.m_player1Controls.justLeft) {
        if (this.m_gamepad1.side === "middle") {
            this.m_moveController(this.m_gamepad1, "left");
        }
    }

    if (this.m_player1Controls.justRight) {
        if (this.m_gamepad1.side === "left") {
            this.m_moveController(this.m_gamepad1, "middle");
        }
    }

    if (this.m_player2Controls.justUp) {
        if (this.m_gamepad2.side === "middle") {
            this.m_moveController(this.m_gamepad2, "right");
        }
    }

    if (this.m_player2Controls.justDown) {
        if (this.m_gamepad2.side === "right") {
            this.m_moveController(this.m_gamepad2, "middle");
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
TerraTactics.scene.ControllerMenu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
