// Game sounds
export const soundCutscene = new Audio("../assets/audio/cutscene.mp3");
export const soundDeath = new Audio("../assets/audio/death.mp3");
export const soundPacManEatingFruit = new Audio("../assets/audio/eating-fruit.mp3");
export const soundEatingGhost = new Audio("../assets/audio/eating-ghost.mp3");
export const soundGameStart = new Audio("../assets/audio/game-start.mp3");
export const soundGhostRunningAway = new Audio("../assets/audio/ghost-running-away.mp3");
export const soundGhostSiren1 = new Audio("../assets/audio/ghost-siren-1.mp3");
export const soundGhostSiren2 = new Audio("../assets/audio/ghost-siren-2.mp3");
export const soundHighScore = new Audio("../assets/audio/high-score.mp3");
export const soundPacManEatingPellets = new Audio("../assets/audio/pac-man-eating-pellets.mp3");
export const soundPowerUp = new Audio("../assets/audio/power-up.mp3");

// Preload sounds to avoid delays
[
  soundCutscene,
  soundDeath,
  soundPacManEatingFruit,
  soundEatingGhost,
  soundGameStart,
  soundGhostRunningAway,
  soundGhostSiren1,
  soundGhostSiren2,
  soundHighScore,
  soundPacManEatingPellets,
  soundPowerUp,
].forEach((sound) => {
  sound.load();
});

export function stopAllSounds() {
	const allSounds = [
	  soundGameStart,
	  soundPacManEatingPellets,
	  soundPacManEatingFruit,
	  soundGhostSiren1,
	  soundCutscene,
	  soundDeath,
	  soundEatingGhost,
	  soundGhostRunningAway,
	  soundGhostSiren2,
	  soundHighScore,
	  soundPowerUp,
	];
  
	allSounds.forEach((sound) => {
	  sound.pause();
	  sound.currentTime = 0; // Reset playback to the beginning
	});
  }
