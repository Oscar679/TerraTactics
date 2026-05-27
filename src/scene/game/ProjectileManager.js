//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *
 * @class
 * @classdesc
 *
 * Handles projectile firing, collision, cleanup and turn completion.
 */
TerraTactics.scene.ProjectileManager = function (gameScene) {
    this.m_gameScene = gameScene;
    this.m_bullet = null;
    this.m_explosionTimer = null;
};

TerraTactics.scene.ProjectileManager.prototype.m_hasProjectile = function () {
    return this.m_bullet !== null;
};

TerraTactics.scene.ProjectileManager.prototype.m_fireActiveWeapon = function (targetX, targetY) {
    var activePlayer = this.m_gameScene.m_activePlayer;
    var weapon = null;

    if (activePlayer == null ||
        activePlayer.character == null ||
        this.m_bullet !== null) {
        return;
    }

    weapon = activePlayer.character.weapon;

    if (activePlayer.character.m_canFire(weapon)) {
        this.m_bullet = activePlayer.character.m_fireProjectile(targetX, targetY, this.m_gameScene);

        activePlayer.character.m_setCooldown(weapon);
        this.m_gameScene.m_updateAttackCooldowns();

        if (this.m_bullet === null) {
            if (weapon === "melee") {
                this.m_gameScene.m_endTurn();
                return;
            }
        }

        this.m_gameScene.m_bullet = this.m_bullet;
        this.m_gameScene.stage.addChild(this.m_bullet);
    }
};

TerraTactics.scene.ProjectileManager.prototype.m_applyExplosion = function (x, y) {
    var explosionGraphic = this.m_gameScene.m_explosionGraphic;
    console.log("graphic position:" + explosionGraphic.x + "," + explosionGraphic.y);
    console.log("bullet position:" + x + "," + y);
    this.m_gameScene.stage.addChild(explosionGraphic);
    explosionGraphic.moveTo(x, y);

    this.m_explosionTimer = this.m_gameScene.timers.create({
        duration: 600,
        onStart: function () {
            explosionGraphic.animation.play("idle");
        },
        onComplete: function () {
            explosionGraphic.y = -50;
        },
        scope: this
    });
};

TerraTactics.scene.ProjectileManager.prototype.m_bulletHit = function (weapon, target) {
    console.log(this.m_bullet);
    if (weapon === "grenade") {
        console.log("is grenade");
        console.log(this.m_bullet);
        console.log(target);
        this.m_applyExplosion(target.x, target.y - 15);
    }
    this.m_gameScene.stage.removeChild(this.m_bullet);
    this.m_bullet = null;
    this.m_gameScene.m_bullet = null;
    this.m_gameScene.m_endTurn();
};

TerraTactics.scene.ProjectileManager.prototype.m_knockback = function (player, source) {
    if (player.centerX < source.centerX) {
        player.x -= source.m_knockback;
    } else {
        player.x += source.m_knockback;
    }

    player.m_grounded = false;
    player.m_velocityY = -2;
};

TerraTactics.scene.ProjectileManager.prototype.m_destroyTileAtHitbox = function (hitbox) {
    var indexes = this.m_gameScene.stage.m_map.front.getTileIndexesInRect(hitbox);

    var brokenTiles = {
        25: true,
        26: true,
        33: true,
        34: true,
        49: true,
        50: true,
        51: true,
        52: true,
        53: true,
        54: true,
        55: true,
        56: true,
        57: true,
        58: true
    };

    for (var i = 0; i < indexes.length; i++) {
        var index = indexes[i];
        var width = this.m_gameScene.stage.m_map.widthInTiles;
        var column = index % width;
        var value = this.m_gameScene.stage.m_map.front.getTileValueAt(index);

        if (value === 0) {
            continue;
        }

        /*
        if (brokenTiles[value]) {
            if (column > 0 &&
                this.m_gameScene.stage.m_map.front.getTileValueAt(index - 1) === 0 && column < width - 1 &&
                this.m_gameScene.stage.m_map.front.getTileValueAt(index + 1) === 0) {
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 0);
                return;
            }
            if (column > 0 && this.m_gameScene.stage.m_map.front.getTileValueAt(index - 1) === 0) {
                //apply broken island where its empty on the left side of the island
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 13);
            } else if (column < width - 1 && this.m_gameScene.stage.m_map.front.getTileValueAt(index + 1) === 0) {
                //apply broken island where its empty on the right side of the island
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 14);
            } else {
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 0);
            }
            return;
        }*/

        // sätt in en söndrig tile för den specifika tilen
        switch (value) {
            case 1:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 50);
                return;
            case 2:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 50);
                return;
            case 3:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 25);
                return;
            case 4:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 33);
                return;
            case 5:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 49);
                return;
            case 6:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 34);
                return;
            case 9:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 52);
                return;
            case 10:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 52);
                return;
            case 11:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 52);
                return;
            case 17:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 52);
                return;
            case 18:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 52);
                return;
            case 19:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 58);
                return;
            case 28:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 53);
                return;
            case 29:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 53);
                return;
            case 30:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 53);
                return;
            case 32:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 26);
                return;
            case 35:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 51);
                return;
            case 36:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 54);
                return;
            case 37:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 55);
                return;
            case 38:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 51);
                return;
            case 39:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 54);
                return;
            case 40:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 52);
                return;
            case 41:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 49);
                return;
            case 42:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 49);
                return;
            case 43:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 56);
                return;
            case 45:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 50);
                return;
            case 46:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 50);
                return;
            case 47:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 50);
                return;
            case 48:
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 57);
                return;
        }

        /*  // if its already a destroyed edge or a small island, apply empty tile
         if (value === 13 || value === 14 || value === 8) {
             this.m_gameScene.stage.m_map.front.setTileValueAt(index, 0);
             return;
         }*/


    }
};

TerraTactics.scene.ProjectileManager.prototype.radiusDamage = function (bullet, inactivePlayers) {
    for (var i = 0; i < inactivePlayers.length; i++) {
        if (inactivePlayers[i].character !== null) {
            var distance = rune.util.Math.distance(this.m_bullet.x, this.m_bullet.y, inactivePlayers[i].character.x, inactivePlayers[i].character.y);
            console.log(distance);
            if (distance <= 24) {
                this.m_gameScene.m_characters.m_damageTaken(inactivePlayers[i].character, this.m_bullet.m_damage * 0.8);
                this.m_knockback(inactivePlayers[i].character, this.m_bullet);
            }
            else if (distance <= 38) {
                this.m_gameScene.m_characters.m_damageTaken(inactivePlayers[i].character, this.m_bullet.m_damage * 0.6);
                this.m_knockback(inactivePlayers[i].character, this.m_bullet);
            } else if (distance <= 60) {
                this.m_gameScene.m_characters.m_damageTaken(inactivePlayers[i].character, this.m_bullet.m_damage * 0.4);
                this.m_knockback(inactivePlayers[i].character, this.m_bullet);
            }
        }
    }
};

TerraTactics.scene.ProjectileManager.prototype.update = function (inactivePlayers) {
    if (this.m_bullet !== null) {
        if (this.m_bullet.hitTest(this.m_gameScene.stage.m_map.front)) {
            if (this.m_bullet.m_type === "grenade") {
                this.radiusDamage(this.m_bullet, inactivePlayers);
            }
            this.m_destroyTileAtHitbox(this.m_bullet.hitbox);
            this.m_bulletHit(this.m_gameScene.m_activePlayer.character.weapon, this.m_bullet);
            return;
        }
    }

    if (this.m_bullet !== null) {
        for (var i = 0; i < inactivePlayers.length; i++) {
            if (inactivePlayers[i].character !== null && this.m_bullet.hitTest(inactivePlayers[i].character)) {
                this.m_gameScene.m_characters.m_damageTaken(inactivePlayers[i].character, this.m_bullet.m_damage);
                this.m_knockback(inactivePlayers[i].character, this.m_bullet);
                this.m_bulletHit(this.m_gameScene.m_activePlayer.character.weapon, inactivePlayers[i].character);
                return;
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
            this.m_bulletHit();
        }
    }
};
