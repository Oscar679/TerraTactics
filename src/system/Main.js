//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Boots Rune with TerraTactics scenes, resources, and input settings.
 * @constructor
 * @class
 */
TerraTactics.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    rune.system.Application.call(this, {
        developer: "com.terratactics",
        app: "TerraTactics",
        build: "1.0.0",
        scene: TerraTactics.scene.MainMenu,
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
