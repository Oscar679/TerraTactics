/**
 * @description Manages both player characters, their turns, sounds, and deaths.
 * @constructor
 * @param {rune.display.DisplayObjectContainer} stage - stage that characters are added to.
 * @param {Object} roles - selected roles for each player.
 */
TerraTactics.scene.Characters = function (stage, roles) {
    this.m_stage = stage;
    this.m_roles = roles;

    this.m_soundChannel = new rune.media.SoundChannel();

    this.m_jumpSound = this.m_soundChannel.get("jump");
    this.m_walkSound = this.m_soundChannel.get("walk");
    this.m_ouchSound = this.m_soundChannel.get("ouch");
    this.m_lavaShizzle = this.m_soundChannel.get("lava_shizzle");

    this.m_isWalkSoundPlaying = false;

    var character1 = new TerraTactics.scene.Character(70, 10, this.m_roles["player1"]);
    var character2 = new TerraTactics.scene.Character(250, 10, this.m_roles["player2"]);

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
            healthBar: new TerraTactics.scene.HealthBar(302, 0, character2),
            active: false
        }
    };

    this.m_stage.addChild(this.m_players.player1.character);
    this.m_stage.addChild(this.m_players.player1.character.m_healthBar);

    this.m_stage.addChild(this.m_players.player2.character);
    this.m_stage.addChild(this.m_players.player2.character.m_healthBar);


    this.m_winnerText = null;

    this.m_playerOrder = ["player1", "player2"];
    this.m_currentPlayerIndex = 0;
    this.m_syncActivePlayers();
};

/**
 * @description Syncs player active flags with the current turn index.
 * @returns {undefined}
 */
TerraTactics.scene.Characters.prototype.m_syncActivePlayers = function () {
    for (var i = 0; i < this.m_playerOrder.length; i++) {
        var playerId = this.m_playerOrder[i];
        this.m_players[playerId].active = i === this.m_currentPlayerIndex;
    }
};

/**
 * @description Advances the turn order and resets the next player to pistol.
 * @returns {undefined}
 */
TerraTactics.scene.Characters.prototype.switchTurn = function () {
    this.m_currentPlayerIndex = (this.m_currentPlayerIndex + 1) % this.m_playerOrder.length;
    var activePlayer = this.getActive;
    if (activePlayer != null && activePlayer.character != null) {
        this.adjustCooldowns(activePlayer.character);
        activePlayer.character.weapon = "pistol";
    }
    this.m_syncActivePlayers();
};

/**
 * @description Ticks down a character's weapon cooldowns at turn start.
 * @param {TerraTactics.scene.Character} character - character whose cooldowns should be adjusted.
 * @returns {undefined}
 */
TerraTactics.scene.Characters.prototype.adjustCooldowns = function (character) {
    for (var cd in character.m_weaponState.cooldowns) {
        if (character.m_weaponState.cooldowns.hasOwnProperty(cd)) {
            if (character.m_weaponState.cooldowns[cd] > 0) {
                character.m_weaponState.cooldowns[cd]--;
            }
        }
    }
};

/**
 * @description Removes health from a character and plays the pain sound.
 * @param {TerraTactics.scene.Character} character - character taking damage.
 * @param {number} damage - amount of damage to apply.
 * @returns {undefined}
 */
TerraTactics.scene.Characters.prototype.m_damageTaken = function (character, damage) {
    character.m_health -= damage;
    this.m_ouchSound.play();
};

/**
 * @description Plays a clean jump sound without the walk loop underneath.
 * @returns {undefined}
 */
TerraTactics.scene.Characters.prototype.m_playJumpSound = function () {
    if (this.m_isWalkSoundPlaying) {
        this.m_walkSound.stop();
        this.m_isWalkSoundPlaying = false;
    }

    this.m_jumpSound.play(true);
};

/**
 * @description Pushes a character back inside the left and right walls.
 * @param {TerraTactics.scene.Character} player - character to check against boundaries.
 * @returns {undefined}
 */
TerraTactics.scene.Characters.prototype.hitBoundary = function (player) {
    // left wall
    if (player.left < this.leftWall) {
        player.left = this.leftWall;
        player.m_grounded = false;
        player.m_velocityY = 2;
    }

    // right wall
    if (player.right > this.rightWall) {
        player.right = this.rightWall;
        player.m_grounded = false;
        player.m_velocityY = 2;
    }
};


/**
 * @description Runs per-frame character collision, death, lava, sound, and winner checks.
 * @param {rune.tilemap.TilemapLayer} tilemapLayer - tilemap layer used for collision checks.
 * @returns {undefined}
 */
TerraTactics.scene.Characters.prototype.update = function (tilemapLayer) {
    for (var playerId in this.m_players) {
        var playerEntry = this.m_players[playerId];
        var character = playerEntry.character;

        if (character !== null) {
            if (character.m_isTouchingLava) {
                character.m_isTouchingLava = false;
                this.m_lavaShizzle.play();
            }
        }
    }

    for (var playerId in this.m_players) {
        var playerEntry = this.m_players[playerId];
        var character = playerEntry.character;

        if (character !== null && character.m_health <= 0) {
            this.m_disposeCharacter(playerEntry);
        }
    }

    if (!this.getActive && this.getInactive.length === 0) {
        this.winnerText = "draw";
    }

    if (this.getInactive.length === 0) {
        var activePlayer = this.getActive;
        this.winnerText = activePlayer;
    }

    for (var playerId in this.m_players) {
        var playerEntry = this.m_players[playerId];
        var character = playerEntry.character;

        if (character !== null) {
            character.hitTestAndSeparateTilemapLayer(tilemapLayer);
            character.m_grounded = character.m_velocityY >= 0 &&
                character.isTouching(rune.physics.Space.DOWN);

            if (character.m_grounded) {
                character.m_airborneTicks = 0;
                character.m_velocityY = 0;
                character.m_isJumping = false;
            }
        }
    }
    var activePlayer = this.getActive;
    if (
        activePlayer != null &&
        activePlayer.character != null) {
        if ((activePlayer.character.m_movingLeft || activePlayer.character.m_movingRight) && !activePlayer.character.m_isJumping) {
            if (!this.m_isWalkSoundPlaying) {
                this.m_walkSound.play(true);
                this.m_isWalkSoundPlaying = true;
            }
        } else {
            if (this.m_isWalkSoundPlaying) {
                this.m_walkSound.stop();
                this.m_isWalkSoundPlaying = false;
            }
        }
    }

    for (var playerId in this.m_players) {
        var playerEntry = this.m_players[playerId];
        var character = playerEntry.character;

        if (character !== null) {
            if (character.left < this.leftWall ||
                character.right > this.rightWall) {
                this.hitBoundary(character);
            }
        }
    }
};

/**
 * @description Removes a defeated character from the stage and turn order.
 * @param {Object} playerEntry - player entry to dispose.
 * @returns {undefined}
 */
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

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

Object.defineProperty(TerraTactics.scene.Characters.prototype, "getActive", {
    get: function () {
        return this.m_players[this.m_playerOrder[this.m_currentPlayerIndex]];
    }
});

Object.defineProperty(TerraTactics.scene.Characters.prototype, "getInactive", {
    get: function () {
        var currentPlayerId = this.m_playerOrder[this.m_currentPlayerIndex];
        return this.m_playerOrder
            .filter(function (playerId) {
                return playerId !== currentPlayerId;
            })
            .map(function (playerId) {
                return this.m_players[playerId];
            }, this);
    }
});

Object.defineProperty(TerraTactics.scene.Characters.prototype, "winnerText", {
    get: function () {
        return this.m_winnerText;
    },
    set: function (value) {
        if (value == null || value.character == null) {
            return;
        }

        switch (value.id) {
            case "player1":
                this.m_winnerText = "Player 1 Wins!";
                break;
            case "player2":
                this.m_winnerText = "Player 2 Wins!";
                break;
            case "player3":
                this.m_winnerText = "Player 3 Wins!";
                break;
            case "draw":
                this.m_winnerText = "Draw!";
                break;
            default:
                break;
        }
    }
});

Object.defineProperty(TerraTactics.scene.Characters.prototype, "worldWidth", {
    get: function () {
        return this.m_stage.m_map.widthInTiles * this.m_stage.m_map.tileWidth;
    }
});

Object.defineProperty(TerraTactics.scene.Characters.prototype, "worldHeight", {
    get: function () {
        return this.m_stage.m_map.heightInTiles * this.m_stage.m_map.tileHeight;
    }
});

Object.defineProperty(TerraTactics.scene.Characters.prototype, "leftWall", {
    get: function () {
        return 0;
    }
});

Object.defineProperty(TerraTactics.scene.Characters.prototype, "rightWall", {
    get: function () {
        return 400;
    }
});
