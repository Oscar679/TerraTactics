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
    console.log(this.stage.m_map.m_bufferB.m_tmpTile);

    this.m_artboard = new rune.display.Artboard(0, 0, 400, 225);
    this.stage.addChild(this.m_artboard);

    var selectWeapon = this.m_selectWeapon.bind(this);

    this.m_attacks = new rune.display.DisplayGroup(this.stage);

    this.attack1 = new TerraTactics.scene.Attacks(130, 10, "pistol", selectWeapon);
    this.attack2 = new TerraTactics.scene.Attacks(165, 10, "rifle", selectWeapon);
    this.attack3 = new TerraTactics.scene.Attacks(200, 10, "grenade", selectWeapon);
    this.attack4 = new TerraTactics.scene.Attacks(235, 10, "melee", selectWeapon);
    console.log(this.m_attacks);
    this.m_attacks.addMember(this.attack1);
    this.m_attacks.addMember(this.attack2);
    this.m_attacks.addMember(this.attack3);
    this.m_attacks.addMember(this.attack4);
    console.log(this.m_attacks);

    this.m_attacksVisible = false;

    //load characters hp bars

    this.m_mouseDown = false;
    this.m_mouseX = 0;
    this.m_mouseY = 0;

    window.addEventListener("mousemove", function (e) {
        this.m_mouseX = e.offsetX * (400 / e.target.clientWidth);
        this.m_mouseY = e.offsetY * (225 / e.target.clientHeight);
    }.bind(this));

    window.addEventListener("mousedown", function (e) {
        this.m_mouseX = e.offsetX * (400 / e.target.clientWidth);
        this.m_mouseY = e.offsetY * (225 / e.target.clientHeight);

        var point = new rune.geom.Point(this.m_mouseX, this.m_mouseY);
        var clickedAttack = null;

        if (this.m_attacksVisible) {
            this.m_attacks.forEachMember(function (attack) {
                if (clickedAttack === null && attack.hitTestPoint(point)) {
                    clickedAttack = attack;
                }
            });
        }

        if (clickedAttack !== null) {
            clickedAttack.m_click();
            this.m_mouseDown = false;
            return;
        }

        if (this.m_activePlayer.character !== null && this.m_bullet === null) {
            this.m_mouseDown = true;
        }
    }.bind(this));

    window.addEventListener("mouseup", function () {
        // im thinking i'll add animation/drawing for the bullet here?
        if (this.m_mouseDown) {
            this.m_fireActiveWeapon(this.m_mouseX, this.m_mouseY);
        }

        this.m_mouseDown = false;
    }.bind(this));

    this.m_bullet = null;

    this.m_characters = new TerraTactics.scene.Characters(this.stage);

    //add healthbars to stage
    for (var playerId in this.m_characters.m_players) {
        var player = this.m_characters.m_players[playerId];
        var healthBar = player.healthBar;
        healthBar.scaleX = 0.6;
        healthBar.scaleY = 0.40;

        this.stage.addChild(healthBar);
    }


    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayers = this.m_characters.getInactive();

    this.m_selectWeapon("pistol");

    this.m_counter = 0;

    this.m_roundTimer = null;

    this.m_gameEnd = false;

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

    this.m_hideUi();

    this.m_controls = new TerraTactics.util.Controls(0);
    this.m_weaponNames = ["pistol", "rifle", "grenade", "melee"];
    this.m_selectedAttackIndex = 0;
    this.m_gamepadAiming = false;

    this.m_currentPlayerText = null;

    this.m_updateActivePlayerText();

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
    this.m_globalTimerContainer = new rune.display.DisplayObjectContainer(80, 0, 96, 48);
    this.m_roundTimerContainer = new rune.display.DisplayObjectContainer(0, 0, 96, 48);

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
    if (this.m_activePlayer.character !== null && this.m_activePlayer.character !== undefined) {
        this.m_activePlayer.character.m_setWeapon(weapon);
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

TerraTactics.scene.Game.prototype.m_toggleAttackUi = function () {
    this.m_attacksVisible = !this.m_attacksVisible;
    this.m_mouseDown = false;
    this.m_gamepadAiming = false;

    if (this.m_attacksVisible) {
        this.m_selectedAttackIndex = this.m_getWeaponIndex(this.m_activePlayer.character.m_getWeapon());
        this.m_selectWeaponAt(this.m_selectedAttackIndex);
        // this.m_moveUi();
    } else {
        //this.m_hideUi();
    }
};

TerraTactics.scene.Game.prototype.m_fireActiveWeapon = function (targetX, targetY) {
    var weapon = null;

    if (this.m_activePlayer === null || this.m_bullet !== null) {
        return;
    }

    weapon = this.m_activePlayer.character.m_getWeapon();

    if (this.m_activePlayer.character.m_canFire(weapon)) {
        this.m_bullet = this.m_activePlayer.character.m_fireProjectile(targetX, targetY);
        this.m_activePlayer.character.m_setCooldown(weapon);
        this.stage.addChild(this.m_bullet);
    }
};

TerraTactics.scene.Game.prototype.m_updateGamepadAim = function () {
    var aimLength = 90;
    var aimX = this.m_controls.aimX;
    var aimY = this.m_controls.aimY;
    var isAiming = Math.abs(aimX) > TerraTactics.util.MappingGamepad.AIM_DEADZONE ||
        Math.abs(aimY) > TerraTactics.util.MappingGamepad.AIM_DEADZONE;

    this.m_gamepadAiming = false;

    if (isAiming && this.m_activePlayer.character !== null && this.m_bullet === null) {
        this.m_mouseX = Math.max(0, Math.min(400, this.m_activePlayer.character.centerX + aimX * aimLength));
        this.m_mouseY = Math.max(0, Math.min(225, this.m_activePlayer.character.centerY + aimY * aimLength));
        this.m_gamepadAiming = true;
    }
};

TerraTactics.scene.Game.prototype.m_updateWeaponUiInput = function () {
    if (this.m_controls.firePressed) {
        //    this.m_hideUi();
        if (this.m_mouseDown || this.m_gamepadAiming) {
            this.m_fireActiveWeapon(this.m_mouseX, this.m_mouseY);
        }
        this.m_mouseDown = false;
        this.m_gamepadAiming = false;
        return;
    }

    if (this.m_controls.justLeft) {
        this.m_selectWeaponAt(this.m_selectedAttackIndex - 1);
    }

    if (this.m_controls.justRight) {
        this.m_selectWeaponAt(this.m_selectedAttackIndex + 1);
    }

    if (this.m_controls.weaponOne) {
        this.m_selectWeaponAt(0);
        //      this.m_hideUi();
    }

    if (this.m_controls.weaponTwo) {
        this.m_selectWeaponAt(1);
        //    this.m_hideUi();
    }

    if (this.m_controls.weaponThree) {
        this.m_selectWeaponAt(2);
        //   this.m_hideUi();
    }

    if (this.m_controls.weaponFour) {
        this.m_selectWeaponAt(3);
        //   this.m_hideUi();
    }

    if (this.m_controls.confirm) {
        ///   this.m_hideUi();
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
    }

    if (this.m_controls.firePressed) {
        if (this.m_mouseDown || this.m_gamepadAiming) {
            this.m_fireActiveWeapon(this.m_mouseX, this.m_mouseY);
        }
        this.m_mouseDown = false;
        this.m_gamepadAiming = false;
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
    this.m_mouseDown = false;
    this.m_gamepadAiming = false;
    this.m_characters.switchTurn();

    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayers = this.m_characters.getInactive();

    this.m_updateActivePlayerText();
    this.m_startRoundTimer();
    this.m_selectWeapon("pistol");
    // this.m_hideUi();
};

TerraTactics.scene.Game.prototype.m_updateActivePlayerText = function () {
    if (this.m_currentPlayerText !== null) {
        this.stage.removeChild(this.m_currentPlayerText);
    }

    this.m_activePlayer = this.m_characters.getActive();

    this.m_currentPlayerText = new rune.text.BitmapField(this.m_activePlayer.id + "'s Turn");
    this.m_currentPlayerText.centerX = 200;
    this.m_currentPlayerText.centerY = 50;
    this.m_currentPlayerText.scaleX = 1.5;
    this.m_currentPlayerText.scaleY = 1.5;
    this.stage.addChild(this.m_currentPlayerText);
};

TerraTactics.scene.Game.prototype.m_moveUi = function () {
    var activePlayer = this.m_characters.getActive();
    var beginX = 430;
    var moveToX = 220;

    if (activePlayer.id === "player2") {
        beginX = -100;
        moveToX = 10;
    }
    console.log(activePlayer);

    this.m_attacks.forEachMember(function (attack, index) {
        attack.x = beginX + index * 25;
        this.tweens.create({
            target: attack,
            scope: this,
            duration: 750,
            args: {
                x: moveToX + index * 45,
            }
        });
    }, this);
};

TerraTactics.scene.Game.prototype.m_hideUi = function () {
    this.m_attacksVisible = false;

    var activePlayer = this.m_characters.getActive();
    var hideX = 430;

    if (activePlayer.id === "player2") {
        hideX = -120;
    }

    this.m_attacks.forEachMember(function (attack, index) {
        attack.x = hideX + index * 25;
        this.tweens.create({
            target: attack,
            scope: this,
            duration: 500,
            args: {
                x: hideX + index * 25,
            }
        });
    }, this);
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

    if (source === null || source.m_health <= 0) {
        return;
    }

    var angle = Math.atan2(this.m_mouseY - source.centerY, this.m_mouseX - source.centerX);
    var aimLength = 30;

    var endX = source.centerX + Math.cos(angle) * aimLength;
    var endY = source.centerY + Math.sin(angle) * aimLength;

    this.m_artboard.canvas.clear();
    this.m_artboard.canvas.drawLine(
        source.centerX,
        source.centerY,
        endX,
        endY,
        "red",
        3,
        1
    );
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

    if (this.m_gameEnd === true) {
        this.tweens.clear();
        return;
    }

    if (this.m_characters.getWinnerText() !== null) {
        this.m_displayWinner(this.m_characters.getWinnerText());
        if (this.m_activePlayer.character !== null) {
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

    if (this.m_activePlayer === null) {
        this.m_mouseDown = false;
        this.m_gamepadAiming = false;
        return;
    }

    this.m_updateGamepadAim();

    if (this.m_controls.toggleWeapons) {
        this.m_toggleAttackUi();
    }

    if (this.m_attacksVisible) {
        this.m_updateWeaponUiInput();
    } else {
        this.m_updatePlayerInput();
    }

    if (this.m_mouseDown || this.m_gamepadAiming) {
        this.m_drawArc(this.m_activePlayer.character);
    }

    if (this.m_bullet !== null) {
        if (this.m_bullet.hitTestTilemapLayer(this.stage.m_map.front)) {
            console.log('hit');
            this.stage.removeChild(this.m_bullet);
            this.m_bullet = null;

            this.m_endTurn();
        }
    }

    if (this.m_bullet !== null) {
        for (var i = 0; i < this.m_inActivePlayers.length; i++) {
            if (this.m_inActivePlayers[i].character !== null && this.m_bullet.hitTest(this.m_inActivePlayers[i].character)) {
                this.m_inActivePlayers[i].character.m_health -= this.m_bullet.m_damage;
                console.log(this.m_inActivePlayers[i].character.m_health);
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

    if (this.m_activePlayer.character.m_grounded) {
        this.m_counter = 0;
    }

    if (this.m_activePlayer !== null && this.m_activePlayer.character !== null) {
        if (this.m_activePlayer.character.bottom >= this.m_lava.y) {
            this.m_activePlayer.character.m_health = 0;
        }
    }

    for (var i = 0; i < this.m_inActivePlayers.length; i++) {
        if (this.m_inActivePlayers[i].character !== null) {
            if (this.m_inActivePlayers[i].character.bottom >= this.m_lava.y) {
                this.m_inActivePlayers[i].character.m_health = 0;
            }
        }
    }

    var oldActivePlayer = this.m_activePlayer;

    this.m_characters.update(this.stage.m_map.front);

    this.m_activePlayer = this.m_characters.getActive();
    this.m_inActivePlayers = this.m_characters.getInactive();

    if (this.m_activePlayer !== oldActivePlayer) {
        this.m_updateActivePlayerText();
        this.m_startRoundTimer();
        this.m_selectWeapon("pistol");
        // this.m_hideUi();
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
