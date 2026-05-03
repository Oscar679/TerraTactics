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
    this.m_stage.addChild(this.m_players.player1.character.m_healthBar);

    this.m_stage.addChild(this.m_players.player2.character);
    this.m_stage.addChild(this.m_players.player2.character.m_healthBar);
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
    if (this.m_players.player1.character === null || this.m_players.player2.character === null) {
        return;
    }

    this.m_players.player1.active = !this.m_players.player1.active;
    this.m_players.player2.active = !this.m_players.player2.active;
    this.adjustCooldowns(this.getActive());
};

TerraTactics.scene.Characters.prototype.adjustCooldowns = function (character) {
    for (var cd in character.m_weaponState.cooldowns) {
        if (character.m_weaponState.cooldowns.hasOwnProperty(cd)) {
            if (character.m_weaponState.cooldowns[cd] > 0) {
                character.m_weaponState.cooldowns[cd]--;
            }
        }
    }
};

TerraTactics.scene.Characters.prototype.update = function (tilemapLayer) {
    for (var playerId in this.m_players) {
        var playerEntry = this.m_players[playerId];
        var character = playerEntry.character;

        if (character !== null && character.m_health <= 0) {
            this.m_disposeCharacter(playerEntry);
        }
    }

    for (var playerId in this.m_players) {
        var playerEntry = this.m_players[playerId];
        var character = playerEntry.character;

        if (character !== null) {
            character.m_grounded = character.hitTestAndSeparateTilemapLayer(tilemapLayer);
        }
    }
};

TerraTactics.scene.Characters.prototype.m_disposeCharacter = function (playerEntry) {
    var character = playerEntry.character;

    this.m_stage.removeChild(character);
    this.m_stage.removeChild(character.m_healthBar);
    character.dispose();

    playerEntry.character = null;
    playerEntry.active = false;
};
