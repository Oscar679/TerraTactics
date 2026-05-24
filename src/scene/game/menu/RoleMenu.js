//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Screen where each player picks a character role.
 * @constructor
 * @extends rune.scene.Scene
 * @class
 */
TerraTactics.scene.RoleMenu = function () {


    // Super call
    //--------------------------------------------------------------------------
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
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.RoleMenu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.m_background = new rune.display.Sprite(0, 0, 432, 240, "controllerMenuBackground");
    this.stage.addChild(this.m_background);

    this.m_background.animation.create("idle", [0, 1, 2, 3], 3, true);

    this.m_player1Container = new rune.display.Sprite(5, 30, 128, 128, "Player1");
    this.stage.addChild(this.m_player1Container);

    this.m_player2Container = new rune.display.Sprite(260, 30, 128, 128, "Player2");
    this.stage.addChild(this.m_player2Container);

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
};

/**
 * @description Converts a role index into the role name stored for a player.
 * @param {string} player - player id to store role for.
 * @param {number} role - selected role index.
 * @returns {undefined}
 */
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

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.RoleMenu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    this.m_player1Locked = this.m_selectedRoles["player1"] !== "";
    this.m_player2Locked = this.m_selectedRoles["player2"] !== "";

    this.m_rolesPlayer1.animation.gotoAndPlay("role" + (this.m_selectedRolePlayer1 + 1), 0);
    this.m_rolesPlayer2.animation.gotoAndPlay("role" + (this.m_selectedRolePlayer2 + 1), 0);

    if (!this.m_player1Locked) {
        if (this.m_player1Controls.justUp && this.m_selectedRolePlayer1 > 0) {
            this.m_selectedRolePlayer1--;
        }

        if (this.m_player1Controls.justDown && this.m_selectedRolePlayer1 < 2) {
            this.m_selectedRolePlayer1++;
        }

        if (this.m_player1Controls.confirm) {
            this.m_confirmRole("player1", this.m_selectedRolePlayer1);
        }
    }

    if (!this.m_player2Locked) {
        if (this.m_player2Controls.justUp && this.m_selectedRolePlayer2 > 0) {
            this.m_selectedRolePlayer2--;
        }

        if (this.m_player2Controls.justDown && this.m_selectedRolePlayer2 < 2) {
            this.m_selectedRolePlayer2++;
        }

        if (this.m_player2Controls.confirm) {
            this.m_confirmRole("player2", this.m_selectedRolePlayer2);
        }
    }

    if (this.m_selectedRoles["player1"] !== "" &&
        this.m_selectedRoles["player2"] !== "") {
        this.application.scenes.load([new TerraTactics.scene.Game(this.m_selectedRoles)]);
    }
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.RoleMenu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
