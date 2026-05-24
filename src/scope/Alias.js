


if (typeof window !== "undefined") {
    if (typeof window.TerraTactics === "undefined") {
        window.TerraTactics = TerraTactics;
    }
}


if (typeof window !== "undefined" && typeof window.runeos === "object") {
    window.runeos.install(TerraTactics);
}
