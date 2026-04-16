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
TerraTactics.scene.Options = function () {


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

TerraTactics.scene.Options.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.Options.prototype.constructor = TerraTactics.scene.Options;
TerraTactics.scene.Options.prototype.m_onMenuSelect = function (e) {
    console.log(e);

    m_this.application.scenes.load([new TerraTactics.scene.MainMenu()]);
};

TerraTactics.scene.Options.prototype.decrease = function (x) {
    console.log("decrease");
    var items = this.m_menu.m_list.getChildren();
    var item = items[x];
    console.log(item.text);
};

TerraTactics.scene.Options.prototype.increase = function (x) {
    console.log("increase");
    var items = this.m_menu.m_list.getChildren();
    var item = items[x];
    console.log(item.text);
};


//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Options.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    m_this = this;

    this.counter = 0; // counter for keeping track of which menu item is hovered over

    var background = new rune.display.Sprite(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height,
        "background"
    );


    this.stage.addChild(background);

    this.m_menu = new rune.ui.VTMenu();

    this.m_menu.add("Master Volume");
    this.m_menu.add("Music Volume");
    this.m_menu.add("SFX Volume");
    this.m_menu.add("Back");

    this.m_menu.centerX = this.application.screen.centerX;
    this.m_menu.y = 90;

    this.m_menu.onSelect(this.m_onMenuSelect, this);

    this.stage.addChild(this.m_menu);
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Options.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    if (this.keyboard.justPressed("UP") && this.counter > 0) {
        this.counter--;
        this.m_menu.up();
    }

    if (this.keyboard.justPressed("DOWN") && this.counter < 3) {
        this.counter++;
        this.m_menu.down();
    }

    if (this.keyboard.pressed("LEFT") && this.counter !== 3) {
        this.decrease(this.counter); //index of item in menu
    }

    if (this.keyboard.pressed("RIGHT") && this.counter !== 3) {
        this.increase(this.counter); //index of item in menu
    }

    if (this.keyboard.justPressed("ENTER") && this.counter === 3) {
        this.m_menu.select();
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
TerraTactics.scene.Options.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};