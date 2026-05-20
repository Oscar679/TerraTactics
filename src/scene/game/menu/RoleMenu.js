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

    // controls (keyboard / gamepad)
    this.m_controls = new TerraTactics.util.Controls(0);

    this.m_roles = new rune.display.Sprite(20, 20, 24, 24, "roles");
    this.stage.addChild(this.m_roles);

    this.m_selectedRole = 0;

    this.m_roles.animation.create("role1", [0], 1, true);
    this.m_roles.animation.create("role2", [1], 1, true);
    this.m_roles.animation.create("role3", [2], 1, true);

    this.m_roles.animation.gotoAndPlay("role1", 0);

    this.m_selectedRoles = [];
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

    if (this.m_selectedRoles.length === 2) {
        this.application.scenes.load([new TerraTactics.scene.Game(this.m_selectedRoles)]);
    }

    this.m_roles.animation.gotoAndPlay("role" + (this.m_selectedRole + 1), 0);

    if (this.m_controls.justUp && this.m_selectedRole > 0) {
        this.m_selectedRole--;
    }

    if (this.m_controls.justDown && this.m_selectedRole < 2) {
        this.m_selectedRole++;
    }

    if (this.m_controls.confirm) {
        var role = null;
        switch (this.m_selectedRole) {
            case 0:
                role = "ninja";
                console.log("Selected ninja");
                this.m_selectedRoles.push(role);
                break;
            case 1:
                role = "bomber";
                console.log("Selected bomber");
                this.m_selectedRoles.push(role);
                break;
            case 2:
                role = "sniper";
                console.log("Selected sniper");
                this.m_selectedRoles.push(role);
                break;
            default:
                break;
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
TerraTactics.scene.RoleMenu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};