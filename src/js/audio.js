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

// Adjust sound volumes
soundGhostSiren1.volume = 0.4;
soundGhostSiren2.volume = 0.4;
soundPacManEatingPellets.volume = 0.7;

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

  export function playGhostEatenSounds() {
	soundEatingGhost.pause();
	soundEatingGhost.currentTime = 0;
	soundGhostRunningAway.pause();
	soundGhostRunningAway.currentTime = 0;

	soundEatingGhost.play();
	setTimeout(() => {
	  soundGhostRunningAway.play();
	}, 1000);
  }

  export function playPacManEatingPelletsSound() {
	soundPacManEatingPellets.pause(); // Stop the sound if it's already playing
	soundPacManEatingPellets.currentTime = 0; // Reset to the beginning
	soundPacManEatingPellets.play(); // Play the sound
  }
  
  export function stopPacManEatingPelletsSound() {
	soundPacManEatingPellets.pause(); // Stop the sound
	soundPacManEatingPellets.currentTime = 0; // Reset to the beginning
  }

// Variable to track the current siren
let currentSiren = soundGhostSiren1; // Start with siren 1

// Function to play the current siren
export function playSiren() {
  currentSiren.loop = true; // Ensure the siren loops
  currentSiren.play();
}

// Function to stop the current siren
export function stopSiren() {
  currentSiren.pause();
  currentSiren.currentTime = 0; // Reset to the beginning
}

// Function to switch to siren 2
export function switchToSiren2() {
  stopSiren(); // Stop the current siren
  currentSiren = soundGhostSiren2; // Switch to siren 2
  playSiren(); // Start playing siren 2
}