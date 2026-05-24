//------------------------------------------------------------------------------
// Namespace
//------------------------------------------------------------------------------

/**
 * @description Root namespace for TerraTactics code.
 * @namespace TerraTactics
 */
var TerraTactics = function() {

    //--------------------------------------------------------------------------
    // Public static scope
    //--------------------------------------------------------------------------

    /**
     * Public scope.
     *
     * @type {Object}
     * @private
     */
    var m_this = {};

    //--------------------------------------------------------------------------
    // Package structure
    //--------------------------------------------------------------------------

    /**
     * This package contains classes that represent data, or that are used to
     * manage data. Data can consist of concrete information, or of raw data
     * such as resource files.
     *
     * @namespace data
     * @memberof TerraTactics
     * @since 1.0
     */
    m_this.data = {};

    /**
     * This package includes the scenes that make up the application. Scenes
     * are used to represent graphical parts (also known as views) of an
     * application.
     *
     * @namespace scene
     * @memberof TerraTactics
     * @since 1.0
     */
    m_this.scene = {};

    /**
     * This package contains the application's most vital classes.
     *
     * @namespace system
     * @memberof TerraTactics
     * @since 1.0
     */
    m_this.system = {};

    /**
     * This package contains shared utility classes.
     *
     * @namespace util
     * @memberof TerraTactics
     * @since 1.0
     */
    m_this.util = {};

    //--------------------------------------------------------------------------
    // Return public scope object
    //--------------------------------------------------------------------------

    /**
     * Public scope.
     */
    return m_this;
}();

//------------------------------------------------------------------------------
// Public static methods
//------------------------------------------------------------------------------

/**
 * @description Creates and starts the TerraTactics application.
 * @param {Function} callback - callback executed when the application starts.
 * @returns {TerraTactics.system.Main} - started application instance.
 */
TerraTactics.bootstrap = function(callback) {
    var app = new TerraTactics.system.Main();
        app.start(callback);

    return app;
};
