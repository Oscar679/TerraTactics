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
 * Role selection scene.
 */
TerraTactics.scene.RoleMenu = function () {


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

TerraTactics.scene.RoleMenu.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.RoleMenu.prototype.constructor = TerraTactics.scene.RoleMenu;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.RoleMenu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.m_background = new rune.display.Sprite(0, 0, 432, 240, "controllerMenuBackground");
    this.stage.addChild(this.m_background);

    this.m_background.animation.create("idle", [0, 1, 2, 3], 3, true);

    this.m_dpad = new rune.display.Sprite(175, 30, 48, 48, "dpad");

    this.m_dpad.animation.create("idle", [0, 1], 1, true);

    this.stage.addChild(this.m_dpad);

    this.m_player1Container = new rune.display.Sprite(5, 30, 128, 128, "Player1");
    this.stage.addChild(this.m_player1Container);

    this.m_player2Container = new rune.display.Sprite(260, 30, 128, 128, "Player2");
    this.stage.addChild(this.m_player2Container);

    this.m_player1Container.animation.create("idle", [0], 1, true);
    this.m_player2Container.animation.create("idle", [0], 1, true);

    this.m_player1Container.animation.gotoAndPlay("idle", 0);
    this.m_player2Container.animation.gotoAndPlay("idle", 0);

    this.m_player1Container.animation.create("locked", [1], 1, true);
    this.m_player2Container.animation.create("locked", [1], 1, true);

    // controls (keyboard / gamepad)
    this.m_player1Controls = new TerraTactics.util.Controls(0);
    this.m_player2Controls = new TerraTactics.util.Controls(1);

    this.m_rolesPlayer1 = new rune.display.Sprite(0, 0, 24, 24, "roles");
    this.m_rolesPlayer1.scaleX = 2;
    this.m_rolesPlayer1.scaleY = 2;
    this.m_rolesPlayer1.centerX = this.m_player1Container.centerX;
    this.m_rolesPlayer1.centerY = this.m_player1Container.centerY;

    this.stage.addChild(this.m_rolesPlayer1);

    this.m_rolesPlayer2 = new rune.display.Sprite(0, 0, 24, 24, "roles");
    this.m_rolesPlayer2.scaleX = 2;
    this.m_rolesPlayer2.scaleY = 2;
    this.m_rolesPlayer2.centerX = this.m_player2Container.centerX;
    this.m_rolesPlayer2.centerY = this.m_player2Container.centerY;

    this.stage.addChild(this.m_rolesPlayer2);

    this.m_selectedRolePlayer1 = 0;
    this.m_selectedRolePlayer2 = 0;

    this.m_rolesPlayer1.animation.create("role1", [0], 1, true);
    this.m_rolesPlayer1.animation.create("role2", [1], 1, true);
    this.m_rolesPlayer1.animation.create("role3", [2], 1, true);

    this.m_rolesPlayer2.animation.create("role1", [0], 1, true);
    this.m_rolesPlayer2.animation.create("role2", [1], 1, true);
    this.m_rolesPlayer2.animation.create("role3", [2], 1, true);

    this.m_rolesPlayer1.animation.gotoAndPlay("role1", 0);
    this.m_rolesPlayer2.animation.gotoAndPlay("role1", 0);

    this.m_player1Locked = false;
    this.m_player2Locked = false;

    this.m_selectedRoles = {
        "player1": "",
        "player2": ""
    };

    this.m_continueText = new rune.text.BitmapField("PRESS ANY KEY TO CONTINUE", "Font8ptwhite");
    this.m_continueText.width = this.m_continueText.textWidth;
    this.m_continueText.height = this.m_continueText.textHeight;
    this.m_continueText.centerX = this.m_background.m_width / 2.2;
    this.m_continueText.centerY = this.m_background.m_height / 1.4;
    this.m_continueText.visible = false;
    this.stage.addChild(this.m_continueText);

    this.m_leftArrow1 = new rune.display.Sprite(this.m_player1Container.x, this.m_player1Container.centerY, 48, 48, "arrowleft");
    this.m_rightArrow1 = new rune.display.Sprite(this.m_player1Container.x + 114, this.m_player1Container.centerY, 48, 48, "arrowright");

    this.m_leftArrow1.scaleX = 0.5;
    this.m_leftArrow1.scaleY = 0.5;
    this.m_rightArrow1.scaleY = 0.5;
    this.m_rightArrow1.scaleX = 0.5;

    this.stage.addChild(this.m_leftArrow1);
    this.stage.addChild(this.m_rightArrow1);

    this.m_leftArrow2 = new rune.display.Sprite(this.m_player2Container.x, this.m_player2Container.centerY, 48, 48, "arrowleft");
    this.m_rightArrow2 = new rune.display.Sprite(this.m_player2Container.x + 114, this.m_player2Container.centerY, 48, 48, "arrowright");

    this.m_leftArrow2.scaleX = 0.5;
    this.m_leftArrow2.scaleY = 0.5;
    this.m_rightArrow2.scaleX = 0.5;
    this.m_rightArrow2.scaleY = 0.5;

    this.stage.addChild(this.m_leftArrow2);
    this.stage.addChild(this.m_rightArrow2);

    this.m_delayFinished = false;
    this.m_player1XAxisLocked = false;
    this.m_player2XAxisLocked = false;
};

TerraTactics.scene.RoleMenu.prototype.m_confirmRole = function (player, role) {
    switch (role) {
        case 0:
            this.m_selectedRoles[player] = "ninja";
            break;
        case 1:
            this.m_selectedRoles[player] = "bomber";
            break;
        case 2:
            this.m_selectedRoles[player] = "sniper";
            break;
        default:
            break;
    }
};

TerraTactics.scene.RoleMenu.prototype.m_updateUIStats = function (role1, role2) {
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.RoleMenu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    var p1Left = this.m_player1Controls.left || this.m_player1Controls.aimX < -0.5;
    var p1Right = this.m_player1Controls.right || this.m_player1Controls.aimX > 0.5;

    var p2Left = this.m_player2Controls.left || this.m_player2Controls.aimX < -0.5;
    var p2Right = this.m_player2Controls.right || this.m_player2Controls.aimX > 0.5;

    if (!p1Left && !p1Right) {
        this.m_player1XAxisLocked = false;
    }

    if (!p2Left && !p2Right) {
        this.m_player2XAxisLocked = false;
    }

    this.m_player1Locked = this.m_selectedRoles["player1"] !== "";
    this.m_player2Locked = this.m_selectedRoles["player2"] !== "";

    this.m_rolesPlayer1.animation.gotoAndPlay("role" + (this.m_selectedRolePlayer1 + 1), 0);
    this.m_rolesPlayer2.animation.gotoAndPlay("role" + (this.m_selectedRolePlayer2 + 1), 0);

    if (this.m_player1Locked && this.m_player2Locked) {
        this.m_continueText.visible = true;
    } else {
        this.m_continueText.visible = false;
    }

    if (this.m_player1Locked && this.m_player2Locked) {
        this.timers.create({
            duration: 500,
            repeat: 0,
            onComplete: function () {
                this.m_delayFinished = true;
            },
            scope: this
        });
        if (this.m_delayFinished) {
            if (this.m_player1Controls.anyButton || this.m_player2Controls.anyButton) {
                this.application.scenes.load([new TerraTactics.scene.Game(this.m_selectedRoles)]);
            }
        }
    }

    if (!this.m_player1Locked) {
        if (p1Left && !this.m_player1XAxisLocked) {
            this.m_selectedRolePlayer1--;
            if (this.m_selectedRolePlayer1 < 0) {
                this.m_selectedRolePlayer1 = 2;
            }
            this.m_player1XAxisLocked = true;
        }

        if (p1Right && !this.m_player1XAxisLocked) {
            this.m_selectedRolePlayer1++;
            if (this.m_selectedRolePlayer1 > 2) {
                this.m_selectedRolePlayer1 = 0;
            }
            this.m_player1XAxisLocked = true;
        }

        if (this.m_player1Controls.confirm) {
            this.m_confirmRole("player1", this.m_selectedRolePlayer1);
        }
    }

    if (!this.m_player2Locked) {
        if (p2Left && !this.m_player2XAxisLocked) {
            this.m_selectedRolePlayer2--;
            if (this.m_selectedRolePlayer2 < 0) {
                this.m_selectedRolePlayer2 = 2;
            }
            this.m_player2XAxisLocked = true;
        }

        if (p2Right && !this.m_player2XAxisLocked) {
            this.m_selectedRolePlayer2++;
            if (this.m_selectedRolePlayer2 > 2) {
                this.m_selectedRolePlayer2 = 0;
            }
            this.m_player2XAxisLocked = true;
        }

        if (this.m_player2Controls.confirm) {
            this.m_confirmRole("player2", this.m_selectedRolePlayer2);
        }
    }

    this.m_updateUIStats(this.m_selectedRolePlayer1, this.m_selectedRolePlayer2);

    if (this.m_player1Locked) {
        this.m_player1Container.animation.gotoAndPlay("locked", 0);
    }

    if (this.m_player2Locked) {
        this.m_player2Container.animation.gotoAndPlay("locked", 0);
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
TerraTactics.scene.RoleMenu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
