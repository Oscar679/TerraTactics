
/**
 * Manages sound.
 */
TerraTactics.util.Sound = {};

TerraTactics.util.Sound.play = function (sound, reset) {
    var playRequest = null;

    if (reset) {
        sound.time = 0;
    }

    // rune does not handle the promise returned from play
    playRequest = sound.m_source.mediaElement.play();

    if (playRequest !== undefined) {
        playRequest.catch(function (error) {
            if (error.name !== "AbortError") {
                throw error;
            }
        });
    }
};

TerraTactics.util.Sound.stop = function (sound) {
    if (sound != null && !sound.paused) {
        sound.stop();
    }
};
