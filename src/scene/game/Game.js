//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
TerraTactics.scene.Game = function (role) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
    this.m_roles = role;
    console.log(this.m_roles);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

TerraTactics.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
TerraTactics.scene.Game.prototype.constructor = TerraTactics.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.bg = new rune.display.Graphic(0, 0, 400, 225, "game_bg");
    this.stage.addChild(this.bg);

    this.m_soundChannel = new rune.media.SoundChannel();
    this.m_tick3SecSound = this.m_soundChannel.get("tick_3_sec");
    this.m_turnChangeSound = this.m_soundChannel.get("turn_change");

    this.m_themeMusic = this.m_soundChannel.get("theme_music");
    this.m_themeMusic.loop = true;
    this.m_themeMusic.volume = 0.5;
    this.m_themeMusic.play();

    // load tilemap
    this.stage.m_map.load("map");

    this.m_camera = this.cameras.getCameraAt(0);

    this.m_time = 0;

    // round timer string
    this.m_roundTimeString = new rune.text.BitmapField("10");
    this.m_roundTimeString.width = this.m_roundTimeString.textWidth;
    this.m_roundTimeString.height = this.m_roundTimeString.textHeight;

    // global timer string
    this.m_timeString = new rune.text.BitmapField("00:00");
    this.m_timeString.width = this.m_timeString.textWidth;
    this.m_timeString.height = this.m_timeString.textHeight;

    this.m_globalTimer = this.timers.create({
        duration: 1000,
        repeat: 999999,
        onTick: function () {
            this.m_time++;
            this.m_second = this.m_time % 60;
            this.m_minute = Math.floor(this.m_time / 60);

            this.m_timeString.text = this.m_padNumber(this.m_minute) + ":" + this.m_padNumber(this.m_second);
        },
        scope: this
    });

    // create containers
    this.m_timerContainer = new rune.display.DisplayObjectContainer(105, 8, 190, 148);
    this.m_globalTimerContainer = new rune.display.DisplayObjectContainer(90, 0, 96, 48);
    this.m_roundTimerContainer = new rune.display.DisplayObjectContainer(30, 0, 96, 48);

    // create time bars
    this.totalTimeBar = new TerraTactics.scene.TimeBar(0, 0);
    this.roundTimeBar = new TerraTactics.scene.TimeBar(0, 0);

    // add containers
    this.m_camera.addChild(this.m_timerContainer);
    this.m_timerContainer.addChild(this.m_globalTimerContainer);
    this.m_timerContainer.addChild(this.m_roundTimerContainer);

    this.totalTimeBar.scaleX = 0.6;
    this.totalTimeBar.scaleY = 0.8;
    this.roundTimeBar.scaleX = 0.6;
    this.roundTimeBar.scaleY = 0.8;

    this.m_globalTitle = new rune.text.BitmapField("TOTAL");
    this.m_roundTitle = new rune.text.BitmapField("TURN");

    var globalTimerCenterX = this.totalTimeBar.x + this.totalTimeBar.width * this.totalTimeBar.scaleX / 2;
    var roundTimerCenterX = this.roundTimeBar.x + this.roundTimeBar.width * this.roundTimeBar.scaleX / 2;

    this.m_timeString.centerX += 14;
    this.m_timeString.centerY = 25;
    this.m_roundTimeString.centerX += 20;
    this.m_roundTimeString.centerY = 25;

    this.m_globalTitle.centerY = 14;
    this.m_globalTitle.centerX += 14;

    this.m_roundTitle.centerY = 14;
    this.m_roundTitle.centerX += 14;

    // add bars first, text second
    this.m_globalTimerContainer.addChild(this.totalTimeBar);
    this.m_globalTimerContainer.addChild(this.m_timeString);
    this.m_globalTimerContainer.addChild(this.m_globalTitle);

    this.m_roundTimerContainer.addChild(this.roundTimeBar);
    this.m_roundTimerContainer.addChild(this.m_roundTimeString);
    this.m_roundTimerContainer.addChild(this.m_roundTitle);

    this.m_cloud1 = new rune.display.Sprite(80, 8, 96, 48, "cloud");
    this.m_cloud2 = new rune.display.Sprite(180, 25, 96, 48, "cloud");
    this.m_cloud3 = new rune.display.Sprite(30, 80, 96, 48, "cloud");
    this.m_cloud4 = new rune.display.Sprite(350, 140, 96, 48, "cloud");

    this.m_cloud1.resetX = 420;
    this.m_cloud2.resetX = 620;
    this.m_cloud3.resetX = 520;
    this.m_cloud4.resetX = 720;

    this.m_cloud1.duration = 45000;
    this.m_cloud2.duration = 60000;
    this.m_cloud3.duration = 40000;
    this.m_cloud4.duration = 35000;

    this.stage.addChild(this.m_cloud1);
    this.stage.addChild(this.m_cloud2);
    this.stage.addChild(this.m_cloud3);
    this.stage.addChild(this.m_cloud4);

    this.m_animateClouds([this.m_cloud1, this.m_cloud2, this.m_cloud3, this.m_cloud4]);

    this.m_lavaController = new TerraTactics.scene.LavaController(this);
    this.m_lava = this.m_lavaController.lava;

    this.m_artboard = new rune.display.Artboard(0, 0, 400, 225);
    this.m_camera.addChild(this.m_artboard);

    this.m_weaponSelector = new TerraTactics.scene.WeaponSelector(this);

    this.m_mouseX = 0;
    this.m_mouseY = 0;
    this.m_isAiming = false;
    this.m_aimInput = null;
    this.m_aimTargetX = 0;
    this.m_aimTargetY = 0;

    window.addEventListener("mousemove", function (e) {
        this.m_mouseX = e.offsetX * (400 / e.target.clientWidth);
        this.m_mouseY = e.offsetY * (225 / e.target.clientHeight);

        if (this.m_aimInput === "mouse") {
            this.m_beginAim("mouse", this.m_mouseX, this.m_mouseY);
        }
    }.bind(this));

    window.addEventListener("mousedown", function (e) {
        if (this.m_gameEnd === true) {
            return;
        }

        if (this.m_projectiles.m_hasProjectile()) {
            return;
        }

        this.m_mouseX = e.offsetX * (400 / e.target.clientWidth);
        this.m_mouseY = e.offsetY * (225 / e.target.clientHeight);

        var point = new rune.geom.Point(this.m_mouseX, this.m_mouseY);
        if (this.m_weaponSelector.m_clickAt(point)) {
            this.m_cancelAim();
            return;
        }

        this.m_beginAim("mouse", this.m_mouseX, this.m_mouseY);
    }.bind(this));

    window.addEventListener("mouseup", function () {
        if (this.m_aimInput === "mouse") {
            this.m_fireAim();
        }
    }.bind(this));

    this.m_bullet = null;
    this.m_projectiles = new TerraTactics.scene.ProjectileManager(this);

    this.m_powerUps = new TerraTactics.scene.PowerUps(this);

    this.m_characters = new TerraTactics.scene.Characters(this.stage, this.m_roles);

    //add healthbars to stage
    for (var playerId in this.m_characters.m_players) {
        var player = this.m_characters.m_players[playerId];
        var healthBar = player.healthBar;


        this.m_camera.addChild(healthBar);
        this.m_camera.addChild(healthBar.m_healthBar);
    }

    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayers = this.m_characters.getInactive();

    this.m_selectWeapon("pistol");
    this.m_updateAttackCooldowns();

    this.m_counter = 0;

    this.m_roundTimer = null;

    this.m_gameEnd = false;
    this.m_gameOverLoaded = false;

    this.m_playerControls = {
        player1: new TerraTactics.util.Controls(0),
        player2: new TerraTactics.util.Controls(1)
    };

    this.m_controls = this.m_playerControls.player1;
    this.m_gamepadAimController = new TerraTactics.scene.GamepadAimController(this);
    this.m_playerInputController = new TerraTactics.scene.PlayerInputController(this);

    this.m_currentPlayerText = null;

    console.log(this.stage.m_map);

    //add arrows to characters
    this.m_activeArrow = new rune.display.Sprite(0, 0, 32, 32, "arrow");
    this.m_activeArrow.scaleX = 0.3;
    this.m_activeArrow.scaleY = 0.3;

    this.m_bounceValue = { y: 0 };

    this.tweens.create({
        target: this.m_bounceValue,
        scope: this,
        duration: 300,
        behavior: rune.tween.Tween.REVERSE,
        cycles: Infinity,
        args: {
            y: -2
        }
    });

    this.m_camera.addChild(this.m_activeArrow);

    // this.test = new rune.display.Sprite(50, 50, 96, 48, "playgame");
    //   this.test.animation.create("idle", [0, 1, 2], 6, true);
    //  this.stage.addChild(this.test); 

    this.m_explosionGraphic = new rune.display.Sprite(0, -50, 24, 24, "grenadeexplosion");
    this.m_explosionGraphic.animation.create("idle", [0, 1, 2], 3, true);
    this.m_explosionGraphic.scaleX = 1.5;
    this.m_explosionGraphic.scaleY = 1.5;

    this.m_startRoundTimer();
    this.m_updateAttackCooldowns();
    this.m_selectWeapon("pistol");
};

TerraTactics.scene.Game.prototype.getCoordinatesForPowerUp = function (tempX) {
    var tileX = Math.floor(tempX / this.stage.m_map.tileWidth);
    var width = this.stage.m_map.widthInTiles;
    var height = this.stage.m_map.heightInTiles;

    if (tileX < 0 || tileX >= width) {
        return null;
    }

    for (var i = 0; i < height; i++) {
        var index = i * width + tileX;
        var value = this.stage.m_map.front.getTileValueAt(index);

        if (value > 0) {
            return { x: tempX };
        }
    }
    return null;
};

TerraTactics.scene.Game.prototype.m_animateClouds = function (clouds, isReset) {
    if (!Array.isArray(clouds)) {
        cloud = clouds;
        if (isReset) {
            cloud.x = cloud.resetX;
        }

        this.tweens.create({
            target: clouds,
            scope: this,
            duration: cloud.duration,
            easing: rune.tween.Linear.easeIn,
            onDispose: function () {
                this.m_animateClouds(clouds, true);
            },
            args: {
                x: -clouds.width
            }
        });

        return;
    }

    clouds.forEach(function (cloud) {
        cloud.animation.create("idle", [0, 1, 2], 1, true);
        cloud.animation.play("idle");

        this.m_animateClouds(cloud, false);
    }, this);
};

TerraTactics.scene.Game.prototype.m_getActiveControls = function () {
    if (this.m_activePlayer == null) {
        return this.m_playerControls.player1;
    }

    return this.m_playerControls[this.m_activePlayer.id] || this.m_playerControls.player1;
};

TerraTactics.scene.Game.prototype.m_padNumber = function (number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number.toString();
    }
};

TerraTactics.scene.Game.prototype.m_selectWeapon = function (weapon) {
    this.m_weaponSelector.m_selectWeapon(weapon);
};

TerraTactics.scene.Game.prototype.m_getWeaponIndex = function (weapon) {
    return this.m_weaponSelector.m_getWeaponIndex(weapon);
};

TerraTactics.scene.Game.prototype.m_selectWeaponAt = function (index, direction) {
    this.m_weaponSelector.m_selectWeaponAt(index, direction);
};

TerraTactics.scene.Game.prototype.m_updateAttackCooldowns = function () {
    this.m_weaponSelector.m_updateAttackCooldowns();
};

TerraTactics.scene.Game.prototype.m_fireActiveWeapon = function (targetX, targetY) {
    this.m_projectiles.m_fireActiveWeapon(targetX, targetY);
};

TerraTactics.scene.Game.prototype.m_getActiveWeapon = function () {
    var weapon = null;
    var weaponName = null;

    if (this.m_activePlayer == null || this.m_activePlayer.character == null) {
        return null;
    }

    weaponName = this.m_activePlayer.character.weapon;
    weapon = TerraTactics.data.Weapons[weaponName];

    return weapon || null;
};

TerraTactics.scene.Game.prototype.m_canAim = function () {
    if (this.m_activePlayer != null &&
        this.m_activePlayer.character != null &&
        this.m_activePlayer.character.m_health > 0 &&
        !this.m_projectiles.m_hasProjectile()) {
        return true;
    }
    return false;
};

TerraTactics.scene.Game.prototype.m_beginAim = function (input, targetX, targetY) {
    if (!this.m_canAim()) {
        return;
    }

    this.m_isAiming = true;
    this.m_aimInput = input;

    if (input === "mouse") {
        this.m_aimTargetX = Math.max(0, Math.min(400, targetX));
        this.m_aimTargetY = Math.max(0, Math.min(225, targetY));
    } else {
        this.m_aimTargetX = targetX;
        this.m_aimTargetY = targetY;
    }
};

TerraTactics.scene.Game.prototype.m_cancelAim = function () {
    this.m_isAiming = false;
    this.m_aimInput = null;
};

TerraTactics.scene.Game.prototype.m_fireAim = function () {
    if (this.m_isAiming) {
        this.m_fireActiveWeapon(this.m_aimTargetX, this.m_aimTargetY);
    }

    this.m_cancelAim();
};
TerraTactics.scene.Game.prototype.m_updateGamepadAim = function () {
    this.m_gamepadAimController.update();
};

TerraTactics.scene.Game.prototype.m_updateWeaponUiInput = function () {
    if (this.m_projectiles.m_hasProjectile()) {
        return;
    }

    if (this.m_controls.firePressed) {
        this.m_fireAim();
        return;
    }

    this.m_weaponSelector.m_updateInput(this.m_controls);
};

TerraTactics.scene.Game.prototype.m_updatePlayerInput = function () {
    this.m_playerInputController.update();
};

TerraTactics.scene.Game.prototype.m_startRoundTimer = function () {
    if (this.m_roundTimer !== null) {
        this.timers.remove(this.m_roundTimer);
        this.m_roundTimer = null;
    }

    this.m_roundTime = 10;
    this.m_roundTimeString.text = this.m_padNumber(this.m_roundTime);

    this.m_roundTimer = this.timers.create({
        duration: 1000,
        repeat: 10,
        onTick: function () {
            this.m_roundTime--;
            this.m_roundTimeString.text = this.m_padNumber(this.m_roundTime);
            if (this.m_roundTime <= 3 && this.m_roundTime > 0) {
                this.m_tick3SecSound.play();
            }
        },
        onComplete: this.m_onRoundTimerComplete,
        scope: this
    });


};

TerraTactics.scene.Game.prototype.m_onRoundTimerComplete = function () {
    this.m_tick3SecSound.stop();
    this.m_roundTimer = null;

    if (!this.m_projectiles.m_hasProjectile()) {
        this.m_endTurn();
    }
};

TerraTactics.scene.Game.prototype.m_endTurn = function () {
    if (this.m_tick3SecSound !== null) {
        this.m_tick3SecSound.stop();
    }

    if (this.m_gameEnd === true) {
        return;
    }

    this.m_turnChangeSound.play();
    this.m_cancelAim();
    this.m_characters.switchTurn();
    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayers = this.m_characters.getInactive();
    this.m_startRoundTimer();
    this.m_updateAttackCooldowns();
    this.m_selectWeapon("pistol");

    var randomType = Math.floor(Math.random() * 2);
    var types = ["health", "speed"];
    this.m_powerUps.m_resetPowerUps(this.m_activePlayer.character,
        this.m_inActivePlayers[0].character);
    this.m_powerUps.m_spawnPowerUp(types[randomType]);
};

TerraTactics.scene.Game.prototype.m_drawArc = function (source) {
    if (source === null || source.m_health <= 0 || !this.m_isAiming) {
        return;
    }

    var weapon = this.m_getActiveWeapon();

    if (weapon === null) {
        return;
    }

    if (source.weapon === "melee") {
        this.m_artboard.canvas.drawArc(
            source.centerX,
            source.centerY,
            15,
            0,
            Math.PI * 2,
            "#ffcc00",
            2,
            false
        );

        return;
    }

    var projectile = weapon.m_getProjectileData(source, this.m_aimTargetX, this.m_aimTargetY);
    var x = projectile.x;
    var y = projectile.y;
    var vx = projectile.vx;
    var vy = projectile.vy;

    for (var i = 0; i < 20; i++) {
        if (i % 2 === 0) {
            this.m_artboard.canvas.drawLine(x, y, x + vx, y + vy, "#ffcc00", 2, 1);
        }
        x += vx;
        y += vy;
        vy += TerraTactics.scene.Bullet.GRAVITY;
    }
};

TerraTactics.scene.Game.prototype.m_displayWinner = function (text) {
    if (this.m_globalTimer !== null) {
        this.timers.remove(this.m_globalTimer);
        this.m_globalTimer = null;
    }
    if (this.m_roundTimer !== null) {
        this.timers.remove(this.m_roundTimer);
        this.m_roundTimer = null;
    }

    this.m_weaponSelector.m_remove();

    var winnerText = new rune.text.BitmapField(text);

    winnerText.centerX = 200;
    winnerText.centerY = 112;
    winnerText.scaleX = 2;
    winnerText.scaleY = 2;

    this.stage.addChild(winnerText);
};

TerraTactics.scene.Game.prototype.m_updateArrow = function () {
    if (this.m_activePlayer != null && this.m_activePlayer.character != null) {
        this.m_activeArrow.centerX = this.m_activePlayer.character.centerX;
        this.m_activeArrow.centerY = this.m_activePlayer.character.centerY - 38 + this.m_bounceValue.y;
    }
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
TerraTactics.scene.Game.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_artboard.canvas.clear();
    this.m_updateArrow();

    if (this.m_gameEnd === true) {
        this.m_tick3SecSound.stop();
        this.m_turnChangeSound.stop();
        if (!this.m_gameOverLoaded) {
            this.application.scenes.load([new TerraTactics.scene.GameOverMenu(this.m_characters.winnerText)]);
        }
        this.m_gameOverLoaded = true;
        return;
    }

    if (this.m_characters.winnerText !== null) {
        this.m_displayWinner(this.m_characters.winnerText);
        if (this.m_activePlayer != null && this.m_activePlayer.character != null) {
            this.m_activePlayer.character.m_grounded = true;
        }

        for (var i = 0; i < this.m_inActivePlayers.length; i++) {
            if (this.m_inActivePlayers[i].character !== null) {
                this.m_inActivePlayers[i].character.m_grounded = true;
            }
        }

        this.m_gameEnd = true;
        return;
    }

    this.m_controls = this.m_getActiveControls();
    this.m_updateGamepadAim();
    this.m_updatePlayerInput();
    this.m_updateWeaponUiInput();

    if (this.m_isAiming && this.m_activePlayer != null &&
        this.m_activePlayer.character != null) {
        this.m_drawArc(this.m_activePlayer.character);
    }

    this.m_projectiles.update(this.m_inActivePlayers);

    this.m_lavaController.m_checkCollisions(this.m_activePlayer, this.m_inActivePlayers);

    var oldActivePlayer = this.m_activePlayer;

    this.m_powerUps.update(this.stage.m_map.front, this.m_activePlayer);

    this.m_characters.update(this.stage.m_map.front);

    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayers = this.m_characters.getInactive();

    if (this.m_activePlayer != null &&
        this.m_activePlayer.character != null &&
        this.m_activePlayer.character.m_grounded) {
        this.m_counter = 0;
    }

    if (this.m_activeArrow !== null && oldActivePlayer !== null)
        if (this.m_activePlayer !== oldActivePlayer) {
            this.m_startRoundTimer();
            this.m_selectWeapon("pistol");
            this.m_updateAttackCooldowns();
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
TerraTactics.scene.Game.prototype.dispose = function () {
    this.m_themeMusic.stop();
    rune.scene.Scene.prototype.dispose.call(this);
};
