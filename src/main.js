// This is a fan-made, educational project inspired by Pac-Man (Namco).
// See README.md for full disclaimer and licensing details.

import './styles/style.scss'
import { buildGameBoard } from './js/game-board.js';
import { width, toggleGameBoardSize, pacmanCurrentIndex, pacManDirection, pacmanCurrentDirection, control, score, highScore, fruitBonus, levelCurrent, level, fruitBonusCurrent, loseLife, ctnPacManLives, checkForHighScore, player1Start } from './js/helper-functions.js';
import { squares, gameGrid, buildTheBoard } from './js/game-board.js';
import { addBlinkToPressStart, removeBlinkFromPressStart, setScoreScreen, setTitleScreen } from './js/screens.js';
let intervalTitleAndScoreScreen = null;

buildTheBoard();

// Start Toggle Title And ScoreScreen
export function startToggleTitleAndScoreScreen() {
  player1Start.classList.add("blink");
  addBlinkToPressStart();
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

    }, 5000);
  }
}
startToggleTitleAndScoreScreen();

// End Toggle Tittle And ScoreScreen
export function endToggleTitleAndScoreScreen() {
  player1Start.classList.remove("blink");
  removeBlinkFromPressStart();

  if(intervalTitleAndScoreScreen !== null) {
    clearInterval(intervalTitleAndScoreScreen);
    intervalTitleAndScoreScreen = null;
  }
}

document.addEventListener('keyup', pacManDirection);

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
const controlBoardUpper = document.getElementById('control-board-upper');

highScoreDisplaySpan.innerText = highScore;

levelCurrent(level);

// Toggle Theme 
toggleBtn.addEventListener('click', () => {
let pacManLivesWidthAndHeight = document.querySelectorAll('.pac-man-lives');  

  toggleGameBoardSize();
  if(toggleBtn.classList.contains('toggled')){
    flagToggled = true;
    toggleBtn.classList.remove('toggled');

    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');

    innerCircle.classList.remove('inner-circle-pac-man-left');
    innerCircle.classList.add('inner-circle-pac-man-right');
    
    scoreTop.style.minWidth = 'var(--game-grid-min-width-small)';
    scoreTop.style.maxWidth = 'var(--game-grid-min-width-large)';  
    
    ctnLevelBottom.style.minWidth = 'var(--ctn-section-1-full-screen)';

    controller.style.maxWidth = 'var(--ctn-section-2-full-screen)';   
    
    document.body.style.flexDirection = 'row';
    ctnSection1.style.width = '350px';

    scoreTop.style.flexDirection = 'column';
    scoreTop.style.alignItems = 'center';
    scoreDisplay.style.order = '2';
    highScoreDisplay.style.order = '1';
    
    controlBoardUpper.style.position = 'relative';
     
    let i;
    for (i = 0; i < pacManLivesWidthAndHeight.length; i++) {
      pacManLivesWidthAndHeight[i].style.width = 'var(--game-grid-div-width-large)';
    } 

    for (i = 0; i < pacManLivesWidthAndHeight.length; i++) {
      pacManLivesWidthAndHeight[i].style.height = 'var(--game-grid-div-height-large)';
    }    

  } else {
    flagToggled = false;
    toggleBtn.classList.add('toggled');
    
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');

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

    for (i = 0; i < pacManLivesWidthAndHeight.length; i++) {
      pacManLivesWidthAndHeight[i].style.height = 'var(--game-grid-div-height-small)';
    }
    
    }
});