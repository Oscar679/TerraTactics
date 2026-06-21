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
 * Handles weapon selection and attack icon cooldowns.
 */
TerraTactics.scene.WeaponSelector = function (gameScene) {
    this.m_gameScene = gameScene;
    var c = this.m_gameScene.cameras.getCameraAt(0);
    
    var selectWeapon = this.m_selectWeapon.bind(this);

    this.m_attacks = new rune.display.DisplayGroup(this.m_gameScene.m_camera);

    this.m_L1Button = new rune.display.Sprite(20, 170, 48, 48, "L1");
    this.m_R1Button = new rune.display.Sprite(345, 170, 48, 48, "R1");


    c.addChild(this.m_L1Button);
    c.addChild(this.m_R1Button);

    this.attack1 = new TerraTactics.scene.Attacks(85, 170, "pistol", selectWeapon);
    this.attack2 = new TerraTactics.scene.Attacks(150, 170, "rifle", selectWeapon);
    this.attack3 = new TerraTactics.scene.Attacks(215, 170, "grenade", selectWeapon);
    this.attack4 = new TerraTactics.scene.Attacks(280, 170, "melee", selectWeapon);

    this.m_attacks.addMember(this.attack1);
    this.m_attacks.addMember(this.attack2);
    this.m_attacks.addMember(this.attack3);
    this.m_attacks.addMember(this.attack4);

    this.m_weaponNames = ["pistol", "rifle", "grenade", "melee"];
    this.m_selectedAttackIndex = 0;
};

TerraTactics.scene.WeaponSelector.prototype.m_selectWeapon = function (weapon) {
    var previousWeapon = null;
    var selectedWeapon = null;
    var character = null;
    var currentCooldown = 0;

    if (this.m_gameScene.m_activePlayer == null ||
        this.m_gameScene.m_activePlayer.character == null) {
        return;
    }

    character = this.m_gameScene.m_activePlayer.character;
    currentCooldown = character.m_weaponState.cooldowns[weapon] || 0;

    if (currentCooldown > 0) {
        return;
    }

    if (this.m_weaponNames !== null && this.m_weaponNames !== undefined) {
        this.m_selectedAttackIndex = this.m_getWeaponIndex(weapon);
    }

    if (this.m_gameScene.m_activePlayer != null &&
        this.m_gameScene.m_activePlayer.character != null) {
        previousWeapon = this.m_gameScene.m_activePlayer.character.weapon;
        this.m_gameScene.m_activePlayer.character.weapon = weapon;
        if (previousWeapon !== weapon) {
            selectedWeapon = this.m_gameScene.m_getActiveWeapon();
            if (selectedWeapon !== null && typeof selectedWeapon.m_playSwitchSound === "function") {
                selectedWeapon.m_playSwitchSound();
            }
        }
    }

    this.m_attacks.forEachMember(function (attack) {
        attack.m_selected(attack.m_weapon === weapon);
    });
};

TerraTactics.scene.WeaponSelector.prototype.m_getWeaponIndex = function (weapon) {
    for (var i = 0; i < this.m_weaponNames.length; i++) {
        if (this.m_weaponNames[i] === weapon) {
            return i;
        }
    }

    return 0;
};

TerraTactics.scene.WeaponSelector.prototype.m_selectWeaponAt = function (index, direction) {
    var attempts = 0;

    if (this.m_gameScene.m_activePlayer == null ||
        this.m_gameScene.m_activePlayer.character == null) {
        return;
    }

    if (direction === undefined) {
        direction = 1;
    }

    while (attempts < this.m_weaponNames.length) {
        if (index < 0) {
            index = this.m_weaponNames.length - 1;
        }

        if (index >= this.m_weaponNames.length) {
            index = 0;
        }

        var weapon = this.m_weaponNames[index];
        var cooldown = this.m_gameScene.m_activePlayer.character.m_weaponState.cooldowns[weapon] || 0;

        if (cooldown === 0) {
            this.m_selectedAttackIndex = index;
            this.m_selectWeapon(weapon);
            return;
        }

        index += direction;
        attempts++;
    }
};

TerraTactics.scene.WeaponSelector.prototype.m_updateAttackCooldowns = function () {
    var character = null;

    if (this.m_gameScene.m_activePlayer == null ||
        this.m_gameScene.m_activePlayer.character == null) {
        return;
    }

    character = this.m_gameScene.m_activePlayer.character;

    this.m_attacks.forEachMember(function (attack) {
        attack.setCooldown = character.m_weaponState.cooldowns[attack.m_weapon];
    });
};

TerraTactics.scene.WeaponSelector.prototype.m_updateInput = function (controls) {
    if (controls.weaponPrevious) {
        this.m_selectWeaponAt(this.m_selectedAttackIndex - 1, -1);
    }

    if (controls.weaponNext) {
        this.m_selectWeaponAt(this.m_selectedAttackIndex + 1, 1);
    }

    if (controls.confirm) {
    }
};

TerraTactics.scene.WeaponSelector.prototype.m_clickAt = function (point) {
    var clickedAttack = null;

    this.m_attacks.forEachMember(function (attack) {
        if (clickedAttack === null && attack.hitTestPoint(point)) {
            clickedAttack = attack;
        }
    });

    if (clickedAttack !== null) {
        clickedAttack.m_click();
        return true;
    }

    return false;
};

TerraTactics.scene.WeaponSelector.prototype.m_remove = function () {
    this.m_attacks.removeMembers(this.m_attacks.members);
};
