import { squares, buildGameBoard, setGameBoard, roundOutTheGameboard, setLairText, setTitleScreen, reSetLairTextColor, setTunnel, pelletState, intersectionIndices } from './game-board.js';
import { flagToggled, startToggleTitleAndScoreScreen, endToggleTitleAndScoreScreen } from '../main.js';
import { playSiren, stopSiren, switchToSiren2, stopPacManEatingPelletsSound, playPacManEatingPelletsSound, playGhostEatenSounds, stopAllSounds, soundGameStart, soundPacManEatingPellets, soundPacManEatingFruit, soundGhostSiren1, soundCutscene, soundDeath, soundEatingGhost, soundGhostRunningAway, soundGhostSiren2, soundHighScore, soundPowerUp } from './audio.js';

// DOM queries
const ctnGame = document.getElementById('ctn-game');
const sectionMiddle = document.getElementById('section-middle');
const scoreDisplay = document.getElementById('score-display');
const highScoreDisplaySpan = document.getElementById('high-score-display');
const instructions = document.getElementById('instructions');
const instructStartGame = document.getElementById('instruct-start-game');
const credits = document.getElementById('credits');

// Exported variables
export let score = 0;
export let highScore;
export let counterPelet = 0;
export let pacManSpeed = 200;
export let eyeSize = "small";
export let ghostSize = "small";
export let pacmanCurrentDirection = "left";
export let level = 0;
export const fruitBonusCurrent = [];
export const levelBottom = document.getElementById("level-bottom");
export const fruitBonus = ['🍒','🍓','🍊','🍊','🍎','🍎','🍈','🍈','🚀','🔔','🔑'];
export const fruitBonusValue = [100,300,500,500,700,700,1000,1000,2000,3000,5000];

//Controller
export const btnStart = document.getElementById("control-board-button-1");
export const joystickUp = document.getElementById("joystick-up");
export const joystickDown = document.getElementById("joystick-down");
export const joystickLeft = document.getElementById("joystick-left");
export const joystickRight = document.getElementById("joystick-right");
export const joystickStart = document.getElementById("control-board-button-1");
export const player1Start = document.getElementById("player-1-start");
export const gameGrid = document.getElementById("game-grid");
export const ctnPacManLives = document.getElementById('ctn-pac-man-lives');

let timerPowerPellet;
let currentPelletDuration = 9000;
let fruitBonusIntervalId;

if(JSON.parse(localStorage.getItem("highScore")) !== null) {
    highScore = JSON.parse(localStorage.getItem("highScore"));  
  } else {
    highScore = 0;
}

export function checkForHighScore() {
      if(score >= highScore) {
        highScore = score;
        localStorage.setItem("highScore", JSON.stringify(highScore));
        highScore = JSON.parse(localStorage.getItem("highScore"));
      }
}
checkForHighScore();

let lives = 3;
let ghostsEaten = 0;
let speedStartPacMan;

//toggleGameBoardSize
export function toggleGameBoardSize() {

  const gameBoardSquare = document.querySelectorAll(".game-board-square");

  gameBoardSquare.forEach((div) => {
    if(div.style.width == "var(--game-grid-div-width-small)") {
        // Ghosts       
        eyeSize = "large";
        ghostSize = "large";
      
        if (div.classList.contains("ghost-small")) {
          div.classList.remove("ghost-small");
          div.classList.add("ghost-large");
        }
        if (div.classList.contains("ghost-look-up-small")) {
          div.classList.remove("ghost-look-up-small");
          div.classList.add("ghost-look-up-large");
        }
        if (div.classList.contains("ghost-look-down-small")) {
          div.classList.remove("ghost-look-down-small");
          div.classList.add("ghost-look-down-large");
        }
        if (div.classList.contains("ghost-look-left-small")) {
          div.classList.remove("ghost-look-left-small");
          div.classList.add("ghost-look-left-large");
        }
        if (div.classList.contains("ghost-look-right-small")) {
          div.classList.remove("ghost-look-right-small");
          div.classList.add("ghost-look-right-large");
        }
      
        document.body.style.fontSize = "var(--font-size-large)";
        gameGrid.style.minWidth = "var(--game-grid-min-width-large)";
        gameGrid.style.maxWidth = "var(--game-grid-max-width-large)";
      
        div.style.width = "var(--game-grid-div-width-large)";
        div.style.height = "var(--game-grid-div-height-large)";
      
        instructions.style.display = 'none';
        credits.style.display = 'none';
      
        ctnGame.style.flexDirection = 'column';
        sectionMiddle.style.flexDirection = "row";
    } else {
        // Ghosts       
        eyeSize = "small";
        ghostSize = "large";
      
        if (div.classList.contains("ghost-large")) {
          div.classList.remove("ghost-large");
          div.classList.add("ghost-small");
        }
        if (div.classList.contains("ghost-look-up-large")) {
          div.classList.remove("ghost-look-up-large");
          div.classList.add("ghost-look-up-small");
        }
        if (div.classList.contains("ghost-look-down-large")) {
          div.classList.remove("ghost-look-down-large");
          div.classList.add("ghost-look-down-small");
        }
        if (div.classList.contains("ghost-look-left-large")) {
          div.classList.remove("ghost-look-left-large");
          div.classList.add("ghost-look-left-small");
        }
        if (div.classList.contains("ghost-look-right-large")) {
          div.classList.remove("ghost-look-right-large");
          div.classList.add("ghost-look-right-small");
        }
      
        document.body.style.fontSize = "var(--font-size-small)";
        gameGrid.style.minWidth = "var(--game-grid-min-width-small)";
        gameGrid.style.maxWidth = "var(--game-grid-max-width-small)";
      
        div.style.width = "var(--game-grid-div-width-small)";
        div.style.height = "var(--game-grid-div-height-small)";
      
        instructions.style.display = 'block';
        credits.style.display = 'block';
      
        ctnGame.style.flexDirection = 'row';
        sectionMiddle.style.flexDirection = "column";
    };
  });
}; // toggleGameBoardSize

export function syncPelletClasses() {
  for (let i = 0; i < pelletState.length; i++) {
    // Only add pellet class if no ghost is present
    if (pelletState[i] === 'pellet' && !squares[i].classList.contains('ghost')) {
      squares[i].classList.add('pellet');
    } else {
      squares[i].classList.remove('pellet');
    }
    if (pelletState[i] === 'powerPellet' && !squares[i].classList.contains('ghost')) {
      squares[i].classList.add('powerPellet');
    } else {
      squares[i].classList.remove('powerPellet');
    }
  }
}

// Pac Man
joystickDown.addEventListener('click', ()=>{
  if (
    !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
    !squares[pacmanCurrentIndex + width].classList.contains('lairWall')
  ) {
    pacmanCurrentDirection = "down";
    joystickDown.style.backgroundColor = "orange"; 
    setTimeout(()=>{joystickDown.style.backgroundColor = "transparent"; }, 100);
  }
});
joystickUp.addEventListener('click', ()=>{
  if (
    !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
    pacmanCurrentIndex - width >=0
  ) {  
    pacmanCurrentDirection = "up";
    joystickUp.style.backgroundColor = "orange"; 
    setTimeout(()=>{joystickUp.style.backgroundColor = "transparent"; }, 100);
  }
});
joystickLeft.addEventListener('click', ()=>{
  if( 
  !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
    pacmanCurrentIndex % width !==0
  ) {     
    pacmanCurrentDirection = "left";
    joystickLeft.style.backgroundColor = "orange"; 
    setTimeout(()=>{joystickLeft.style.backgroundColor = "transparent"; }, 100);
  }
});
joystickRight.addEventListener('click', ()=>{
  if(
    !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
    pacmanCurrentIndex % width < width -1
  ) {
    pacmanCurrentDirection = "right";
    joystickRight.style.backgroundColor = "orange"; 
    setTimeout(()=>{joystickRight.style.backgroundColor = "transparent"; }, 100);
  }
});

export function pacManDirection() {

  joystickDown.style.backgroundColor = "transparent";
  joystickRight.style.backgroundColor = "transparent";
  joystickUp.style.backgroundColor = "transparent";
  joystickLeft.style.backgroundColor = "transparent";
 
  switch(event.keyCode){
    case 40:
        if (
        !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + width].classList.contains('lairWall')
        ) {
        pacmanCurrentDirection = "down";
        joystickDown.style.backgroundColor = "orange";
        }
    break;
    case 38:
        if (
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        pacmanCurrentIndex - width >=0
        ) {
        pacmanCurrentDirection = "up";
        joystickUp.style.backgroundColor = "orange";
        }  
    break;
    case 37:
      if( 
        !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
        pacmanCurrentIndex % width !==0
        ) {       
        pacmanCurrentDirection = "left";
        joystickLeft.style.backgroundColor = "orange";
        }
    break;
    case 39:
    if(
        !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
        pacmanCurrentIndex % width < width -1
        ) {        
        pacmanCurrentDirection = "right";
        joystickRight.style.backgroundColor = "orange";
        }
    break;
  }
}

export const width = 28;
export let pacmanCurrentIndex = 658;
export let pacmanPreviousIndex = 658;

export function handleGhostEaten(ghost) {
  reSetLairTextColor("whitesmoke");
  playGhostEatenSounds();

  ghostsEaten += 1;
  score += ghostsEaten * 400;
  squares[433].innerHTML = ghostsEaten * 400;
  setTimeout(() => { squares[433].innerHTML = ''; }, 5000);
  // Set blinky to respawn inside the lair
  squares[ghost.currentIndex].classList.remove(
    ghost.className, 'ghost', ghost.size, ghost.color, ghost.eyes,
    'scared', 'scaredBlink', 'ghost-large', 'ghost-look-up-large',
    'ghost-look-down-large', 'ghost-look-left-large', 'ghost-look-right-large'
  );

  if (ghost.className === 'blinky') {
    ghost.currentIndex = 380;
  } else {
    ghost.currentIndex = ghost.startIndex;
  }

  ghost.isScared = false;

  squares[ghost.currentIndex].classList.add(
    ghost.className, 'ghost', ghost.size, ghost.color, ghost.eyes
  );
}

function getPowerPelletDuration(level) {
  return Math.max(9000 - (level - 1) * 1000, 1000);
}

export function control(x) {
    // Determine how many steps to move
    const inTunnel = squares[pacmanCurrentIndex].classList.contains('tunnel');

    const steps = 1;

   for (let i = 0; i < steps; i++) { 
    pacmanPreviousIndex = pacmanCurrentIndex; 

    squares[pacmanCurrentIndex].classList.remove('pacMan', 'pacMan-move-left', 'pacMan-move-right', 'pacMan-move-up', 'pacMan-move-down');
    switch(pacmanCurrentDirection) {
        case 'down':
        if (
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            !squares[pacmanCurrentIndex + width].classList.contains('lairWall')
            ) { 
            pacmanCurrentIndex += width;
            squares[pacmanCurrentIndex].classList.add('pacMan-move-down');
            }
        break;
        case 'up':
        if (
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >=0
            ) {
            pacmanCurrentIndex -= width;
            squares[pacmanCurrentIndex].classList.add('pacMan-move-up');
            }
        break;
        case 'left': 
        if(pacmanCurrentIndex === 392) {
          pacmanCurrentIndex = 419;
        }  
        if( 
            !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
            pacmanCurrentIndex % width !==0
            ) {
            pacmanCurrentIndex -=1;
            squares[pacmanCurrentIndex].classList.add('pacMan-move-left');
            }
        break;
        case 'right':
        if(pacmanCurrentIndex === 419) {
          pacmanCurrentIndex = 392;
        }  
        if(
            !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
            pacmanCurrentIndex % width < width -1
            ) {
            pacmanCurrentIndex +=1;
            squares[pacmanCurrentIndex].classList.add('pacMan-move-right');
            }
        break;
    }
    // Collision and Points
    if (pelletState[pacmanCurrentIndex] === 'pellet') {
      playPacManEatingPelletsSound();
      squares[pacmanCurrentIndex].classList.remove('pellet');
      pelletState[pacmanCurrentIndex] = null;
      counterPelet += 1;
      score += 10;
    } else {
      stopPacManEatingPelletsSound();
    }

    if (pelletState[pacmanCurrentIndex] === 'powerPellet') {  
      squares[pacmanCurrentIndex].classList.remove('powerPellet');
      pelletState[pacmanCurrentIndex] = null;
      score += 50; 
      stopSiren();
      soundPowerUp.play();
      clearTimeout(timerPowerPellet);

      const pelletDuration = getPowerPelletDuration(level);
      currentPelletDuration = pelletDuration;

      setTimeout(() => {
        soundPowerUp.pause();
        soundPowerUp.currentTime = 0;
      }, pelletDuration);

      ghosts.forEach(ghost => {
        ghost.isScared = true; 
        ghost.hasReversed = false;
      });
        timerPowerPellet = setTimeout(unScareGhosts, pelletDuration);
    }

    if (
      fruitBonusState.present &&
      (
        pacmanCurrentIndex === fruitBonusState.index ||
        (pacmanPreviousIndex === fruitBonusState.index && pacmanCurrentIndex !== pacmanPreviousIndex)
      )
    ) {
      squares[fruitBonusState.index].classList.remove('bonusFruit');
      squares[fruitBonusState.index].innerHTML = '';
      fruitBonusState.present = false;
      fruitBonusState.eaten = true;
      score += fruitBonusState.value;
      soundPacManEatingFruit.play();
      reSetLairTextColor("whitesmoke");
      squares[433].innerHTML = fruitBonusState.value;
      setTimeout(() => { squares[433].innerHTML = ''; }, 5000);
    }

    checkForHighScore();
  
    squares[pacmanCurrentIndex].classList.add('pacMan');
    scoreDisplay.innerText = score;
    highScoreDisplaySpan.innerText = highScore;
   } // end for steps 
   syncPelletClasses();
  } // control

export function levelCurrent(level) {
    for(let i = 0; i < level; i++){
        fruitBonusCurrent.push(fruitBonus[i]);
    }
    levelBottom.innerText = fruitBonusCurrent.reverse();
}

function setPacManSpeed() {
  let speedStartPacMan = setInterval(control, pacManSpeed);  
}

export function levelStart() {
    
  flagBonusLife = false;

  scoreDisplay.innerHTML = score;

  reSetLairTextColor("orange");
  squares[431].innerHTML = "R";
  squares[432].innerHTML = "E";
  squares[433].innerHTML = "A";
  squares[434].innerHTML = "D";
  squares[435].innerHTML = "Y";
  squares[436].innerHTML = "!";  
  
  unScareGhosts();
  resetGhosts();  
  
  setTimeout(function(){ 

    squares[431].innerHTML = "";
    squares[432].innerHTML = "";
    squares[433].innerHTML = "";
    squares[434].innerHTML = "";
    squares[435].innerHTML = "";
    squares[436].innerHTML = ""; 
    reSetLairTextColor(); 
    
    speedStartPacMan = setInterval(control, pacManSpeed);  
    
    // Start Ghosts
    ghosts.forEach(ghost => moveGhost(ghost))
  }, 4250);
} // setPacManSpeed

function addPacManLives(){
  if(level === 1) {  
    for(let i=1;i<lives;i++){
      const pacManLife = document.createElement('div');
      pacManLife.classList.add('pac-man-lives');
      ctnPacManLives.appendChild(pacManLife);
    }
  }  
}

export function checkForGhostCatchesPacMan() {
  ghosts.forEach(ghost => {

    if (ghost.currentIndex === pacmanCurrentIndex) {
      if (ghost.isScared) {
        handleGhostEaten(ghost);
      // Eat pellet if present in pelletState
      if (pelletState[pacmanCurrentIndex] === 'pellet') {
        squares[pacmanCurrentIndex].classList.remove('pellet');
        pelletState[pacmanCurrentIndex] = null;
        counterPelet += 1;
        score += 10;
        playPacManEatingPelletsSound();
      } else {
        stopPacManEatingPelletsSound();
      }
      // Eat power pellet if present in pelletState
      if (pelletState[pacmanCurrentIndex] === 'powerPellet') {
        squares[pacmanCurrentIndex].classList.remove('powerPellet');
        pelletState[pacmanCurrentIndex] = null;
        score += 50;
        stopSiren();
        soundPowerUp.play();
        clearTimeout(timerPowerPellet);

        const pelletDuration = getPowerPelletDuration(level);
        currentPelletDuration = pelletDuration;

        setTimeout(() => {
          soundPowerUp.pause();
          soundPowerUp.currentTime = 0;
        }, pelletDuration);

        ghosts.forEach(g => g.isScared = true);
        timerPowerPellet = setTimeout(unScareGhosts, pelletDuration);
      }  
      } else {
        ghosts.forEach(g => clearInterval(g.timerId));
        loseLife();
        removeGhosts();
      }
    } else if (
      ghost.currentIndex === pacmanPreviousIndex &&
      ghost.previousIndex === pacmanCurrentIndex
    ) {
      if (ghost.isScared) {
        handleGhostEaten(ghost);
      // Eat pellet if present in pelletState
      if (pelletState[pacmanCurrentIndex] === 'pellet') {
        squares[pacmanCurrentIndex].classList.remove('pellet');
        pelletState[pacmanCurrentIndex] = null;
        counterPelet += 1;
        score += 10;
        playPacManEatingPelletsSound();
      } else {
        stopPacManEatingPelletsSound();
      }

      // Eat power pellet if present in pelletState
      if (pelletState[pacmanCurrentIndex] === 'powerPellet') {
        squares[pacmanCurrentIndex].classList.remove('powerPellet');
        pelletState[pacmanCurrentIndex] = null;
        score += 50;
        stopSiren();
        soundPowerUp.play();
        clearTimeout(timerPowerPellet);

        const pelletDuration = getPowerPelletDuration(level);
        currentPelletDuration = pelletDuration;

        setTimeout(() => {
          soundPowerUp.pause();
          soundPowerUp.currentTime = 0;
        }, pelletDuration);

        ghosts.forEach(g => g.isScared = true);
        timerPowerPellet = setTimeout(unScareGhosts, pelletDuration);
      }        
      } else {
        ghosts.forEach(g => clearInterval(g.timerId));
        loseLife();
        removeGhosts();
      }
    }
  });
}

let fruitBonusState = {
  index: 489,         // Where fruit appears
  emoji: null,        // Current fruit emoji
  value: null,        // Current fruit score value
  present: false,     // Is fruit on the board?
  eaten: false,       // Has fruit been eaten?
  timerId: null       // Timeout for fruit disappearance
};

// Function to animate PacMan dying
export function animatePacManDying() {
  squares[pacmanCurrentIndex].classList.add('pacMan-move-die');
  setTimeout(()=>{
    squares[pacmanCurrentIndex].classList.remove('pacMan-move-die');
    squares[pacmanCurrentIndex].classList.remove('pacMan');
  }, 1250);

  setTimeout(()=>{ 
    squares[pacmanCurrentIndex].classList.add('pacMan-explode');
  }, 1250);

  setTimeout(()=>{ 
    squares[pacmanCurrentIndex].classList.remove('pacMan-explode');
  }, 1500);
}

export function loseLife(){

  if (fruitBonusIntervalId) clearInterval(fruitBonusIntervalId);

  stopAllSounds();
  soundDeath.play();
  lives -= 1;

  squares[489].classList.remove('bonusFruit');
  squares[489].innerHTML = '';
  
  if(lives>0){
    document.querySelector('.pac-man-lives').remove();
  }
  
  if(lives === 0) {
    clearInterval(speedStartPacMan);
    animatePacManDying()
    resetGame();
    setTimeout(gameOver, 4000);  
    setTimeout(startToggleTitleAndScoreScreen, 8000);
    
  } else {
    clearInterval(speedStartPacMan);
    animatePacManDying()
    setTimeout(resetPacMan, 4000); 
  }
}  

let flagBonusLife = false;
let counterExtraLife = 1;

export function resizeCurrentPacManLives(){
let currentPacManLives = document.querySelectorAll('.pac-man-lives'); 
  
  if(flagToggled){
    for(let i = 0; i<currentPacManLives.length;i++){
      currentPacManLives[i].style.height = 'var(--game-grid-div-height-large)';
      currentPacManLives[i].style.width = 'var(--game-grid-div-width-large)';
    }
  } else {
    for(let i = 0; i<currentPacManLives.length;i++){
      currentPacManLives[i].style.height = 'var(--game-grid-div-height-small)';
      currentPacManLives[i].style.width = 'var(--game-grid-div-width-small)'; 
    }        
  }     
}

function extraLife() {
  const bonusThreshold  = 10000;
  
  if(score !== 0 && score >= bonusThreshold * counterExtraLife && score < bonusThreshold * (counterExtraLife + 1) && flagBonusLife === false) {
      counterExtraLife += 1;  
      lives += 1;
      flagBonusLife = true;
      soundHighScore.play();
     
      const pacManLife = document.createElement('div');
      pacManLife.classList.add('pac-man-lives');
      ctnPacManLives.appendChild(pacManLife);   
   
      resizeCurrentPacManLives();
    
      reSetLairTextColor("orange");
      squares[431].innerHTML = "E";
      squares[432].innerHTML = "X";
      squares[433].innerHTML = "T";
      squares[434].innerHTML = "R";
      squares[435].innerHTML = "A";
      squares[436].innerHTML = "!";  
    
      setTimeout(function(){ 
      squares[431].innerHTML = "";
      squares[432].innerHTML = "";
      squares[433].innerHTML = "";
      squares[434].innerHTML = "";
      squares[435].innerHTML = "";
      squares[436].innerHTML = "";
      reSetLairTextColor();
    }, 3000);
  }
}
setInterval(extraLife, 500);

function resetGame(){
  if (fruitBonusIntervalId) clearInterval(fruitBonusIntervalId);

  checkForHighScore();

  score = 0;
  level = 0;
  lives = 3;
  counterPelet = 0;
  flagBonusLife = false;
  counterExtraLife = 1;
  pacManSpeed = 200;
  resetGhostsSpeed();
}

function gameOver() {
  reSetLairTextColor("red"); 
  checkForHighScore();
  removePacMan();

  squares[403].innerHTML = "";
  squares[404].innerHTML = "G";
  squares[405].innerHTML = "A";
  squares[406].innerHTML = "M";
  squares[407].innerHTML = "E";
  squares[408].innerHTML = "";      

  squares[431].innerHTML = "";
  squares[432].innerHTML = "O";
  squares[433].innerHTML = "V";
  squares[434].innerHTML = "E";
  squares[435].innerHTML = "R";
  squares[436].innerHTML = "";    

  setTimeout(function(){
  reSetLairTextColor("orange");   
    
  squares[403].innerHTML = "";
  squares[404].innerHTML = "";
  squares[405].innerHTML = "";
  squares[406].innerHTML = "";
  squares[407].innerHTML = "";
  squares[408].innerHTML = "";      

  squares[431].innerHTML = "";
  squares[432].innerHTML = "";
  squares[433].innerHTML = "";
  squares[434].innerHTML = "";
  squares[435].innerHTML = "";
  squares[436].innerHTML = "";     
    
  }, 3500); 
}

function resetPacMan(){
  removePacMan();
  squares[pacmanCurrentIndex].classList.remove('pacMan-move-die');
  pacmanCurrentIndex = 658;
  squares[pacmanCurrentIndex].classList.add('pacMan');  
  levelStart();
}

export function gameStart() {

  if (fruitBonusIntervalId) clearInterval(fruitBonusIntervalId);
  fruitBonusIntervalId = setInterval(() => launchFruitBonus(level, counterPelet), 100);

  if(level === 0){
    soundGameStart.play();
  }
  
  endToggleTitleAndScoreScreen();
  checkForHighScore();

  scoreDisplay.innerHTML = 0;
  levelStart();
  
  removePacMan();
  pacmanCurrentIndex = 658;
  squares[pacmanCurrentIndex].classList.add('pacMan');

  level += 1;
  fruitBonusCurrent.length = 0;
  flagBonusLife = false;
  levelCurrent(level);
  
  setGameBoard();
  roundOutTheGameboard();
  setTunnel();

  clearInterval(speedStartPacMan);

  setLairText();
  addPacManLives();
  
  resizeCurrentPacManLives();
  setInterval(() => launchFruitBonus(level, counterPelet), 100);
}

function launchFruitBonus(level, pelletCount) {
  // Only launch if not already present or eaten
  if (
    !fruitBonusState.present &&
    !fruitBonusState.eaten &&
    (pelletCount === 70 || pelletCount === 170)
  ) {
    fruitBonusState.emoji = fruitBonus[level-1 < fruitBonus.length ? level-1 : fruitBonus.length-1];
    fruitBonusState.value = fruitBonusValue[level-1 < fruitBonusValue.length ? level-1 : fruitBonusValue.length-1];
    fruitBonusState.present = true;
    fruitBonusState.eaten = false;

    squares[fruitBonusState.index].classList.add('bonusFruit');
    squares[fruitBonusState.index].innerHTML = fruitBonusState.emoji;

    // Set timer to clear fruit
    fruitBonusState.timerId = setTimeout(() => {
      clearFruitBonus();
    }, 10000);
  }
}

function clearFruitBonus() {
  squares[fruitBonusState.index].classList.remove('bonusFruit');
  squares[fruitBonusState.index].innerHTML = '';
  fruitBonusState.present = false;
  fruitBonusState.eaten = false;
  fruitBonusState.timerId = null;
}

function clickStartGame() {  
  if(level === 0){
    gameStart();
    joystickStart.style.backgroundColor = "orange";
    setTimeout(()=>{joystickStart.style.backgroundColor = "transparent"; }, 500); 
  }  
}

instructStartGame.addEventListener('click', clickStartGame);

//Start button
btnStart.addEventListener('click', () => {
  clickStartGame();
  joystickStart.style.backgroundColor = "orange";
  setTimeout(()=>{joystickStart.style.backgroundColor = "transparent"; }, 500);  
});

document.addEventListener('keydown', (e) => {
  if(e.keyCode === 83) {
    clickStartGame();
    joystickStart.style.backgroundColor = "orange";
    setTimeout(()=>{joystickStart.style.backgroundColor = "transparent"; }, 500);  
  }
});

export function removePacMan() {
  squares[pacmanCurrentIndex].classList.remove('pacMan', 'pacMan-move-left', 'pacMan-move-right', 'pacMan-move-up', 'pacMan-move-down');
  
  for (let i = 0; i > squares.length; i++ ) {
    squares[i].classList.remove('pacMan', 'pacMan-move-left', 'pacMan-move-right', 'pacMan-move-up', 'pacMan-move-down');
  }
}

export function levelComplete() {
  if (fruitBonusIntervalId) clearInterval(fruitBonusIntervalId);

  stopAllSounds();
  clearInterval(speedStartPacMan);
  
  if(pacManSpeed !== 150) {
    pacManSpeed -= 10;
  }
  
  removePacMan();

  ghosts.forEach(ghost => clearInterval(ghost.timerId));
  ghosts.forEach(ghost => ghost.speed !== 100 ? ghost.speed -= 25 : ghost.speed = ghost.speed)
  
  removeGhosts();

  for(let i = 0; i < squares.length; i++) {
      squares[i].classList.add('level-completed');
    }   
  
  setTimeout(function(){ 
    gameStart();
  }, 3000);  
} // levelComplete

export function checkForLevelComplete(){
    if(counterPelet === 240) {
        counterPelet = 0;
        levelComplete();
    }  
}
setInterval(checkForLevelComplete, 100);

// Ghosts
export class Ghost {
  constructor (className, startIndex, speed, size, color, eyes) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.size = size;
    this.color = color;
    this.eyes = eyes;
    this.currentIndex = startIndex;
    this.previousIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
    this.slowTick = 0;
    this.hasReversed = false;
  }
}

export const ghosts = [
  new Ghost ('blinky', 321, 225,`ghost-${ghostSize}`, 'ghost-red', `ghost-look-left-${eyeSize}`),
  new Ghost ('inky', 376, 275,`ghost-${ghostSize}`, 'ghost-blue', `ghost-look-up-${eyeSize}`),
  new Ghost ('pinky', 377, 250,`ghost-${ghostSize}`, 'ghost-pink', `ghost-look-down-${eyeSize}`),
  new Ghost ('clyde', 378, 300,`ghost-${ghostSize}`, 'ghost-orange', `ghost-look-right-${eyeSize}`),
];

export function startGhosts() {
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className,'ghost', ghost.size, ghost.color, ghost.eyes);
  })
}

export function removeGhosts() {
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.remove(ghost.className,'ghost', ghost.size, ghost.color, ghost.eyes, 'scared', 'scaredBlink');
  })  
}

export function resetGhosts(ghost) {
  
  if (soundGameStart.paused) {
    stopAllSounds(); 
  }

  ghosts.forEach(ghost => clearInterval(ghost.timerId));
  removeGhosts();
  
  ghosts[0].currentIndex = 321;  // blinky 
  ghosts[1].currentIndex = 376; // inky
  ghosts[2].currentIndex = 377; // pinky
  ghosts[3].currentIndex = 378; // clyde
  
  startGhosts();
}

export function resetGhostsSpeed(ghost) {
  
  ghosts[0].speed = 225; // blinky 
  ghosts[1].speed = 275; // inky
  ghosts[2].speed = 250; // pinky
  ghosts[3].speed = 300; // clyde  
}

function isIntersection(index) {
  return intersectionIndices.includes(index);
}

export function moveGhost(ghost) {
  playSiren();

  const directions = [-1, 1, 28, -28];
  let direction = ghost.direction || directions[Math.floor(Math.random() * directions.length)];
  
  ghost.timerId = setInterval(function() {
    let foundValid = false;
    let attempts = 0;

    let shouldSlow = ghost.isScared || squares[ghost.currentIndex].classList.contains('tunnel');
    if (shouldSlow) {
      ghost.slowTick = (ghost.slowTick || 0) + 1;
      if (ghost.slowTick < 2) {
        // Hold position, don't move yet
        return;
      }
      ghost.slowTick = 0; // Reset after moving
    } else {
      ghost.slowTick = 0; // Reset if not slowed
    }
    if (ghost.isScared && !ghost.hasReversed) {
      direction = -direction;
      ghost.hasReversed = true;
    }

    if (isIntersection(ghost.currentIndex)) {
    // Exclude reverse direction unless scared
      const reverseDir = ghost.previousIndex - ghost.currentIndex;

      let validDirections = directions.filter(dir => {
        if (dir === reverseDir) return false;
        const nextIndex = ghost.currentIndex + dir;
        return (
          !squares[nextIndex].classList.contains('ghost') &&
          !squares[nextIndex].classList.contains('lairText') &&
          !squares[nextIndex].classList.contains('wall') &&
          !(dir === 28 && squares[nextIndex].classList.contains('lairWall')) &&
          (nextIndex !== 375) &&
          (nextIndex !== 380)
        );
      });

      if (validDirections.length === 0) {
      validDirections = [reverseDir];
      }
      
      if (validDirections.length > 0) {
        direction = validDirections[Math.floor(Math.random() * validDirections.length)];
        ghost.direction = direction;
      }
    }

    while (!foundValid && attempts < directions.length) {
      const nextIndex = ghost.currentIndex + direction;

      if (
        !squares[nextIndex].classList.contains('ghost') &&
        !squares[nextIndex].classList.contains('lairText') &&
        !squares[nextIndex].classList.contains('wall') &&
        // Only block moving DOWN into a lairWall
        !(direction === 28 && squares[nextIndex].classList.contains('lairWall')) &&
        (nextIndex !== 375) &&
        (nextIndex !== 380)
      ) {
        foundValid = true;
      } else {
        direction = directions[Math.floor(Math.random() * directions.length)];
        attempts++;
      }
    }

    if (foundValid) {
      ghost.previousIndex = ghost.currentIndex;

      // Eye direction
      if (direction === -1) {
        squares[ghost.currentIndex].classList.remove(ghost.eyes);
        ghost.eyes = `ghost-look-left-${eyeSize}`;
      } else if (direction === 1) {
        squares[ghost.currentIndex].classList.remove(ghost.eyes);
        ghost.eyes = `ghost-look-right-${eyeSize}`;
      } else if (direction === 28) {
        squares[ghost.currentIndex].classList.remove(ghost.eyes);
        ghost.eyes = `ghost-look-down-${eyeSize}`;
      } else if (direction === -28) {
        squares[ghost.currentIndex].classList.remove(ghost.eyes);
        ghost.eyes = `ghost-look-up-${eyeSize}`;
      }

      // Calculate next index
      const nextIndex = ghost.currentIndex + direction;

      // Remove pellet/powerPellet class from the new square if needed
      if (pelletState[nextIndex] === 'pellet') {
        squares[nextIndex].classList.remove('pellet');
      }
      if (pelletState[nextIndex] === 'powerPellet') {
        squares[nextIndex].classList.remove('powerPellet');
      }

      // Remove ghost from current square
      squares[ghost.currentIndex].classList.remove(
        ghost.className, 'ghost', ghost.size, ghost.color, ghost.eyes,
        'scared', 'scaredBlink', 'ghost-large', 'ghost-look-up-large',
        'ghost-look-down-large', 'ghost-look-left-large', 'ghost-look-right-large'
      );

      // Tunnel wrap for ghosts
      if (direction === 1 && ghost.currentIndex === 418) {
          ghost.currentIndex = 393;
      } else if (direction === -1 && ghost.currentIndex === 393) {
          ghost.currentIndex = 418;
      } else {
        ghost.currentIndex = nextIndex;
      }

      // Remove pellet/powerPellet class from the new square if needed
      squares[ghost.currentIndex].classList.remove('pellet', 'powerPellet');

      // Add ghost to new square
      squares[ghost.currentIndex].classList.add(
        ghost.className, 'ghost', ghost.size, ghost.color, ghost.eyes
      );
    }

    // If no valid move, ghost stays in place this tick
    if (ghost.isScared) {
      soundGhostSiren1.pause();
      soundGhostSiren1.currentTime = 0;

      squares[ghost.currentIndex].classList.add('scared');
      setTimeout(() => { squares[ghost.currentIndex].classList.add('scaredBlink'); }, currentPelletDuration - 1000);
    }
    syncPelletClasses();
    checkForGhostCatchesPacMan();
  }, ghost.speed);
}

export function unScareGhosts() {
  if (soundGameStart.paused) {
    playSiren();
  }

  ghosts.forEach(ghost => {
    ghost.isScared = false;
    ghost.hasReversed = false;
  });
  
  ghostsEaten = 0;
}