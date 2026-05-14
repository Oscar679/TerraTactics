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
TerraTactics.scene.Game = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
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
    console.log(rune.display.Graphic);
    this.bg = new rune.display.Graphic(0, 0, 400, 225, "game_bg");
    this.stage.addChild(this.bg);

    // load tilemap
    this.stage.m_map.load("map");

    this.m_tiles = [];

    var map = this.stage.m_map;
    var frontLayer = map.front;

    for (var i = 0; i < frontLayer.data.length; i++) {
        var tileValue = frontLayer.getTileValueAt(i);

        if (tileValue <= 0) {
            continue;
        }

        var properties = map.getTilePropertiesOf(tileValue);

        if (properties === null) {
            continue;
        }

        var tileX = i % map.widthInTiles * map.tileWidth;
        var tileY = Math.floor(i / map.widthInTiles) * map.tileHeight;

        if (properties.leftEdge) {
            this.m_tiles.push(new rune.display.InteractiveObject(tileX, tileY, 3, 16));
        }

        if (properties.rightEdge) {
            this.m_tiles.push(new rune.display.InteractiveObject(tileX + 13, tileY, 3, 16));
        }

        if (properties.bottomEdge) {
            this.m_tiles.push(new rune.display.InteractiveObject(tileX, tileY, 16, 8));
        }
    }

    this.m_lava = new rune.display.Sprite(0, 225, 400, 2000, "lava");
    this.stage.addChild(this.m_lava);

    this.tweens.create({
        target: this.m_lava,
        scope: this,
        duration: 700000,
        easing: rune.tween.Linear.easeIn,
        args: {
            y: -225
        }
    });

    this.m_artboard = new rune.display.Artboard(0, 0, 400, 225);
    this.stage.addChild(this.m_artboard);

    var selectWeapon = this.m_selectWeapon.bind(this);

    this.m_attacks = new rune.display.DisplayGroup(this.stage);

    this.attack1 = new TerraTactics.scene.Attacks(110, 180, "pistol", selectWeapon);
    this.attack2 = new TerraTactics.scene.Attacks(165, 180, "rifle", selectWeapon);
    this.attack3 = new TerraTactics.scene.Attacks(220, 180, "grenade", selectWeapon);
    this.attack4 = new TerraTactics.scene.Attacks(275, 180, "melee", selectWeapon);

    this.m_attacks.addMember(this.attack1);
    this.m_attacks.addMember(this.attack2);
    this.m_attacks.addMember(this.attack3);
    this.m_attacks.addMember(this.attack4);

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
        this.m_mouseX = e.offsetX * (400 / e.target.clientWidth);
        this.m_mouseY = e.offsetY * (225 / e.target.clientHeight);

        var point = new rune.geom.Point(this.m_mouseX, this.m_mouseY);
        var clickedAttack = null;

        this.m_attacks.forEachMember(function (attack) {
            if (clickedAttack === null && attack.hitTestPoint(point)) {
                clickedAttack = attack;
            }
        });

        if (clickedAttack !== null) {
            clickedAttack.m_click();
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

    this.m_characters = new TerraTactics.scene.Characters(this.stage);

    //add healthbars to stage
    for (var playerId in this.m_characters.m_players) {
        var player = this.m_characters.m_players[playerId];
        var healthBar = player.healthBar;
        healthBar.scaleX = 0.3;
        healthBar.scaleY = 0.3;


        this.stage.addChild(healthBar);
        this.stage.addChild(healthBar.m_healthBar);
    }

    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayers = this.m_characters.getInactive();

    this.m_selectWeapon("pistol");

    this.m_counter = 0;

    this.m_roundTimer = null;

    this.m_gameEnd = false;

    this.m_controls = new TerraTactics.util.Controls(0);
    this.m_weaponNames = ["pistol", "rifle", "grenade", "melee"];
    this.m_selectedAttackIndex = 0;

    this.m_currentPlayerText = null;


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
            console.log('1 second passed');

            this.m_second = this.m_time % 60;
            this.m_minute = Math.floor(this.m_time / 60);

            this.m_timeString.text = this.m_padNumber(this.m_minute) + ":" + this.m_padNumber(this.m_second);
        },
        scope: this
    });

    // create containers
    this.m_timerContainer = new rune.display.DisplayObjectContainer(246, 8, 190, 148);
    this.m_globalTimerContainer = new rune.display.DisplayObjectContainer(90, 0, 96, 48);
    this.m_roundTimerContainer = new rune.display.DisplayObjectContainer(30, 0, 96, 48);

    // create time bars
    this.totalTimeBar = new TerraTactics.scene.TimeBar(0, 0);
    this.roundTimeBar = new TerraTactics.scene.TimeBar(0, 0);

    // add containers
    this.stage.addChild(this.m_timerContainer);
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

    this.stage.addChild(this.m_activeArrow);

    // this.test = new rune.display.Sprite(50, 50, 96, 48, "playgame");
    //   this.test.animation.create("idle", [0, 1, 2], 6, true);
    //  this.stage.addChild(this.test);

    this.m_startRoundTimer();
};

TerraTactics.scene.Game.prototype.m_padNumber = function (number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number.toString();
    }
};

TerraTactics.scene.Game.prototype.m_selectWeapon = function (weapon) {
    var previousWeapon = null;
    var selectedWeapon = null;

    if (this.m_weaponNames !== null && this.m_weaponNames !== undefined) {
        this.m_selectedAttackIndex = this.m_getWeaponIndex(weapon);
    }

    if (this.m_activePlayer !== null &&
        this.m_activePlayer.character !== null &&
        this.m_activePlayer.character !== undefined) {
        previousWeapon = this.m_activePlayer.character.m_getWeapon();
        this.m_activePlayer.character.m_setWeapon(weapon);

        if (previousWeapon !== weapon) {
            selectedWeapon = this.m_getActiveWeapon();

            if (selectedWeapon !== null && typeof selectedWeapon.m_playSwitchSound === "function") {
                selectedWeapon.m_playSwitchSound();
            }
        }
    }

    this.m_attacks.forEachMember(function (attack) {
        attack.m_selected(attack.m_weapon === weapon);
    });
};

TerraTactics.scene.Game.prototype.m_getWeaponIndex = function (weapon) {
    for (var i = 0; i < this.m_weaponNames.length; i++) {
        if (this.m_weaponNames[i] === weapon) {
            return i;
        }
    }

    return 0;
};

TerraTactics.scene.Game.prototype.m_selectWeaponAt = function (index) {
    if (index < 0) {
        index = this.m_weaponNames.length - 1;
    }

    if (index >= this.m_weaponNames.length) {
        index = 0;
    }

    this.m_selectedAttackIndex = index;
    this.m_selectWeapon(this.m_weaponNames[this.m_selectedAttackIndex]);
};

TerraTactics.scene.Game.prototype.m_fireActiveWeapon = function (targetX, targetY) {
    var weapon = null;

    if (this.m_activePlayer === null ||
        this.m_activePlayer.character === null ||
        this.m_bullet !== null) {
        return;
    }

    weapon = this.m_activePlayer.character.m_getWeapon();

    if (this.m_activePlayer.character.m_canFire(weapon)) {
        this.m_bullet = this.m_activePlayer.character.m_fireProjectile(targetX, targetY);
        this.m_activePlayer.character.m_setCooldown(weapon);
        this.stage.addChild(this.m_bullet);
    }
};

TerraTactics.scene.Game.prototype.m_getActiveWeapon = function () {
    var weapon = null;
    var weaponName = null;

    if (this.m_activePlayer === null || this.m_activePlayer.character === null) {
        return null;
    }

    weaponName = this.m_activePlayer.character.m_getWeapon();
    weapon = TerraTactics.data.Weapons[weaponName];

    return weapon || null;
};

TerraTactics.scene.Game.prototype.m_canAim = function () {
    if (this.m_activePlayer !== null &&
        this.m_activePlayer.character !== null &&
        this.m_activePlayer.character.m_health > 0 &&
        this.m_bullet === null) {
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
    this.m_aimTargetX = Math.max(0, Math.min(400, targetX));
    this.m_aimTargetY = Math.max(0, Math.min(225, targetY));
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
    var aimLength = 90;
    var aimX = this.m_controls.aimX;
    var aimY = this.m_controls.aimY;

    if (this.m_aimInput === "mouse") {
        return;
    }

    if (!this.m_canAim()) {
        if (this.m_aimInput === "gamepad") {
            this.m_cancelAim();
        }

        return;
    }

    if (this.m_controls.aiming) {
        this.m_beginAim(
            "gamepad",
            this.m_activePlayer.character.centerX + aimX * aimLength,
            this.m_activePlayer.character.centerY + aimY * aimLength
        );
    } else if (this.m_aimInput === "gamepad") {
        this.m_cancelAim();
    }
};

TerraTactics.scene.Game.prototype.m_updateWeaponUiInput = function () {
    if (this.m_controls.firePressed) {
        this.m_fireAim();
        return;
    }

    if (this.m_controls.weaponPrevious) {
        this.m_selectWeaponAt(this.m_selectedAttackIndex - 1);
    }

    if (this.m_controls.weaponNext) {
        this.m_selectWeaponAt(this.m_selectedAttackIndex + 1);
    }

    if (this.m_controls.weaponOne) {
        this.m_selectWeaponAt(0);
    }

    if (this.m_controls.weaponTwo) {
        this.m_selectWeaponAt(1);
    }

    if (this.m_controls.weaponThree) {
        this.m_selectWeaponAt(2);
    }

    if (this.m_controls.weaponFour) {
        this.m_selectWeaponAt(3);
    }

    if (this.m_controls.confirm) {
    }
};

TerraTactics.scene.Game.prototype.m_updatePlayerInput = function () {
    this.m_activePlayer.character.m_movingLeft = false;
    this.m_activePlayer.character.m_movingRight = false;

    if (this.m_controls.left) {
        this.m_activePlayer.character.x -= 1;
        this.m_activePlayer.character.m_movingLeft = true;
        this.m_activePlayer.character.flippedX = true;
    }

    if (this.m_controls.right) {
        this.m_activePlayer.character.x += 1;
        this.m_activePlayer.character.m_movingRight = true;
        this.m_activePlayer.character.flippedX = false;
    }

    if (this.m_controls.jump && this.m_counter < 2) {
        this.m_activePlayer.character.m_velocityY = -this.m_activePlayer.character.m_jumpStrength;
        this.m_activePlayer.character.m_grounded = false;
        this.m_counter++;
        this.m_activePlayer.character.m_isJumping = true;
        this.m_characters.m_playJumpSound();
    }
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
        },
        onComplete: this.m_onRoundTimerComplete,
        scope: this
    });


};

TerraTactics.scene.Game.prototype.m_onRoundTimerComplete = function () {
    this.m_roundTimer = null;
    this.m_endTurn();
};

TerraTactics.scene.Game.prototype.m_endTurn = function () {
    this.m_cancelAim();
    this.m_characters.switchTurn();

    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayers = this.m_characters.getInactive();

    this.m_startRoundTimer();
    this.m_selectWeapon("pistol");
};

TerraTactics.scene.Game.prototype.m_fireProjectile = function (player, x, y) {
    this.stage.addChild(this.m_bullet);
};

TerraTactics.scene.Game.prototype.m_knockback = function (player, source) {
    console.log(source);
    if (player.centerX < source.centerX) {
        player.x -= source.m_knockback;
    } else {
        player.x += source.m_knockback;
    }
    player.m_grounded = false;
    player.m_velocityY = -2;
};

TerraTactics.scene.Game.prototype.m_drawArc = function (source) {
    if (source === null || source.m_health <= 0 || !this.m_isAiming) {
        return;
    }

    var weapon = this.m_getActiveWeapon();

    if (weapon === null) {
        return;
    }

    var projectile = weapon.m_getProjectileData(source, this.m_aimTargetX, this.m_aimTargetY);
    var x = projectile.x;
    var y = projectile.y;
    var vx = projectile.vx;
    var vy = projectile.vy;

    for (var i = 0; i < 20; i++) {
        this.m_artboard.canvas.drawLine(x, y, x + vx, y + vy, "#ffcc00", 2, 1);

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

    this.m_attacks.removeMembers(this.m_attacks.members);

    var winnerText = new rune.text.BitmapField(text);

    winnerText.centerX = 200;
    winnerText.centerY = 112;
    winnerText.scaleX = 2;
    winnerText.scaleY = 2;

    this.stage.addChild(winnerText);
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

    this.m_activeArrow.centerX = this.m_activePlayer.character.centerX;
    this.m_activeArrow.centerY = this.m_activePlayer.character.centerY - 38 + this.m_bounceValue.y;

    if (this.m_gameEnd === true) {
        return;
    }

    if (this.m_characters.getWinnerText() !== null) {
        this.m_displayWinner(this.m_characters.getWinnerText());
        if (this.m_activePlayer !== null && this.m_activePlayer.character !== null) {
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

    if (this.m_activePlayer === null || this.m_activePlayer.character === null) {
        this.m_cancelAim();
        return;
    }

    this.m_updateGamepadAim();
    this.m_updatePlayerInput();
    this.m_updateWeaponUiInput();

    if (this.m_isAiming) {
        this.m_drawArc(this.m_activePlayer.character);
    }

    if (this.m_bullet !== null) {
        if (this.m_bullet.hitTest(this.m_tiles)) {
            console.log('hit');
            this.stage.removeChild(this.m_bullet);
            this.m_bullet = null;

            this.m_endTurn();
        }
    }

    if (this.m_bullet !== null) {
        for (var i = 0; i < this.m_inActivePlayers.length; i++) {
            if (this.m_inActivePlayers[i].character !== null && this.m_bullet.hitTest(this.m_inActivePlayers[i].character)) {
                this.m_characters.m_damageTaken(this.m_inActivePlayers[i].character, this.m_bullet.m_damage);
                this.m_knockback(this.m_inActivePlayers[i].character, this.m_bullet);
                this.stage.removeChild(this.m_bullet);
                this.m_bullet = null;
                this.m_endTurn();
                break;
            }
        }
    }

    // if bullet goes outside of screen, its disposed, and turn switched
    if (this.m_bullet !== null) {
        if (
            this.m_bullet.x < 0 ||
            this.m_bullet.x > 400 ||
            this.m_bullet.y < 0 ||
            this.m_bullet.y > 225
        ) {
            this.stage.removeChild(this.m_bullet);
            this.m_bullet = null;
            this.m_endTurn();
        }
    }

    if (this.m_activePlayer !== null && this.m_activePlayer.character !== null) {
        if (this.m_activePlayer.character.bottom >= this.m_lava.top) {
            console.log(this.m_activePlayer.character.bottom, this.m_lava.top);
            this.m_activePlayer.character.m_isTouchingLava = true;
            this.m_activePlayer.character.m_health = 0;
        }
    }

    for (var i = 0; i < this.m_inActivePlayers.length; i++) {
        if (this.m_inActivePlayers[i].character !== null) {
            if (this.m_inActivePlayers[i].character.bottom >= this.m_lava.top) {
                this.m_inActivePlayers[i].character.m_isTouchingLava = true;
                this.m_inActivePlayers[i].character.m_health = 0;
            }
        }
    }

    var oldActivePlayer = this.m_activePlayer;

    this.m_characters.update(this.stage.m_map.front);

    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayers = this.m_characters.getInactive();

    if (this.m_activePlayer !== null &&
        this.m_activePlayer.character !== null &&
        this.m_activePlayer.character.m_grounded) {
        this.m_counter = 0;
    }

    if (this.m_activePlayer !== oldActivePlayer) {
        this.m_startRoundTimer();
        this.m_selectWeapon("pistol");
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
    rune.scene.Scene.prototype.dispose.call(this);
};
