

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * @description Spawns, applies, despawns, and resets powerups during play.
 * @constructor
 * @extends rune.display.Sprite
 * @class
 * @param {Object} gameScene - game scene this helper works with.
 */
TerraTactics.scene.PowerUps = function (gameScene) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    rune.display.Sprite.call(this);

    this.m_gameScene = gameScene;
    this.m_stage = gameScene.stage;

    var healthPowerUp = new TerraTactics.scene.Health(0, -50, this.m_stage);
    var speedPowerUp = new TerraTactics.scene.Speed(0, -50, this.m_stage);

    this.m_powerUps = {
        "health": healthPowerUp,
        "speed": speedPowerUp
    }

    this.m_stage.addChild(healthPowerUp);
    this.m_stage.addChild(speedPowerUp);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.PowerUps.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.PowerUps.prototype.constructor = TerraTactics.scene.PowerUps;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @description Sets up this object after Rune creates it.
 *
 * @returns {undefined}
 */
TerraTactics.scene.PowerUps.prototype.init = function () {
};

/**
 * @description Picks a random x-position inside the playable map.
 * @returns {number} - a randomized value between 5 and map width.
 */
TerraTactics.scene.PowerUps.prototype.m_randomizeXValue = function () {
    var min = 5;
    var max = this.m_stage.m_map.widthInTiles *
        this.m_stage.m_map.tileWidth - 5;

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @description Drops a powerup at a valid tile column.
 * @param {string} type - type of powerup.
 * @returns {void}
 */
TerraTactics.scene.PowerUps.prototype.m_spawnPowerUp = function (type) {
    var powerUp = this.m_powerUps[type];

    if (powerUp === null || powerUp === undefined) {
        return;
    }
    var spawnX = null;
    var tempX = null;
    var attempts = 0;
    var maxAttempts = 1000;

    while (spawnX === null && attempts < maxAttempts) {
        tempX = this.m_randomizeXValue();
        spawnX = this.m_gameScene.getCoordinatesForPowerUp(tempX);
        attempts++;
    }

    if (spawnX === null) {
        return;
    }

    powerUp.x = spawnX.x - powerUp.width * powerUp.scaleX / 2;
    powerUp.y = -50;
    powerUp.velocity = 0;
    powerUp.grounded = false;
};

/**
 * @description Applies the pickup effect to the player who collected it.
 * @param {Object} powerUp - the powerup object.
 * @param {Object} player - the target of powerup buffs.
 * @returns {void}
 */
TerraTactics.scene.PowerUps.prototype.m_applyPowerUp = function (powerUp, player) {
    switch (powerUp.type) {
        case "health":
            var currentHealth = player.health;
            if (currentHealth + 30 > player.maxHealth) {
                player.health = player.maxHealth;
                return;
            }
            player.health = currentHealth + 30; // Magic Number
            break;
        case "speed":
            var currentSpeed = player.speed;
            player.speed = currentSpeed + 0.75; // Magic Number
            break;
        default:
    }
};

/**
 * @description Hides a collected powerup above the screen and marks it grounded.
 * @param {Object} powerUp - the powerup object.
 * @returns {void}
 */
TerraTactics.scene.PowerUps.prototype.m_deSpawnPowerUp = function (powerUp) {
    powerUp.x = 0;
    powerUp.y = -50;
    powerUp.velocity = 0;
    powerUp.grounded = true;
};

/**
 * @description Restores both players to normal movement speed.
 * @param {Object} activePlayer - the active player.
 * @param {Object} inActivePlayer - the inactive player.
 * @returns {void}
 */
TerraTactics.scene.PowerUps.prototype.m_resetPowerUps = function (activePlayer, inActivePlayer) {
    activePlayer.speed = 1;
    inActivePlayer.speed = 1;
};

/**
 * @description Runs this object's per-tick game logic.
 *
 * @param {number} step fixed time step from the engine.
 *
 * @returns {undefined}
 */
TerraTactics.scene.PowerUps.prototype.update = function (tilemapLayer, activePlayer) {
    if (activePlayer !== null && activePlayer.character !== null) {
        for (var key in this.m_powerUps) {
            var powerUp = this.m_powerUps[key];

            if (powerUp !== null && !powerUp.grounded) {
                powerUp.hitTestAndSeparateTilemapLayer(tilemapLayer);
                powerUp.grounded = powerUp.velocity >= 0 &&
                    powerUp.isTouching(rune.physics.Space.DOWN);

                if (powerUp.grounded) {
                    powerUp.velocity = 0;
                }
            }

            if (powerUp !== null) {
                if (powerUp.hitTest(activePlayer.character)) {
                    this.m_applyPowerUp(powerUp, activePlayer.character);
                    this.m_deSpawnPowerUp(powerUp);
                }
            }
        }
    }
};

/**
 * @description Cleans up this object before it leaves the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.PowerUps.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
