import { levelComplete, counterPelet, fruitBonus, fruitBonusValue, resetGhosts, removeGhosts, startGhosts, eyeSize, ghostSize, Ghost, ghosts, checkForHighScore } from './helper-functions.js';
import { reSetLairTextColor } from './screens.js';

export const squares = [];
export const gameGrid = document.getElementById("game-grid");
export const pelletState = [];

export const intersectionIndices = [
    34, 49,
    141, 146, 149, 152, 155, 158, 161, 166,
    230, 245,
    320, 323,
    377, 378,
    398, 401, 410, 413,
    485, 494,
    566, 569, 578, 581,
    650, 653, 656, 659, 662, 665,
    731, 752,
    824, 827
];

  export const overlayArray = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,3,3,3,3,3,3,3,3,3,3,3,3,1,
    1,3,1,1,1,1,3,1,1,1,1,1,3,1,1,3,1,1,1,1,1,3,1,1,1,1,3,1,
    1,2,1,1,1,1,3,1,1,1,1,1,3,1,1,3,1,1,1,1,1,3,1,1,1,1,2,1,
    1,3,1,1,1,1,3,1,1,1,1,1,3,1,1,3,1,1,1,1,1,3,1,1,1,1,3,1,
    1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,
    1,3,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,3,1,
    1,3,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,3,1,
    1,3,3,3,3,3,3,1,1,3,3,3,3,1,1,3,3,3,3,1,1,3,3,3,3,3,3,1,
    1,1,1,1,1,1,3,1,1,1,1,1,0,1,1,0,1,1,1,1,1,3,1,1,1,1,1,1,
    0,0,0,0,0,1,3,1,1,1,1,1,0,1,1,0,1,1,1,1,1,3,1,0,0,0,0,0,
    0,0,0,0,0,1,3,1,1,0,0,0,0,0,0,0,0,0,0,1,1,3,1,0,0,0,0,0,
    0,0,0,0,0,1,3,1,1,0,1,1,1,9,9,1,1,1,0,1,1,3,1,0,0,0,0,0,
    1,1,1,1,1,1,3,1,1,0,1,0,0,0,0,0,0,1,0,1,1,3,1,1,1,1,1,1,
    0,0,0,0,0,0,3,0,0,0,1,0,0,0,0,0,0,1,0,0,0,3,0,0,0,0,0,0,
    1,1,1,1,1,1,3,1,1,0,1,0,0,0,0,0,0,1,0,1,1,3,1,1,1,1,1,1,
    0,0,0,0,0,1,3,1,1,0,1,1,1,1,1,1,1,1,0,1,1,3,1,0,0,0,0,0,
    0,0,0,0,0,1,3,1,1,0,0,0,0,0,0,0,0,0,0,1,1,3,1,0,0,0,0,0,
    0,0,0,0,0,1,3,1,1,0,1,1,1,1,1,1,1,1,0,1,1,3,1,0,0,0,0,0,
    1,1,1,1,1,1,3,1,1,0,1,1,1,1,1,1,1,1,0,1,1,3,1,1,1,1,1,1,
    1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,3,3,3,3,3,3,3,3,3,3,3,3,1,
    1,3,1,1,1,1,3,1,1,1,1,1,3,1,1,3,1,1,1,1,1,3,1,1,1,1,3,1,
    1,3,1,1,1,1,3,1,1,1,1,1,3,1,1,3,1,1,1,1,1,3,1,1,1,1,3,1,
    1,2,3,3,1,1,3,3,3,3,3,3,3,0,8,3,3,3,3,3,3,3,1,1,3,3,2,1, // Pac Man - 15 
    1,1,1,3,1,1,3,1,1,3,1,1,1,1,1,1,1,1,3,1,1,3,1,1,3,1,1,1,
    1,1,1,3,1,1,3,1,1,3,1,1,1,1,1,1,1,1,3,1,1,3,1,1,3,1,1,1,
    1,3,3,3,3,3,3,1,1,3,3,3,3,1,1,3,3,3,3,1,1,3,3,3,3,3,3,1,
    1,3,1,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,1,3,1,
    1,3,1,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,1,3,1,
    1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  ];

  export const overlayArrayTitleScreen = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, // Pac Man - 15 
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  ];

export const overlayArrayScoreScreen = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0, // Pac Man - 15 
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  ];

export function buildTheBoard() {
    
  for(let i = 0; i < 868; i++) {
    let div = document.createElement("div");
    gameGrid.appendChild(div);  
    squares.push(div);
    squares[i].classList.add('game-board-square');  

    if (intersectionIndices.includes(i)) {
    squares[i].classList.add('intersection');
    }    
  }    
}

export function roundOutTheGameboard(){
  // Round out gameboard
    for(let i = 56; i < 812; i++) {

        // roundTopLeft
        if(squares[i].classList.contains('wall') && squares[i-1].classList.contains('pellet') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('pellet') ||
            squares[i].classList.contains('wall') && squares[i-1].classList.contains('blank') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('pellet') ||
            squares[i].classList.contains('wall') && squares[i-1].classList.contains('blank') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('blank') ||
            squares[i].classList.contains('wall') && squares[i-1].classList.contains('pellet') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('blank')) {
                squares[i].classList.add('roundTopLeft'); 
        }

        // roundTopRight
        if(squares[i].classList.contains('wall') && squares[i+1].classList.contains('pellet') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('pellet') ||
        squares[i].classList.contains('wall') && squares[i+1].classList.contains('blank') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('pellet') || 
        squares[i].classList.contains('wall') && squares[i+1].classList.contains('blank') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('blank') || 
        squares[i].classList.contains('wall') && squares[i+1].classList.contains('pellet') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('blank')) {
            squares[i].classList.add('roundTopRight'); 
        }

        // roundBottomLeft
        if(squares[i].classList.contains('wall') && squares[i-1].classList.contains('pellet') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('pellet') || 
        squares[i].classList.contains('wall') && squares[i-1].classList.contains('blank') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('blank') ||
        squares[i].classList.contains('wall') && squares[i-1].classList.contains('pellet') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('blank') || 
        squares[i-1].classList.contains('blank') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('pellet')) {
            squares[i].classList.add('roundBottomLeft'); 
        } 

        // roundBottomRight
        if(squares[i].classList.contains('wall') && squares[i+1].classList.contains('pellet') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('pellet') || 
        squares[i].classList.contains('wall') && squares[i+1].classList.contains('blank') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('pellet') ||
        squares[i].classList.contains('wall') && squares[i+1].classList.contains('blank') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('blank') || 
        squares[i].classList.contains('wall') && squares[i+1].classList.contains('pellet') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('blank')) {
            squares[i].classList.add('roundBottomRight'); 
        }                      
    }

    squares[252].classList.add('roundBottomLeft');
    squares[293].classList.add('roundBottomLeft');
    squares[364].classList.remove('roundTopLeft');
    squares[391].classList.remove('roundTopRight');
    squares[420].classList.remove('roundTopLeft');
    squares[447].classList.remove('roundTopRight');
    squares[559].classList.add('roundTopRight');
    squares[630].classList.add('roundBottomRight');
}

export function setTunnel() {
    squares[392].classList.add('tunnel');
    squares[393].classList.add('tunnel');
    squares[394].classList.add('tunnel');
    squares[395].classList.add('tunnel');
    squares[396].classList.add('tunnel');

    squares[415].classList.add('tunnel');
    squares[416].classList.add('tunnel');
    squares[417].classList.add('tunnel');
    squares[418].classList.add('tunnel');
    squares[419].classList.add('tunnel');
}

export function setGameBoard() { 
    reSetLairTextColor();

    for(let i = 0; i < squares.length; i++) {
    squares[i].classList.remove('pacMan', 'pacMan-move-left', 'pacMan-move-right', 'pacMan-move-up', 'pacMan-move-down', 
                                'blank', 'wall', 'powerPellet', 'pellet', 'ghost', 'ghost-look-left', 'ghost-look-up', 'ghost-look-down', 'ghost-look-right',
                                'blinky', 'pinky', 'inky', 'clyde', 'lairWall', 'bonusFruit', 'roundBottomLeft', 'roundBottomRight',
                               'roundTopLeft', 'roundTopRight', 'level-completed', 
                                'ghost-look-up-small', 'ghost-look-down-small', 'ghost-look-left-small', 'ghost-look-right-small', 
                                'ghost-look-up-large', 'ghost-look-down-large', 'ghost-look-left-large', 'ghost-look-right-large', 
                                'ghost-small', 'ghost-large', 'ghost-red', 'ghost-pink', 'ghost-blue', 'ghost-orange', 'tunnel');
     
    squares[i].innerHTML = '';
    squares[i].style.color = 'orange';
      
    if(overlayArray[i] === 0) {
        squares[i].classList.add('blank');
    }
    if(overlayArray[i] === 1) {
        squares[i].classList.add('wall');
    }
    if(overlayArray[i] === 8) {
        squares[i].classList.add('pacMan');
        squares[i].classList.add('pacMan-move-left');
    }  
    if(overlayArray[i] === 9) {
        squares[i].classList.add('lairWall');
    } 
    // Pellet state logic (only one of these will be true per square)
    if(overlayArray[i] === 10) {
        squares[i].classList.add('bonusFruit');
    } 
    
    if(overlayArray[i] === 2) {
        squares[i].classList.add('powerPellet');
        pelletState[i] = 'powerPellet'; // Track state
    } else if(overlayArray[i] === 3) {
        squares[i].classList.add('pellet');
        pelletState[i] = 'pellet'; // Track state
    } else {
        pelletState[i] = null; // Track state
    }
  } // add ghosts

  removeGhosts();
  resetGhosts();

} // setGameBoard

function addIntersections() {
    intersectionIndices.forEach(idx => {
        squares[idx].classList.add('intersection');
    });
}

export function buildGameBoard(){
  buildTheBoard();
  setGameBoard();
  roundOutTheGameboard();
  addIntersections();
}