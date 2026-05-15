# TerraTactics Project TODO

This is the practical checklist for getting TerraTactics ready for presentation. Focus on the required and high-risk items first. Extra features are only worth doing after the game is stable.

## Priority Key

- `P0` = must fix/add for the school project to feel finished.
- `P1` = important polish that makes the game feel much better.
- `P2` = nice idea, but only if the main game is already safe.

## P0 - Course Requirements

- [ ] Boot into a real main menu before the game starts.
- [ ] Add an instructions screen that explains controls, goal, weapons, turns, and lava.
- [x] Make the full game playable with gamepad.
- [x] Make sure menu navigation works with gamepad.
- [x] Make sure weapon selection works with gamepad.
- [x] Make sure aiming and firing works with gamepad.
- [ ] Make sure restart/back/menu flow works with gamepad.
- [x] Confirm how the teacher wants "two players simultaneously" interpreted.
- [x] Keep at least two playable players in the final version.
- [ ] Remove or disable fake menu options that do not work.
- [ ] Remove debug visuals before presentation.
- [ ] Remove console logs before presentation.
- [ ] Make sure the game runs in RUNE OS.
- [ ] Make sure the final build runs at a stable framerate.
- [ ] Keep the game visually consistent: same pixel style, same UI style, no mixed art direction.
- [ ] Make sure all graphics, sound, and code are allowed by the course rules.
- [ ] Replace any asset that may count as AI-generated.
- [ ] Document the teacher's highscore exception, since highscore is normally listed in the requirements.

## P0 - Serious Gameplay Bugs

- [ ] Prevent player movement after firing until the projectile/action is finished.
- [ ] Prevent the round timer from switching turn while a projectile is still active.
- [ ] Prevent firing while another projectile/action is active.
- [ ] Make sure the game does not crash when the active player dies.
- [ ] Make sure the game does not crash when only one player remains.
- [ ] Make sure winner text appears once and the game ends cleanly.
- [ ] Make sure active arrow does not update if there is no active character.
- [ ] Make sure dead characters cannot aim, fire, move, or switch weapons.
- [ ] Make sure lava death works for active and inactive players.
- [ ] Make sure projectiles cannot create endless turns or softlocks.
- [ ] Make sure the player cannot leave the playable area in a broken way.

## P0 - Weapons

- [ ] Make melee behave like melee, not like a bullet.
- [ ] Decide if rifle should be fast/straight and pistol should be weaker/simple.
- [ ] Give each weapon a clear reason to exist.
- [ ] Make weapon cooldowns visible or remove cooldowns if they are not important.
- [ ] Make grenade explosion/radius damage understandable if grenade stays in the game.
- [ ] Make arc preview match the actual projectile path.
- [ ] Make projectile spawn positions consistent across weapons.
- [ ] Make weapon damage feel fair enough for a class presentation.

## P0 - Controls

- [ ] Decide final aiming model: gamepad only.
- [ ] Remove or ignore mouse aiming in the final version if it is not required.
- [ ] Make aim direction easy to understand visually.
- [ ] Make fire/cancel aim predictable.
- [ ] Add a small gamepad input delay/cooldown for menu selection so one press does not skip multiple options.
- [ ] Test with the actual controller you will use during presentation.

## P0 - Level And Collision

- [ ] Fix grounded behavior when the character hits the bottom of terrain.
- [ ] Check terrain edge hitboxes so characters do not snag too much.
- [ ] Check if thin character hitboxes make bullet hits feel unfair.
- [ ] Make sure bullets collide with terrain in a predictable way.
- [ ] Make sure players spawn on safe terrain.
- [ ] Make sure no player starts inside terrain or lava.

## P1 - Lava Camera / Taller Map

- [ ] Make the tilemap taller than one screen if you want camera reveal.
- [ ] Change `asset/map.json` height and front-layer data length.
- [ ] Build actual playable platforms higher up in the map.
- [ ] Start the camera near the bottom of the taller map.
- [ ] Start lava at the bottom of the taller map.
- [ ] Move the camera upward only when lava has risen enough.
- [ ] Replace hardcoded screen-height values like `225` with world/map values where needed.
- [ ] Make sure aiming/projectiles use world coordinates.
- [ ] Make sure UI does not scroll weirdly with the camera.
- [ ] Make or extend background art so camera movement does not reveal empty space.

Recommended simple camera behavior:

```js
var targetY = this.m_lava.y - 170;

if (targetY < this.m_camera.viewport.y) {
    this.m_camera.viewport.y += (targetY - this.m_camera.viewport.y) * 0.05;
}
```

Only do this after the required features are stable.

## P1 - UI Polish

- [ ] Make current player clearly visible.
- [ ] Make selected weapon clearly visible.
- [ ] Show weapon cooldowns if cooldowns matter.
- [ ] Make health readable.
- [ ] Make timer readable.
- [ ] Make game-over/winner state clear.
- [ ] Make buttons/icons use one consistent visual style.
- [ ] Keep text short and readable on the 400x225 screen.

## P1 - Game Feel

- [ ] Add a short hit effect when a player takes damage.
- [ ] Add a small camera shake or flash for explosions/hits.
- [ ] Add clear feedback when a weapon cannot be used.
- [ ] Tune jump and movement so turns feel responsive.
- [ ] Tune lava speed so the match has pressure but does not feel random.
- [ ] Tune projectile speeds so weapons feel different.
- [ ] Add simple sound effects if allowed and student-made.

## P1 - Code Quality

- [ ] Move weapon-specific projectile data into each weapon class.
- [ ] Keep game-state logic in `Game.js`, but keep weapon behavior in weapon classes.
- [ ] Avoid duplicated aiming/firing logic between mouse and gamepad.
- [ ] Replace magic numbers like `400`, `225`, and repeated offsets with named values when useful.
- [ ] Keep null checks around active player/character.
- [ ] Keep code simple and readable in your current style.
- [ ] Remove unused variables and old experimental code before final build.
- [ ] Rebuild after resource changes.

## P2 - Optional Features

- [ ] Add more maps.
- [ ] Add better weapon balancing.
- [ ] Add animated UI transitions.
- [ ] Add stronger explosion effects.
- [ ] Add character selection.
- [ ] Add music only if it is allowed and you have permission.
- [ ] Add highscore only if the teacher changes their mind.

## Suggested Two-Week Plan

### Days 1-3: Make It Safe

- [ ] Fix projectile/turn/action lock bugs.
- [ ] Fix death/winner crashes.
- [ ] Remove debug/log code.
- [ ] Make gamepad work for the full game loop.

### Days 4-6: Meet Requirements

- [ ] Finish main menu.
- [ ] Finish instructions screen.
- [ ] Confirm multiplayer/controller expectations.
- [ ] Confirm asset legality.

### Days 7-9: Polish Core Gameplay

- [ ] Make melee feel correct.
- [ ] Tune weapons.
- [ ] Tune lava.
- [ ] Improve UI clarity.

### Days 10-11: Add Camera Reveal Only If Stable

- [ ] Make taller map.
- [ ] Add lava-based camera movement.
- [ ] Fix hardcoded world bounds.
- [ ] Test aiming/projectiles with camera movement.

### Days 12-14: Presentation Mode

- [ ] Full playtest from menu to winner.
- [ ] Test in RUNE OS.
- [ ] Build final version.
- [ ] Prepare a short explanation of design choices.
- [ ] Prepare a backup plan if something fails live.

## Presentation Talking Points

- TerraTactics is a turn-based tactical arena game with rising lava pressure.
- The lava forces players to act instead of waiting forever.
- Weapons create different tactical choices.
- The game uses object-oriented JavaScript: characters, weapons, bullets, UI, and scenes have separate classes.
- The design was improved iteratively through testing: aiming, projectile arcs, turn flow, and lava pressure.
- The final version focuses on readable controls, fair turns, and a complete game loop.

