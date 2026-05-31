

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 *
 * Handles spawning, applying and resetting powerups.
 */
TerraTactics.scene.PowerUps = function (gameScene) {


    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
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

    this.m_soundId = "PWRupsound";
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
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.PowerUps.prototype.init = function () {
};

TerraTactics.scene.PowerUps.prototype.m_randomizeXValue = function () {
    var min = 5;
    var max = this.m_stage.m_map.widthInTiles *
        this.m_stage.m_map.tileWidth - 5;

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

TerraTactics.scene.PowerUps.prototype.m_spawnPowerUp = function (type, x, y) {
    var powerUp = this.m_powerUps[type];

    if (powerUp === null || powerUp === undefined) {
        return;
    }
    var spawnX = null;
    var tempX = null;
    var attempts = 0;
    var maxAttempts = 100;

    while (spawnX === null && attempts < maxAttempts) {
        tempX = this.m_randomizeXValue();
        spawnX = this.m_gameScene.getCoordinatesForPowerUp(tempX);
        attempts++;
    }

    if (spawnX === null) {
        return;
    }

    powerUp.x = spawnX.x - powerUp.width * powerUp.scaleX / 2;
    powerUp.y = y || -50;
    powerUp.velocity = 0;
    powerUp.grounded = false;
};

TerraTactics.scene.PowerUps.prototype.m_playSound = function (soundId) {
    var sound = null;

    if (soundId === null || soundId === undefined) {
        return;
    }

    sound = rune.system.Application.instance.sounds.sound.get(soundId, true);
    sound.volume = 0.3;
    TerraTactics.util.Sound.play(sound, true);
};

TerraTactics.scene.PowerUps.prototype.m_applyPowerUp = function (powerUp, player) {
    switch (powerUp.type) {
        case "health":
            var currentHealth = player.health;
            if (currentHealth + 30 > player.maxHealth) {
                player.health = player.maxHealth;

                break;
            }
            player.health = currentHealth + 30; // Magic Number
            break;
        case "speed":
            var currentSpeed = player.speed;
            player.speed = currentSpeed + 0.75; // Magic Number
            break;
        default:
    }
    this.m_playSound(this.m_soundId);
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

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
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
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
TerraTactics.scene.PowerUps.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};
