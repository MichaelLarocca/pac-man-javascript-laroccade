import { squares, buildGameBoard, setGameBoard, roundOutTheGameboard, setLairText, setTitleScreen } from './game-board.js';
import { flagToggled, startToggleTitleAndScoreScreen, endToggleTitleAndScoreScreen } from '../main.js';
import { soundGameStart, soundPacManEatingPellets, soundPacManEatingFruit, soundGhostSiren1 } from './audio.js';

export let score = 0;
export let highScore;

let timerPowerPellet;

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
        // highScoreDisplaySpan.innerText = `${highScore}`; Caused error
      }
}
checkForHighScore();

let lives = 3;

export let counterPelet = 0;

let fruitEaten = false;
let ghostsEaten = 0;

const ctnGame = document.getElementById('ctn-game');
const sectionMiddle = document.getElementById('section-middle');

const scoreDisplay = document.getElementById('score-display');
const highScoreDisplaySpan = document.getElementById('high-score-display');

const instructions = document.getElementById('instructions');
const instructStartGame = document.getElementById('instruct-start-game');

const credits = document.getElementById('credits');

let speedStartPacMan;
export let pacManSpeed = 200;
// export let pacManSpeed = 160;

//Controller
export const btnStart = document.getElementById("control-board-button-1");
export const joystickUp = document.getElementById("joystick-up");
export const joystickDown = document.getElementById("joystick-down");
export const joystickLeft = document.getElementById("joystick-left");
export const joystickRight = document.getElementById("joystick-right");
export const joystickStart = document.getElementById("control-board-button-1");
export const player1Start = document.getElementById("player-1-start");
export const gameGrid = document.getElementById("game-grid");

  //toggleGameBoardSize
export let eyeSize = "small";
export let ghostSize = "small";
  export function toggleGameBoardSize() {
    // const gameGrid = document.getElementById("game-grid");
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

// Pac Man
export let pacmanCurrentDirection = "left";

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
            // console.log(`Pac Man down`);
            if (
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            !squares[pacmanCurrentIndex + width].classList.contains('lairWall')
            // pacmanCurrentIndex + width < width * width
            ) {
            pacmanCurrentDirection = "down";
            joystickDown.style.backgroundColor = "orange";
            }
        break;
        case 38:
            // console.log(`Pac Man up`);
            if (
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >=0
            ) {
            pacmanCurrentDirection = "up";
            joystickUp.style.backgroundColor = "orange";
            }  
            break;
        case 37:
            // console.log(`Pac Man left`);
         if( 
            !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
            pacmanCurrentIndex % width !==0
            ) {       
            pacmanCurrentDirection = "left";
            joystickLeft.style.backgroundColor = "orange";
            }
            break;
        case 39:
            // console.log(`Pac Man right`);
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
// squares[658].classList.add('pacMan-move-left');

export function control(x) {
    squares[pacmanCurrentIndex].classList.remove('pacMan', 'pacMan-move-left', 'pacMan-move-right', 'pacMan-move-up', 'pacMan-move-down');
    switch(pacmanCurrentDirection) {
        case 'down':
        // console.log('pressed down');
        if (
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            !squares[pacmanCurrentIndex + width].classList.contains('lairWall')
            // pacmanCurrentIndex + width < width * width
            ) { 
            pacmanCurrentIndex += width;
            squares[pacmanCurrentIndex].classList.add('pacMan-move-down');
            }
        break;
        case 'up':
        // console.log('pressed up');
        if (
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >=0
            ) {
            pacmanCurrentIndex -= width;
            squares[pacmanCurrentIndex].classList.add('pacMan-move-up');
            }
        break;
        case 'left': 
        // console.log('pressed left');
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
        // console.log('pressed right');
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
    if(squares[pacmanCurrentIndex].classList.contains('pellet')) {
      squares[pacmanCurrentIndex].classList.remove('pellet');
      counterPelet += 1;
        // console.log(`counterPelet: ${counterPelet}`);
      score += 10;
        // console.log(`score: ${score}`);
    }
    if(squares[pacmanCurrentIndex].classList.contains('powerPellet')){
      squares[pacmanCurrentIndex].classList.remove('powerPellet');
      score += 50; 
        clearTimeout(timerPowerPellet);
      ghosts.forEach(ghost => ghost.isScared = true);
        timerPowerPellet = setTimeout(unScareGhosts, 10000);
    }
    if(squares[pacmanCurrentIndex].classList.contains('bonusFruit')) {
      squares[pacmanCurrentIndex].classList.remove('bonusFruit');
      if(fruitEaten === false){
         fruitScoreBonus();
      }
    }
  
    // if(score >= highScore) {
    //   highScore = score;
    // }
    checkForHighScore();
    // squares[392].classList.add('powerPellet');
    // squares[419].classList.add('powerPellet');
  
    squares[pacmanCurrentIndex].classList.add('pacMan');
    scoreDisplay.innerText = score;
    // highScoreDisplay.innerText = highScore;
    highScoreDisplaySpan.innerText = highScore;
  } // control

function fruitScoreBonus(){
  if(level < 12) {
    score += fruitBonusValue[level-1];
    squares[433].style.color = 'whitesmoke';
    squares[433].innerHTML = fruitBonusValue[level-1];
      // console.log(`Fruit Eaten! ${fruitBonusValue[level-1]}`);
    fruitEaten = true;
    squares[pacmanCurrentIndex].classList.remove('bonusFruit');
    squares[489].innerHTML = '';  
  } else {
    score += fruitBonusValue[fruitBonusValue.length-1];
    squares[433].style.color = 'whitesmoke';
    squares[433].innerHTML = fruitBonusValue[fruitBonus.length-1];
      // console.log(`Fruit Eaten! ${fruitBonusValue[level-1]}`);
    fruitEaten = true;
    squares[pacmanCurrentIndex].classList.remove('bonusFruit');
    squares[489].innerHTML = '';      
  }
}

// Fruit Score
export let level = 0;
export const fruitBonusCurrent = [];
export const levelBottom = document.getElementById("level-bottom");

// document.getElementById("levelBottom").style.color = 'white';

export const fruitBonus = ['🍒','🍓','🍊','🍊','🍎','🍎','🍈','🍈','🚀','🔔','🔑'];
export const fruitBonusValue = [100,300,500,500,700,700,1000,1000,2000,3000,5000];

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
  
    squares[431].innerHTML = "R";
    squares[432].innerHTML = "E";
    squares[433].innerHTML = "A";
    squares[434].innerHTML = "D";
    squares[435].innerHTML = "Y";
    squares[436].innerHTML = "!";  
  
  unScareGhosts();
  resetGhosts();  
  
  setTimeout(function(){ 
    // alert("Hello"); 
    
    // Code for Level Complete
    // for(let i = 0; i < squares.length; i++) {
    //   squares[i].classList.add('level-completed');
    // }
    
    squares[431].innerHTML = "";
    squares[432].innerHTML = "";
    squares[433].innerHTML = "";
    squares[434].innerHTML = "";
    squares[435].innerHTML = "";
    squares[436].innerHTML = "";  
    
    // setPacManSpeed();
    speedStartPacMan = setInterval(control, pacManSpeed);  
    
    // Start Ghosts
    ghosts.forEach(ghost => moveGhost(ghost))
  }, 4250);
} // setPacManSpeed

// Use K to kill Pac-Man
document.addEventListener('keydown', (e) => {
  if(e.keyCode === 75) {
    loseLife();
  }
});  

export const ctnPacManLives = document.getElementById('ctn-pac-man-lives');

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
  if (
    squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared')) { 
    ghosts.forEach(ghost => clearInterval(ghost.timerId));
    loseLife();
    removeGhosts();
    }
}

export function loseLife(){
  lives -= 1;
  
  if(lives>0){
    document.querySelector('.pac-man-lives').remove();
  }
  
  if(lives === 0) {
    clearInterval(speedStartPacMan);
    squares[pacmanCurrentIndex].classList.add('pacMan-move-die');
    resetGame();
    setTimeout(gameOver, 4000);
    // setTimeout(setTitleScreen, 8000);
  
    setTimeout(startToggleTitleAndScoreScreen, 8000);
    
  } else {
    clearInterval(speedStartPacMan);
    squares[pacmanCurrentIndex].classList.add('pacMan-move-die');
    setTimeout(resetPacMan, 4000); 
  }
  // ghostsEaten = 0;
}  
// Testing
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
  // let checkForBonusLife = score % bonusThreshold;
  
  // if(score !== 0 && score >= bonusThreshold * level && score < bonusThreshold * (level + 1) && flagBonusLife === false) {
  if(score !== 0 && score >= bonusThreshold * counterExtraLife && score < bonusThreshold * (counterExtraLife + 1) && flagBonusLife === false) {
      counterExtraLife += 1;  
      lives += 1;
      flagBonusLife = true;
        // console.log(`extraLife: ${lives}`);
        // console.log(`flagBonusLife: ${flagBonusLife}`)
        // console.log(`Lives: ${lives}`);
     
      const pacManLife = document.createElement('div');
      pacManLife.classList.add('pac-man-lives');
      ctnPacManLives.appendChild(pacManLife);   
   
      resizeCurrentPacManLives();
    
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
    }, 3000);
  }
  // if(score !== 0 && checkForBonusLife === 0 && flagBonusLife === false){
  //     lives += 1;
  //     flagBonusLife = true;
  //       console.log(`extraLife: ${lives}`);
  //       console.log(`flagBonusLife: ${flagBonusLife}`)
  //       console.log(`Lives: ${lives}`);
  //     const pacManLife = document.createElement('div');
  //     pacManLife.classList.add('pac-man-lives');
  //     ctnPacManLives.appendChild(pacManLife);    
  // }
}
setInterval(extraLife, 500);
// End Testing

function resetGame(){
  // scoreDisplay.innerHTML = 0;
  checkForHighScore();
  // highScore = JSON.parse(localStorage.getItem("highScore"));
  score = 0;
  level = 0;
  lives = 3;
  counterPelet = 0;
  fruitEaten = false;
  flagBonusLife = false;
  counterExtraLife = 1;
  pacManSpeed = 200;
  resetGhostsSpeed();
  //ghostsEaten = 0;
}

function gameOver() {
    checkForHighScore();
    // localStorage.setItem("highScore", JSON.stringify(highScore));
    removePacMan();
  
    squares[404].style.color = 'red';
    squares[405].style.color = 'red';
    squares[406].style.color = 'red';
    squares[407].style.color = 'red';

    squares[432].style.color = 'red';
    squares[433].style.color = 'red';
    squares[434].style.color = 'red';
    squares[435].style.color = 'red';  
  
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
      
    squares[404].style.color = 'orange';
    squares[405].style.color = 'orange';
    squares[406].style.color = 'orange';
    squares[407].style.color = 'orange';

    squares[432].style.color = 'orange';
    squares[433].style.color = 'orange';
    squares[434].style.color = 'orange';
    squares[435].style.color = 'orange';        
      
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
   // setInterval(control, 200); 
  // setInterval(speedStartPacMan);
  levelStart();
}

export function gameStart() {
  // soundGhostSiren1.loop = false;
  // soundGhostSiren1.pause();
  // soundGhostSiren1.currentTime = 0;
  soundGameStart.play();
  // clearInterval(toggleTittleAndScoreScreen);
  // clearInterval(startToggleTittleAndScoreScreen);
  endToggleTitleAndScoreScreen();
  
  checkForHighScore();
  // highScore = JSON.parse(localStorage.getItem("highScore"));
  // Testing
  // score = 9000;
  //
  scoreDisplay.innerHTML = 0;
  levelStart();
  
  removePacMan();
  pacmanCurrentIndex = 658;
  squares[pacmanCurrentIndex].classList.add('pacMan');

  // Increment Level
  // level = 9;
  level += 1;
  // counterExtraLife = 1;
  
  // Set Level / Fruit Bonus
  // ghostsEaten = 0;
  fruitBonusCurrent.length = 0;
  flagBonusLife = false;
  levelCurrent(level);
  
  setGameBoard();
  roundOutTheGameboard();

  clearInterval(speedStartPacMan);

  setLairText();
  addPacManLives();
  
  resizeCurrentPacManLives();
  
  
  setInterval(launchFruitBonus1,100);
  setInterval(launchFruitBonus2,100); 
}

function clearFruitBonus1(){
  squares[433].innerHTML = '';
  squares[433].style.color = 'orange';
  squares[489].classList.remove('bonusFruit');
    console.log('clearFruitBonus1');
  squares[489].innerHTML = '';
  fruitEaten = false;
}

function clearFruitBonus2(){
  squares[433].innerHTML = '';
  squares[433].style.color = 'orange';
  squares[489].classList.remove('bonusFruit');
    console.log('clearFruitBonus2');
  squares[489].innerHTML = '';
  fruitEaten = false;
}

function launchFruitBonus1(){
  
  if(counterPelet === 70 && fruitEaten === false){
    clearInterval(launchFruitBonus1);
      console.log(`clearInterval(launchFruitBonus1)`)
    squares[489].classList.add('bonusFruit');
    squares[489].innerHTML = fruitBonus[level-1];
    setTimeout(clearFruitBonus1, 10000);
  }
  
}

function launchFruitBonus2(){
  
  if(counterPelet === 170 && fruitEaten === false){
    clearInterval(launchFruitBonus2);
      console.log(`clearInterval(launchFruitBonus2)`)
    squares[489].classList.add('bonusFruit');
    squares[489].innerHTML = fruitBonus[level-1];
    setTimeout(clearFruitBonus2, 10000);
  }
}

function clickStartGame() {
  // setTitleScreen();
  // resetGhostsSpeed();
  
  if(level === 0){
    gameStart();
    joystickStart.style.backgroundColor = "orange";
    setTimeout(()=>{joystickStart.style.backgroundColor = "transparent"; }, 500); 
  }  
  
  // if(level !== 0) {
  // setTitleScreen();
  // level = 0;  
  // clearInterval(speedStartPacMan);
  // squares[pacmanCurrentIndex].classList.remove('pacMan', 'pacMan-move-left', 'pacMan-move-right', 'pacMan-move-up', 'pacMan-move-down');
  // }

}

instructStartGame.addEventListener('click', clickStartGame);

//Start button
btnStart.addEventListener('click', () => {
  // gameStart();
  clickStartGame();
  joystickStart.style.backgroundColor = "orange";
  setTimeout(()=>{joystickStart.style.backgroundColor = "transparent"; }, 500);  
});

document.addEventListener('keydown', (e) => {
  if(e.keyCode === 83) {
    // gameStart();
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
     // Code for Level Complete
  // clearInterval(speedStartPacMan);
  clearInterval(speedStartPacMan);
  
  if(pacManSpeed !== 150) {
    pacManSpeed -= 10;
      console.log(`pacManSpeed: ${pacManSpeed}`);
  }
  // pacManSpeed -= 10;
    // console.log(`pacManSpeed: ${pacManSpeed}`);
  
  removePacMan();
  // clearInterval(ghost.timerId);
  ghosts.forEach(ghost => clearInterval(ghost.timerId));
  
  
  // ghosts.forEach(ghost => ghost.speed -= 25);
 ghosts.forEach(ghost => ghost.speed !== 100 ? ghost.speed -= 25 : ghost.speed = ghost.speed)
    console.log(`red ghost speed${ghosts[0].speed}`);
  
  removeGhosts();
  // resetGhosts();
  for(let i = 0; i < squares.length; i++) {
      squares[i].classList.add('level-completed');
    }   
  
  setTimeout(function(){ 
    gameStart();
  }, 3000);  
} // levelComplete

export function checkForLevelComplete(){

    if(counterPelet === 240) {
       // console.log('No pelets left!');
        // Increment Level
        counterPelet = 0;
        // checkForFruitBonus1();
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
    this.isScard = false;
    this.timerId = NaN;
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
  ghosts.forEach(ghost => clearInterval(ghost.timerId));
  removeGhosts();
  
  ghosts[0].currentIndex = 321; // blinky 
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
  
export function moveGhost(ghost) {
  // Testing
  // if(!ghost.isScared && squares[ghost.currentIndex].classList.contains('scaredBlink')) {
  //    squares[ghost.currentIndex].classList.remove('scaredBlink');
  //   // setTimeout(()=>{ squares[ghost.currentIndex].classList.add('scaredBlink'); }, 5000);
  // }

  soundGhostSiren1.loop = true;
  soundGhostSiren1.play();
  
  const directions = [-1,1,28, -28];
  let direction = directions[Math.floor(Math.random() * directions.length)];
  
  ghost.timerId = setInterval(function() {
    if (
    !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
    !squares[ghost.currentIndex + direction].classList.contains('lairText') &&
    !squares[ghost.currentIndex + direction].classList.contains('wall') 
    ) {
      // Eye direction
        if(direction === -1) {
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
      
      // Ghost hover over pellets and powerPellets    
      if(squares[ghost.currentIndex + direction].classList.contains('pellet')) {
          // console.log('pellet');
          squares[ghost.currentIndex + direction].classList.remove('pellet');
        squares[ghost.currentIndex].classList.remove(ghost.className,'ghost', ghost.size, ghost.color, ghost.eyes, 'scared', 'scaredBlink', 'ghost-large','ghost-look-up-large', 'ghost-look-down-large', 'ghost-look-left-large', 'ghost-look-right-large');
        ghost.currentIndex += direction;

          squares[ghost.currentIndex - direction].classList.add('pellet');
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', ghost.size, ghost.color, ghost.eyes);      
      } else if(squares[ghost.currentIndex + direction].classList.contains('powerPellet')) {
        console.log('powerPellet');
         squares[ghost.currentIndex + direction].classList.remove('powerPellet');
         squares[ghost.currentIndex].classList.remove(ghost.className,'ghost', ghost.size, ghost.color, ghost.eyes, 'scared', 'scaredBlink', 'ghost-large','ghost-look-up-large', 'ghost-look-down-large', 'ghost-look-left-large', 'ghost-look-right-large');
         ghost.currentIndex += direction;

          squares[ghost.currentIndex - direction].classList.add('powerPellet');
         squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', ghost.size, ghost.color, ghost.eyes); 
      } else {
        squares[ghost.currentIndex].classList.remove(ghost.className,'ghost', ghost.size, ghost.color, ghost.eyes, 'scared', 'scaredBlink', 'ghost-large', 'ghost-look-up-large', 'ghost-look-down-large', 'ghost-look-left-large', 'ghost-look-right-large');
        ghost.currentIndex += direction;

        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', ghost.size, ghost.color, ghost.eyes);           
      }
      // Choose new direction
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }      
     
     if(ghost.isScared) {
      soundGhostSiren1.pause();
      soundGhostSiren1.currentTime = 0;

       // Change ghost direction when scared
       if(direction === 1 ) { direction = -1 };
       if(direction === -1 ) { direction = 1 }; 
       if(direction === 28 ) { direction = -28 };  
       if(direction === -28 ) { direction = 28 };  
      
        squares[ghost.currentIndex].classList.add('scared');
       
        setTimeout(()=>{ squares[ghost.currentIndex].classList.add('scaredBlink'); }, 8000);
        // setTimeout(()=>{ squares[ghost.currentIndex].classList.add('scaredBlink'); }, 5000);
        // setTimeout(()=>{ squares[ghost.currentIndex].classList.remove('scaredBlink'); }, 5001);
      
      /// Testing
      // ghosts.forEach(ghost => clearInterval(ghost.timerId));
      // ghosts.forEach(ghost => ghost.speed = 400);
        // ghosts[0].speed = 300; // blinky 
        // ghosts[1].speed = 300; // inky
        // ghosts[2].speed = 300; // pinky
        // ghosts[3].speed = 300; // clyde  
           // console.log(`ghosts[0].speed: ${ghosts[0].speed}`);
           // console.log(`ghosts[1].speed: ${ghosts[1].speed}`);
           // console.log(`ghosts[2].speed: ${ghosts[2].speed}`);
           // console.log(`ghosts[3].speed: ${ghosts[3].speed}`);

        // removeGhosts();
        // startGhosts();
        // moveGhost(ghost);
       
     } // if(ghost.isScared)
    
    if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacMan')) {
      ghostsEaten += 1;
      score += ghostsEaten * 400;
        console.log(`ghostsEaten score: ${ghostsEaten * 400}`);
      squares[433].style.color = 'whitesmoke';
      squares[433].innerHTML = ghostsEaten * 400;
      setTimeout(()=>{squares[433].innerHTML = ''; }, 5000);      
      // Set blinky to respawn inside the lair
      if(squares[ghost.currentIndex].classList.contains('blinky')) {
          squares[ghost.currentIndex].classList.remove(ghost.className,'ghost', ghost.size, ghost.color, ghost.eyes, 'scared', 'scaredBlink', 'ghost-large', 'ghost-look-up-large', 'ghost-look-down-large', 'ghost-look-left-large', 'ghost-look-right-large');
          ghost.currentIndex = 380;
      } else {
          squares[ghost.currentIndex].classList.remove(ghost.className,'ghost', ghost.size, ghost.color, ghost.eyes, 'scared', 'scaredBlink', 'ghost-large', 'ghost-look-up-large', 'ghost-look-down-large', 'ghost-look-left-large', 'ghost-look-right-large');
          ghost.currentIndex = ghost.startIndex;  
      }  
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', ghost.size, ghost.color, ghost.eyes);  
    }
    checkForGhostCatchesPacMan();
    // checkForHighScore();
      console.log(`ghosts[0].speed: ${ghosts[0].speed}`);
 }, ghost.speed); 
}

export function unScareGhosts() {
  if (soundGameStart.paused) {
    soundGhostSiren1.loop = true;
    soundGhostSiren1.play();
  }

 ghosts.forEach(ghost => ghost.isScared = false);

  // for(let i = 0; i < squares.length; i++) {
  //   squares[i].classList.remove('scaredBlink');
  //   squares[i].classList.remove('pacMan');
  // }  
  
 // ghosts.forEach(ghost => {
 //   ghosts.forEach(ghost => ghost.isScared = false);
    // squares[ghost.currentIndex].classList.remove('scaredBlink');
 //   setTimeout(()=>{ squares[ghost.currentIndex].classList.remove('scaredBlink'); }, 5500);
  // })
  
 ghostsEaten = 0;
  //
 // resetGhostsSpeed(); // Check  level changes
}