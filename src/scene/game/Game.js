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

        if (this.m_activePlayer !== null && this.m_bullet === null) {
            this.m_mouseDown = true;
        }
    }.bind(this));

    window.addEventListener("mouseup", function () {
        // im thinking i'll add animation/drawing for the bullet here?
        if (this.m_mouseDown && this.m_activePlayer !== null && this.m_bullet === null && this.m_activePlayer.m_canFire(this.m_activePlayer.m_getWeapon())) {
            this.m_bullet = this.m_activePlayer.m_fireProjectile(this.m_mouseX, this.m_mouseY);
            this.m_activePlayer.m_setCooldown(this.m_activePlayer.m_getWeapon());
            this.stage.addChild(this.m_bullet);
        }
        this.m_mouseDown = false;
    }.bind(this));

    this.m_bullet = null;

    this.m_characters = new TerraTactics.scene.Characters(this.stage);

    this.m_activePlayer = this.m_characters.getActive().character;
    this.m_inActivePlayer = this.m_characters.getInactive().character;

    this.m_selectWeapon("pistol");

    this.m_counter = 0;

    this.m_roundTimer = null;
    this.m_startRoundTimer();

    this.m_gameEnd = false;

    this.m_time = 0;

    this.m_timeString = new rune.text.BitmapField("00:00", "timer-font");
    this.m_timeString.width = this.m_timeString.textWidth;
    this.m_timeString.height = this.m_timeString.textHeight;
    this.m_timeString.scaleX = 1.5;
    this.m_timeString.scaleY = 1.5;
    this.m_timeString.centerX = 200;
    this.m_timeString.y = 10;
    this.stage.addChild(this.m_timeString);

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


    console.log(this.m_timeString.centerX);
    console.log(this.m_timeString.globalX);

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
};

TerraTactics.scene.Game.prototype.m_padNumber = function (number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number.toString();
    }
};

TerraTactics.scene.Game.prototype.m_selectWeapon = function (weapon) {
    if (this.m_activePlayer !== null && this.m_activePlayer !== undefined) {
        this.m_activePlayer.m_setWeapon(weapon);
    }

    this.m_attacks.forEachMember(function (attack) {
        attack.m_selected(attack.m_weapon === weapon);
    });
}

TerraTactics.scene.Game.prototype.m_startRoundTimer = function () {
    if (this.m_roundTimer !== null) {
        this.timers.remove(this.m_roundTimer);
        this.m_roundTimer = null;
    }

    this.m_roundTimer = this.timers.create({
        duration: 10000,
        onComplete: this.m_onRoundTimerComplete,
        scope: this
    });
};

TerraTactics.scene.Game.prototype.m_onRoundTimerComplete = function () {
    this.m_roundTimer = null;
    this.m_endTurn();
};

TerraTactics.scene.Game.prototype.m_endTurn = function () {
    this.m_characters.switchTurn();
    this.m_startRoundTimer();
    this.m_selectWeapon("pistol");
    this.m_hideUi();
};

TerraTactics.scene.Game.prototype.m_moveUi = function () {
    var activePlayer = this.m_characters.getActive();
    var beginX = 430;
    var moveToX = 220;

    if (activePlayer.id === "p2") {
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

    if (activePlayer.id === "p2") {
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
    this.timers.remove(this.m_globalTimer);
    this.m_globalTimer = null;
    this.stage.removeChild(this.m_timeString);
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
        if (this.m_activePlayer !== null) {
            this.m_activePlayer.m_grounded = true;
        }

        if (this.m_inActivePlayer !== null) {
            this.m_inActivePlayer.m_grounded = true;
        }

        this.m_gameEnd = true;
        return;
    }

    if (this.m_activePlayer === null || this.m_inActivePlayer === null) {
        this.m_mouseDown = false;
        return;
    }


    if (this.m_mouseDown) {
        this.m_drawArc(this.m_activePlayer);
    }

    if (this.keyboard.pressed("LEFT")) {
        this.m_activePlayer.x -= 1;
    }

    if (this.keyboard.pressed("RIGHT")) {
        this.m_activePlayer.x += 1;
    }

    if (this.keyboard.justPressed("UP") && this.m_counter < 2) {
        this.m_activePlayer.m_velocityY = -this.m_activePlayer.m_jumpStrength;
        this.m_activePlayer.m_grounded = false;
        this.m_counter++;
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
        if (this.m_bullet.hitTest(this.m_inActivePlayer)) {
            this.m_inActivePlayer.m_health -= this.m_bullet.m_damage;
            console.log(this.m_inActivePlayer.m_health);
            this.m_knockback(this.m_inActivePlayer, this.m_bullet);
            this.stage.removeChild(this.m_bullet);
            this.m_bullet = null;

            this.m_endTurn();
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

    if (this.m_activePlayer.m_grounded) {
        this.m_counter = 0;
    }

    this.m_characters.update(this.stage.m_map.front);

    this.m_activePlayer = this.m_characters.getActive().character;
    this.m_inActivePlayer = this.m_characters.getInactive().character;

    if (this.m_activePlayer !== null && this.m_inActivePlayer !== null) {
        if (this.m_activePlayer.bottom >= this.m_lava.y) {
            this.m_activePlayer.m_health = 0;
        }

        if (this.m_inActivePlayer.bottom >= this.m_lava.y) {
            this.m_inActivePlayer.m_health = 0;
        }
    }

    if (this.keyboard.justPressed("Q")) {
        console.log("show attack ui");
        this.m_attacksVisible = !this.m_attacksVisible;

        if (this.m_attacksVisible) {
            this.m_moveUi();
        } else {
            this.m_hideUi();
        }
        //this is gonna be a gamepad button later.
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
