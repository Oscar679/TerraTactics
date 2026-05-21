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

    // controls (keyboard / gamepad)
    this.m_player1Controls = new TerraTactics.util.Controls(0);
    this.m_player2Controls = new TerraTactics.util.Controls(1);

    this.m_rolesPlayer1 = new rune.display.Sprite(20, 20, 24, 24, "roles");
    this.stage.addChild(this.m_rolesPlayer1);

    this.m_rolesPlayer2 = new rune.display.Sprite(120, 20, 24, 24, "roles");
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
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
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