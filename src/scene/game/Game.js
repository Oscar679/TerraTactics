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
 * Game scene.
 */
TerraTactics.scene.Game = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);

    this.m_player = null;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.Game.prototype.constructor = TerraTactics.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    var background = new rune.display.Sprite(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height,
        "game-background"
    );

    var lava = new rune.display.Sprite(
        0,
        0,
        this.application.screen.width,
        40,
        "lava"
    );


    this.island0 = new rune.display.Sprite(
        30,
        70,
        50,
        30,
        "island_0"
    );

    this.island1 = new rune.display.Sprite(
        90,
        120,
        50,
        30,
        "island_1"
    );
    this.island2 = new rune.display.Sprite(
        180,
        80,
        50,
        30,
        "island_2"
    );
    this.island3 = new rune.display.Sprite(
        280,
        100,
        50,
        30,
        "island_3"
    );
    this.island4 = new rune.display.Sprite(
        300,
        30,
        50,
        30,
        "island_4"
    );

    this.islands = [this.island0, this.island1, this.island2, this.island3, this.island4];

    lava.y = this.application.screen.height - lava.height + 5;


    console.log(this.island0.hitbox.m_interactiveObject.m_touching);

    this.m_player = new TerraTactics.scene.Character(60, 20);

    this.m_player.m_hitbox.debug = true;
    console.log(this.m_player.m_hitbox.debug);

    this.stage.addChild(background);
    this.stage.addChild(lava);
    this.stage.addChild(this.m_player);


    this.islands.forEach(island => {
        island.allowCollisions = true;
        this.stage.addChild(island);
        island.m_hitbox.debug = true;
    });
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Game.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.islands.forEach(island => {
        if (this.m_player.hitTestAndSeparateObject(island)) {
            console.log("island touched");
            this.m_player.m_grounded = true;
            this.m_player.m_jumping = false;
            this.m_player.m_falling = false;
        }
    });

    if (this.keyboard.pressed("LEFT")) {
        this.m_player.x -= 1;
    }

    if (this.keyboard.pressed("RIGHT")) {
        this.m_player.x += 1;
    }

    if (this.keyboard.justPressed("SPACE") && this.m_player.m_grounded === true) {
        this.m_player.m_jumping = true;
        this.m_player.m_grounded = false;
        this.m_player.m_falling = true;
        this.m_player.y -= 10;

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
TerraTactics.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
