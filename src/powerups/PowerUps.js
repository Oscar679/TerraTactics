


/**
 * @description Spawns, applies, despawns, and resets powerups during play.
 * @constructor
 * @extends rune.display.Sprite
 * @class
 * @param {Object} gameScene - game scene this helper works with.
 */
TerraTactics.scene.PowerUps = function (gameScene) {


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


TerraTactics.scene.PowerUps.prototype = Object.create(rune.display.Sprite.prototype);
TerraTactics.scene.PowerUps.prototype.constructor = TerraTactics.scene.PowerUps;


TerraTactics.scene.PowerUps.prototype.init = function () {
};


TerraTactics.scene.PowerUps.prototype.m_randomizeXValue = function () {
    var min = 5;
    var max = this.m_stage.m_map.widthInTiles *
        this.m_stage.m_map.tileWidth - 5;

    return Math.floor(Math.random() * (max - min + 1)) + min;
};


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


TerraTactics.scene.PowerUps.prototype.m_applyPowerUp = function (powerUp, player) {
    switch (powerUp.type) {
        case "health":
            var currentHealth = player.health;
            if (currentHealth + 30 > player.maxHealth) {
                player.health = player.maxHealth;
                return;
            }
            player.health = currentHealth + 30;
            break;
        case "speed":
            var currentSpeed = player.speed;
            player.speed = currentSpeed + 0.75;
            break;
        default:
    }
};


TerraTactics.scene.PowerUps.prototype.m_deSpawnPowerUp = function (powerUp) {
    powerUp.x = 0;
    powerUp.y = -50;
    powerUp.velocity = 0;
    powerUp.grounded = true;
};


TerraTactics.scene.PowerUps.prototype.m_resetPowerUps = function (activePlayer, inActivePlayer) {
    activePlayer.speed = 1;
    inActivePlayer.speed = 1;
};


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


TerraTactics.scene.PowerUps.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
