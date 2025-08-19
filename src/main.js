// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))






import './styles/style.scss'
import { buildGameBoard } from './js/game-board.js';
import { width, toggleGameBoardSize, pacmanCurrentIndex, pacManDirection, pacmanCurrentDirection, control, score, highScore, fruitBonus, levelCurrent, level, fruitBonusCurrent, loseLife, ctnPacManLives, checkForHighScore, player1Start } from './js/helper-functions.js';
import { squares, gameGrid, buildTheBoard, setTitleScreen, setScoreScreen } from './js/game-board.js';

// let flagToggleTittleAndScoreScreen;
let intervalTitleAndScoreScreen = null;

buildTheBoard();
// setTitleScreen();
// setScoreScreen();

// Start Toggle Title And ScoreScreen
export function startToggleTitleAndScoreScreen() {
  player1Start.classList.add("blink");
  setTitleScreen();
  if(intervalTitleAndScoreScreen === null) {
    let flagToggleTitleAndScoreScreen = true;
      
    intervalTitleAndScoreScreen = setInterval(()=>{
      if(flagToggleTitleAndScoreScreen) {
        setScoreScreen();
      } else {
        setTitleScreen();
      }
      flagToggleTitleAndScoreScreen = !flagToggleTitleAndScoreScreen;
        console.log(`intervalTitleAndScoreScreen: ${intervalTitleAndScoreScreen}`);
    }, 5000);
  }
}
startToggleTitleAndScoreScreen();

// End Toggle Tittle And ScoreScreen
export function endToggleTitleAndScoreScreen() {
  player1Start.classList.remove("blink");
  if(intervalTitleAndScoreScreen !== null) {
    clearInterval(intervalTitleAndScoreScreen);
    intervalTitleAndScoreScreen = null;
  }
}


// export const toggleTittleAndScoreScreen = setInterval(()=>{
//     if(flagToggleTittleAndScoreScreen) {
//       setScoreScreen();
//     } else {
//       setTitleScreen();
//     }
//     flagToggleTittleAndScoreScreen = !flagToggleTittleAndScoreScreen;
//   }, 3000);  

// Score Fruit
levelCurrent(level);

// document.addEventListener('keydown', (e) => {
//   if(e.keyCode === 83) {
//     buildGameBoard();
//     gameStart();
//   }
// });

// export function gameStart(){
//   score = 0;
  
//   document.addEventListener('keyup', pacManDirection);
//   setInterval(control, 300);
// }

  document.addEventListener('keyup', pacManDirection);
  // setInterval(control, 200);

const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');
export let flagToggled = false;
const logo = document.getElementById('logo');
const innerCircle = document.getElementById('inner-circle');
const scoreTop = document.getElementById('score-top');

const ctnLevelBottom = document.getElementById('ctn-level-bottom');
const controller = document.getElementById('controller');

const ctnSection1 = document.getElementById('ctn-section-1');

const scoreDisplay = document.getElementById('score-display-fs');
const highScoreDisplay = document.getElementById('high-score-display-fs');
const highScoreDisplaySpan = document.getElementById('high-score-display');
  highScoreDisplaySpan.innerText = highScore;
const controlBoardUpper = document.getElementById('control-board-upper');

// Toggle Theme 
toggleBtn.addEventListener('click', () => {
let pacManLivesWidthAndHeight = document.querySelectorAll('.pac-man-lives');  
    console.log(`pacManLivesWidthAndHeight: ${pacManLivesWidthAndHeight}`);
  toggleGameBoardSize();
  if(toggleBtn.classList.contains('toggled')){
    flagToggled = true;
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
    // document.body.classList.remove('night-theme-body');
    // logo.classList.remove('night-theme-logo');
    innerCircle.classList.remove('inner-circle-pac-man-left');
    innerCircle.classList.add('inner-circle-pac-man-right');
    
    scoreTop.style.minWidth = 'var(--game-grid-min-width-small)';
    scoreTop.style.maxWidth = 'var(--game-grid-min-width-large)';  
    
    ctnLevelBottom.style.minWidth = 'var(--ctn-section-1-full-screen)';
    controller.style.maxWidth = 'var(--ctn-section-2-full-screen)';   
    
    document.body.style.flexDirection = 'row';
    ctnSection1.style.width = '350px';
    scoreTop.style.flexDirection = 'column';
    // scoreDisplay.style.margin = '0 auto';
    scoreTop.style.alignItems = 'center';
    scoreDisplay.style.order = '2';
    highScoreDisplay.style.order = '1';
    
    controlBoardUpper.style.position = 'relative';
     
    let i;
    for (i = 0; i < pacManLivesWidthAndHeight.length; i++) {
      pacManLivesWidthAndHeight[i].style.width = 'var(--game-grid-div-width-large)';
    } 
    // let i;
    for (i = 0; i < pacManLivesWidthAndHeight.length; i++) {
      pacManLivesWidthAndHeight[i].style.height = 'var(--game-grid-div-height-large)';
    }    
  } else {
    flagToggled = false;
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
    // document.body.classList.add('night-theme-body');
    // logo.classList.add('night-theme-logo');
    innerCircle.classList.remove('inner-circle-pac-man-right');
    innerCircle.classList.add('inner-circle-pac-man-left');
    
    scoreTop.style.minWidth = 'var(--game-grid-min-width-small)';
    scoreTop.style.maxWidth = 'var(--game-grid-max-width-small)';
    
    ctnLevelBottom.style.minWidth = 'var(--game-grid-min-width-small)';
    controller.style.maxWidth = 'var(--game-grid-max-width-small)';
    
    document.body.style.flexDirection = 'column';
    
    scoreTop.style.flexDirection = 'row';
    scoreDisplay.style.order = '1';
    highScoreDisplay.style.order = '2';
    
    controlBoardUpper.style.position = 'absolute';

    let i;
    for (i = 0; i < pacManLivesWidthAndHeight.length; i++) {
      pacManLivesWidthAndHeight[i].style.width = 'var(--game-grid-div-width-small)';
    }
    // let i;
    for (i = 0; i < pacManLivesWidthAndHeight.length; i++) {
      pacManLivesWidthAndHeight[i].style.height = 'var(--game-grid-div-height-small)';
    }
    
    }
});