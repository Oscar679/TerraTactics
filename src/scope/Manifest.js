


var TerraTactics = function() {


    var m_this = {};


    m_this.data = {};


    m_this.scene = {};


    m_this.system = {};


    m_this.util = {};


    return m_this;
}();


TerraTactics.bootstrap = function(callback) {
    var app = new TerraTactics.system.Main();
        app.start(callback);

    return app;
};
