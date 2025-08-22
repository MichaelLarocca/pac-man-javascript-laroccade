// Game sounds
export const soundGameStart = new Audio("../assets/audio/game-start.mp3");
export const soundPacManEatingPellets = new Audio("../assets/audio/pac-man-eating-pellets.mp3");
export const soundPacManEatingFruit = new Audio("../assets/audio/eating-fruit.mp3");
export const soundGhostSiren1 = new Audio("../assets/audio/ghost-siren-1.mp3");

// Preload sounds to avoid delays
[soundGameStart, soundPacManEatingPellets, soundPacManEatingFruit, soundGhostSiren1].forEach((sound) => {
	sound.load();
});
