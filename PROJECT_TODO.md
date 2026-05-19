# TerraTactics Developer TODO

This list is focused on your responsibility as the developer: game logic, mechanics, technical stability, integration, documentation support, and playtest fixes. Your designer partner owns graphics, menus, sound, animation, interaction polish, UI, highscore if used, and QA testing, but you still need to make sure the code supports her work and that the final game loop is stable.

## Course Responsibility Summary

- Developer: game logic and mechanics in code.
- Designer: graphics, start menus, sound, animation, interaction, UI, highscore, and code that is not directly game logic.
- Shared: game design choices, documentation, playtesting, and QA testing.

## P0 - Must Fix Before Submission

- [x] Lock player control after firing. While `m_bullet !== null`, the active player should not move, jump, aim, switch weapons, or fire again. Start in `src/scene/game/Game.js` around `m_updatePlayerInput`, `m_updateWeaponUiInput`, and the bullet checks.
- [x] Prevent the round timer from ending the turn while a projectile is still active. If the timer hits zero during a shot, wait until the projectile hits terrain, hits a player, explodes, or leaves the world.
- [x] Fix remaining active-player null safety. The arrow update is guarded, but `Game.js` and `Characters.js` still have direct `getActive().character` / `m_activePlayer.character` reads in input, aiming, turn switching, and character update code that can crash after death or simultaneous player removal.
- [ ] Make death and winner logic impossible to crash. Test both cases: active player dies from lava, inactive player dies from lava/projectile. The game should show one winner message and then stop gameplay cleanly.
- [ ] Remove debug mode for final build. `src/system/Main.js` still has `debug: true`; character and bullet hitbox debug lines are currently commented out.
- [ ] Remove all `console.log` calls before final hand-in. Check with `rg -n "console\\.log" src`.
- [ ] Remove or implement broken menu items. `MainMenu.js` has `Exit` in the menu but no scene/action for it, and `Options.js` still has placeholder volume functions that do nothing.
- [ ] Decide final menu flow with the designer: either keep a simple working Main Menu -> Game -> Credits/Back flow, or remove fake options that do nothing.
- [ ] Update `README.md` controls. It currently says mouse/Q controls, but the project now has gamepad/keyboard weapon cycling and analog aiming.
- [ ] Rebuild and run the final version after every resource/code change: `npm run build`, then `npm start` or the Rune OS test flow required by the course.
- [ ] Fix or document the Windows build setup. `npm run build` currently calls `bash ./build.sh` inside `scripts/shell`; on this machine it fails because WSL has no installed Linux distribution. Either use Git Bash/WSL reliably or add a Windows-friendly build command.

## P0 - Core Mechanics You Own

- [ ] Make turns deterministic: exactly one turn switch per shot or timeout. Avoid double-calling `m_endTurn` from timer, collision, player death, off-screen projectile logic, and game-over transitions.
- [ ] Add a simple game state flag such as `waitingForProjectile`, `turnChanging`, or `gameOver` so input/timers/projectiles cannot overlap in weird ways. `m_gameEnd` exists, but there is not yet a turn/projectile transition guard.
- [x] Make projectile cleanup centralized. Right now terrain hit, player hit, and screen exit each remove the bullet and call `m_endTurn`; put the repeated cleanup into one helper.
- [ ] Confirm what happens if a projectile kills the active player indirectly, such as knockback/lava or explosion later if grenade gets radius damage.
- [ ] Keep lava death reliable for active and inactive players. Lava should set health/death once, play feedback once, and not repeatedly trigger sounds.
- [x] Clamp or handle player world bounds so a player cannot leave the map in a broken way.
- [x] Fix collision/grounding edge cases listed in `BUGS.md`, especially jumping into the bottom of terrain causing `grounded`.

## P0 - Weapons

- [ ] Make melee a real close-range attack or remove it. It currently fires a bullet like the other weapons in `src/weapon/Melee.js`.
- [ ] Make grenade either a real grenade or cut it. If kept, it needs an explosion radius, radius damage/knockback, explosion sound, and clear end-of-turn behavior.
- [ ] Give each weapon a clear mechanical role:
  - Pistol: reliable, low/no cooldown.
  - Rifle: faster/straighter, higher damage or precision.
  - Grenade: arcing area damage.
  - Melee: close range, high knockback, no projectile.
- [x] Move cooldown values into weapon classes instead of duplicating them in `Character.m_setCooldown`. Use each weapon's `m_cooldown`.
- [x] Sync the active player's current weapon cooldown values into the attack icon text.
- [ ] Finish cooldown UI polish. Current cooldown values now sync into attack icons, but the full turn flow needs playtesting and you still need to decide whether `0` should be hidden, dimmed, or shown.
- [x] Verify arc preview matches the actual projectile for every projectile weapon.
- [ ] Tune damage so a match is neither instant nor too slow for presentation.

## P0 - Input And Two-Player Expectations

- [ ] Confirm with the teacher whether "two players" means one shared controller/keyboard taking turns or two separate controllers. Document the answer.
- [x] Route active-turn gameplay input through player-specific controllers. `player1` now uses `Controls(0)`, `player2` uses `Controls(1)`, and `Game.update` reads from the active player's controls.
- [ ] Test two connected controllers on the presentation hardware. Each player should use their own controller for movement, aiming, firing, and weapon selection, with the active turn reading input from the correct controller only.
- [ ] Test the exact controller you will present with. Current mapping is PS4-style buttons in `src/util/MappingGamepad.js`.
- [ ] Decide final keyboard support. If keyboard remains, document it and make it complete. If gamepad is the target, make sure the game can be played start-to-finish with gamepad only.
- [ ] Fix missing/unused input hooks. `Game.js` checks `weaponOne`, `weaponTwo`, `weaponThree`, `weaponFour`, and `Intro.js` checks `toggleWeapons`, but `Controls.js` does not define them.
- [x] Make fire behavior predictable: aim with stick/mouse, press fire once, shot happens once.
- [ ] Test menu confirm so one press does not accidentally skip multiple scenes.

## P1 - Developer Support For Designer-Owned Work

- [ ] Give the designer a stable list of UI states needed by game logic: current player, selected weapon, cooldown, health, turn time, total time, winner.
- [ ] Expose clean data from game code instead of making UI inspect private fields everywhere.
- [ ] Coordinate final menu screens: Start, Instructions/Controls, Credits, Back/Restart. The designer can own visuals, but you should wire scene transitions safely.
- [ ] Add a restart/back-to-menu path after game over if the designer wants it.
- [ ] Make sure sounds are triggered by real game events only once: jump, weapon switch, fire, hit, lava, turn change, victory.
- [ ] Keep all design assets referenced correctly in `src/data/resource/Requests.js` by rebuilding after asset changes.

## P1 - Code Quality

- [ ] Replace repeated hardcoded screen values like `400` and `225` with named constants where it improves readability.
- [ ] Keep game-state/turn logic in `Game.js`; keep weapon-specific behavior in weapon classes; keep character physics in `Character.js`.
- [ ] Remove unused methods or old experiments, such as `Game.m_fireProjectile` if it is no longer used.
- [ ] Avoid duplicated mouse/gamepad aiming logic where possible.
- [ ] Add small helper functions for repeated checks: `m_hasActiveCharacter`, `m_hasActiveProjectile`, `m_canAcceptInput`, `m_finishProjectile`.
- [ ] Consider extracting attack-bar management from `Game.js` after cooldown UI is stable. Keep `Attacks` as one icon/button, and move the group, hit testing, selected state, and cooldown syncing into an `AttackBar` or `WeaponSelector` class.
- [ ] Keep functions short enough that you can explain them during presentation.

## P1 - Documentation And Presentation

- [ ] Update `README.md` with accurate setup, build, controls, goal, and known limitations.
- [ ] Add a short "Developer responsibility" section to docs: turn system, collision, weapons, lava, gamepad input, win condition.
- [ ] Keep `BUGS.md` current or merge the real issues into this TODO before submission. It still lists some issues that appear fixed or partly fixed in code, such as projectile/timer conflict, post-shot input, bottom-of-terrain grounding, and cooldown display.
- [ ] Prepare a short explanation of your code structure:
  - `Game.js`: turn loop, timers, lava, collision checks, win state.
  - `Character.js` / `Characters.js`: player state, health, physics, death.
  - `weapon/*`: weapon data and projectile creation.
  - `util/*`: keyboard/gamepad mapping.
- [ ] Document any course exceptions, especially if highscore is not required or if two-player input is turn-based on one controller.

## Final QA Checklist

- [ ] Fresh clone/install works: `npm install`.
- [ ] Build passes on the presentation machine: `npm run build`.
- [ ] Game starts from the final menu, not a debug scene.
- [ ] One full match can be played without touching mouse/keyboard if gamepad is the target.
- [ ] Player 1 can win.
- [ ] Player 2 can win.
- [ ] Active player dying does not crash.
- [ ] Inactive player dying does not crash.
- [ ] Timer timeout switches turn once.
- [ ] Projectile hit switches turn once.
- [ ] Projectile miss/off-screen switches turn once.
- [ ] Lava death works.
- [ ] Winner text appears once.
- [ ] Restart/menu flow works, or absent buttons are removed.
- [ ] No debug overlays.
- [ ] No console spam.
- [ ] Final build runs in Rune OS / required course environment.

## Suggested Work Order

1. Fix game-state safety: active-player null checks, death/winner handling, deterministic turn guards.
2. Clean final-build issues: Rune debug mode, console logs, broken menu/options flow.
3. Finish weapon mechanics: melee/grenade decision, cooldown UI polish, balance pass.
4. Verify two-controller controls and update README.
5. Coordinate final UI/menu polish with the designer.
6. Do full playtests and record any remaining known issues.
