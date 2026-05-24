
TerraTactics.data = TerraTactics.data || {};

/**
 * @description Shared weapon objects, keyed by the names used by characters and UI.
 * @type {Object}
 */
TerraTactics.data.Weapons = {
    pistol: new TerraTactics.scene.Pistol(),
    rifle: new TerraTactics.scene.Rifle(),
    grenade: new TerraTactics.scene.Grenade(),
    melee: new TerraTactics.scene.Melee()
};
