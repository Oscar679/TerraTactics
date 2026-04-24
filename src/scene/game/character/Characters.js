// Handler for Character.js
TerraTactics.scene.Characters = function (stage) {
    this.m_stage = stage;

    this.m_players = {
        player1: {
            id: "p1",
            character: new TerraTactics.scene.Character(100, 10),
            active: true
        },
        player2: {
            id: "p2",
            character: new TerraTactics.scene.Character(70, 10),
            active: false
        }
    };

    this.m_stage.addChild(this.m_players.player1.character);
    this.m_stage.addChild(this.m_players.player2.character);
};

TerraTactics.scene.Characters.prototype.getActive = function () {
    if (this.m_players.player1.active) {
        return this.m_players.player1.character;
    } else {
        return this.m_players.player2.character;
    }
};

TerraTactics.scene.Characters.prototype.getInactive = function () {
    if (this.m_players.player1.active) {
        return this.m_players.player2.character;
    } else {
        return this.m_players.player1.character;
    }
};


TerraTactics.scene.Characters.prototype.switchTurn = function () {
    this.m_players.player1.active = !this.m_players.player1.active;
    this.m_players.player2.active = !this.m_players.player2.active;
};

TerraTactics.scene.Characters.prototype.update = function (tilemapLayer) {
    this.getActive().m_grounded = this.getActive().hitTestAndSeparateTilemapLayer(tilemapLayer);

    this.getInactive().m_grounded = this.getInactive().hitTestAndSeparateTilemapLayer(tilemapLayer);
};