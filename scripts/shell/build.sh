#!/bin/bash

mkdir -p "./../../dist";

npx google-closure-compiler \
--language_in ECMASCRIPT5_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level WHITESPACE_ONLY \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/scene/game/intro/Intro.js" \
--js "./../../src/scene/game/menu/MainMenu.js" \
--js "./../../src/scene/game/options/Options.js" \
--js "./../../src/scene/game/credits/Credits.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/scene/game/character/Character.js" \
--js "./../../src/scene/game/character/Characters.js" \
--js "./../../src/scene/game/ui/Attacks.js" \
--js "./../../src/weapon/Weapon.js" \
--js "./../../src/weapon/Pistol.js" \
--js "./../../src/weapon/Rifle.js" \
--js "./../../src/weapon/Grenade.js" \
--js "./../../src/weapon/Melee.js" \
--js "./../../src/weapon/Weapons.js" \
--js "./../../src/weapon/Bullet.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/TerraTactics.js";
