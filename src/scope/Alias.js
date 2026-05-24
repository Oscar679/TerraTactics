//------------------------------------------------------------------------------
// Global scope aliases
//------------------------------------------------------------------------------

/**
 * @description Makes TerraTactics available on window when running in a browser.
 */
if (typeof window !== "undefined") {
    if (typeof window.TerraTactics === "undefined") {
        window.TerraTactics = TerraTactics;
    }
}

/**
 * @description Registers TerraTactics with Rune OS when that environment exists.
 */
if (typeof window !== "undefined" && typeof window.runeos === "object") {
    window.runeos.install(TerraTactics);
}
