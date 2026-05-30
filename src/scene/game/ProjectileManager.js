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
    if (weapon === "grenade") {
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

    var tileToDestroyedMap = {
        1: 50,
        2: 50,
        3: 25,
        4: 33,
        5: 49,
        6: 34,
        9: 52,
        10: 52,
        11: 52,
        17: 52,
        18: 52,
        19: 58,
        28: 53,
        29: 53,
        30: 53,
        32: 26,
        35: 51,
        36: 54,
        37: 55,
        38: 51,
        39: 54,
        40: 52,
        41: 49,
        42: 49,
        43: 56,
        45: 50,
        46: 50,
        47: 50,
        48: 57
    };

    for (var i = 0; i < indexes.length; i++) {
        var index = indexes[i];
        var width = this.m_gameScene.stage.m_map.widthInTiles;
        var column = index % width;
        var value = this.m_gameScene.stage.m_map.front.getTileValueAt(index);

        if (value === 0) {
            continue;
        }

        for (var tile in tileToDestroyedMap) {
            if (value === tileToDestroyedMap[tile]) {
                this.m_gameScene.stage.m_map.front.setTileValueAt(index, 0);
                return;
            }
        }

        if (tileToDestroyedMap[value]) {
            this.m_gameScene.stage.m_map.front.setTileValueAt(index, tileToDestroyedMap[value]);
            return;
        }
    }
};

TerraTactics.scene.ProjectileManager.prototype.radiusDamage = function (bullet, inactivePlayers) {
    for (var i = 0; i < inactivePlayers.length; i++) {
        if (inactivePlayers[i].character !== null) {
            var distance = rune.util.Math.distance(this.m_bullet.x, this.m_bullet.y, inactivePlayers[i].character.x, inactivePlayers[i].character.y);
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
