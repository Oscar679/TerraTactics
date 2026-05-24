


/**
 * @description Screen where players choose which side their controllers control.
 * @constructor
 * @extends rune.scene.Scene
 * @class
 */
TerraTactics.scene.ControllerMenu = function () {


    rune.scene.Scene.call(this);
};


TerraTactics.scene.ControllerMenu.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.ControllerMenu.prototype.constructor = TerraTactics.scene.ControllerMenu;


TerraTactics.scene.ControllerMenu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.m_player1Controls = new TerraTactics.util.Controls(0);
    this.m_player2Controls = new TerraTactics.util.Controls(1);

    this.m_background = new rune.display.Sprite(0, 0, 432, 240, "controllerMenuBackground");
    this.stage.addChild(this.m_background);

    this.m_background.animation.create("idle", [0, 1, 2, 3], 3, true);

    this.m_player1Container = new rune.display.Sprite(5, 30, 128, 128, "Player1");
    this.stage.addChild(this.m_player1Container);

    this.m_player2Container = new rune.display.Sprite(260, 30, 128, 128, "Player2");
    this.stage.addChild(this.m_player2Container);

    this.m_gamepad1 = new rune.display.Sprite(150, 90, 40, 48, "gamepad");
    this.stage.addChild(this.m_gamepad1);
    this.m_gamepad1.isPlayingTween = false;
    this.m_gamepad1.chosenSide = false;
    this.m_gamepad1.side = "middle";
    this.m_gamepad1.middleX = this.m_gamepad1.x;

    this.m_gamepad2 = new rune.display.Sprite(205, 90, 40, 48, "gamepad");
    this.stage.addChild(this.m_gamepad2);
    this.m_gamepad2.isPlayingTween = false;
    this.m_gamepad2.chosenSide = false;
    this.m_gamepad2.side = "middle";
    this.m_gamepad2.middleX = this.m_gamepad2.x;

    this.m_continueText = new rune.text.BitmapField("PRESS X TO CHOOSE ROLES", "");
    this.m_continueText.centerX = this.m_background.m_width / 2.2;
    this.m_continueText.centerY = this.m_background.m_height / 1.4;
    this.m_continueText.visible = false;
    this.stage.addChild(this.m_continueText);
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


TerraTactics.scene.ControllerMenu.prototype.m_getCenteredX = function (container, target) {
    return container.centerX - target.width * 0.5;
};


TerraTactics.scene.ControllerMenu.prototype.m_moveController = function (target, side) {
    if (target.isPlayingTween) {
        return;
    }

    var x = target.middleX;
    if (side === "left") {
        x = this.m_getCenteredX(this.m_player1Container, target);
    } else if (side === "right") {
        x = this.m_getCenteredX(this.m_player2Container, target);
    }
    target.side = side;
    target.chosenSide = side !== "middle";

    this.m_startTween(target, x);
};


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


TerraTactics.scene.ControllerMenu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
