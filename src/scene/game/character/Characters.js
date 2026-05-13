// Handler for Character.js
TerraTactics.scene.Characters = function (stage) {
    this.m_stage = stage;

    var character1 = new TerraTactics.scene.Character(100, 10);
    var character2 = new TerraTactics.scene.Character(70, 10);
    var character3 = new TerraTactics.scene.Character(140, 10);

    this.m_players = {
        player1: {
            id: "player1",
            character: character1,
            healthBar: new TerraTactics.scene.HealthBar(4, 0, character1),
            active: true
        },
        player2: {
            id: "player2",
            character: character2,
            healthBar: new TerraTactics.scene.HealthBar(4, 20, character2),
            active: false
        },
        player3: {
            id: "player3",
            character: character3,
            healthBar: new TerraTactics.scene.HealthBar(4, 40, character3),
            active: false
        }
    };

    this.m_stage.addChild(this.m_players.player1.character);
    this.m_stage.addChild(this.m_players.player1.character.m_healthBar);

    this.m_stage.addChild(this.m_players.player2.character);
    this.m_stage.addChild(this.m_players.player2.character.m_healthBar);

    this.m_stage.addChild(this.m_players.player3.character);
    this.m_stage.addChild(this.m_players.player3.character.m_healthBar);

    this.m_winnerText = null;

    this.m_playerOrder = ["player1", "player2", "player3"];
    this.m_currentPlayerIndex = 0;
    this.m_syncActivePlayers();
};

TerraTactics.scene.Characters.prototype.m_syncActivePlayers = function () {
    for (var i = 0; i < this.m_playerOrder.length; i++) {
        var playerId = this.m_playerOrder[i];
        this.m_players[playerId].active = i === this.m_currentPlayerIndex;
    }
};

TerraTactics.scene.Characters.prototype.getActive = function () {
    return this.m_players[this.m_playerOrder[this.m_currentPlayerIndex]];
};

TerraTactics.scene.Characters.prototype.getInactive = function () {
    var currentPlayerId = this.m_playerOrder[this.m_currentPlayerIndex];
    return this.m_playerOrder
        .filter(function (playerId) {
            return playerId !== currentPlayerId;
        })
        .map(function (playerId) {
            return this.m_players[playerId];
        }, this);
};

TerraTactics.scene.Characters.prototype.switchTurn = function () {
    this.m_currentPlayerIndex = (this.m_currentPlayerIndex + 1) % this.m_playerOrder.length;
    this.m_syncActivePlayers();
    var activePlayer = this.getActive();
    this.adjustCooldowns(activePlayer.character);
    activePlayer.character.m_setWeapon("pistol");
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

TerraTactics.scene.Characters.prototype.m_setWinnerText = function (playerEntry) {
    // we need to send the player that won, not died.
    if (playerEntry === null || playerEntry.character === null) {
        return;
    }

    switch (playerEntry.id) {
        case "player1":
            this.m_winnerText = "Player 1 Wins!";
            break;
        case "player2":
            this.m_winnerText = "Player 2 Wins!";
            break;
        case "player3":
            this.m_winnerText = "Player 3 Wins!";
            break;
        default:
            break;
    }
};

TerraTactics.scene.Characters.prototype.getWinnerText = function () {
    return this.m_winnerText;
};

TerraTactics.scene.Characters.prototype.update = function (tilemapLayer) {
    for (var playerId in this.m_players) {
        var playerEntry = this.m_players[playerId];
        var character = playerEntry.character;

        if (character !== null && character.m_health <= 0) {
            this.m_disposeCharacter(playerEntry);
        }
    }

    if (this.getInactive().length === 0) {
        var activePlayer = this.getActive();
        this.m_setWinnerText(activePlayer);
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

    this.m_playerOrder = this.m_playerOrder.filter(function (playerId) {
        return playerId !== playerEntry.id;
    });

    if (this.m_currentPlayerIndex >= this.m_playerOrder.length) {
        this.m_currentPlayerIndex = 0;
    }

    this.m_players[playerEntry.id].character = null;
    this.m_players[playerEntry.id].active = false;

    this.m_syncActivePlayers();

    this.m_stage.removeChild(character);
    this.m_stage.removeChild(character.m_healthBar);
    character.dispose();
};
