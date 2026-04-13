//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
TerraTactics.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "com.terratactics",
        app: "TerraTactics",
        build: "1.0.0",
        scene: TerraTactics.scene.Intro,
        resources: TerraTactics.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 60,
        debug: true
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.system.Main.prototype = Object.create(rune.system.Application.prototype);
TerraTactics.system.Main.prototype.constructor = TerraTactics.system.Main;