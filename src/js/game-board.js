import { levelComplete, counterPelet, fruitBonus, fruitBonusValue, resetGhosts, removeGhosts, startGhosts, eyeSize, ghostSize, Ghost, ghosts, checkForHighScore } from './helper-functions.js';
export const squares = [];
export const gameGrid = document.getElementById("game-grid");
export const pelletState = [];

  const overlayArray = [
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

  const overlayArrayTitleScreen = [
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


const overlayArrayScoreScreen = [
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
  }    
}

export function roundOutTheGameboard(){
  // Round out gameboard
      for(let i = 56; i < 812; i++) {
          // squares[i].classList.add('bonusFruit');

          // roundTopLeft
          if(squares[i].classList.contains('wall') && squares[i-1].classList.contains('pellet') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('pellet') ||
          squares[i].classList.contains('wall') && squares[i-1].classList.contains('blank') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('pellet') ||
          squares[i].classList.contains('wall') && squares[i-1].classList.contains('blank') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('blank') ||
          squares[i].classList.contains('wall') && squares[i-1].classList.contains('pellet') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('blank')) {
          //    squares[i].classList.add('bonusFruit'); 
             squares[i].classList.add('roundTopLeft'); 
          }

          // roundTopRight
          if(squares[i].classList.contains('wall') && squares[i+1].classList.contains('pellet') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('pellet') ||
          squares[i].classList.contains('wall') && squares[i+1].classList.contains('blank') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('pellet') || 
          squares[i].classList.contains('wall') && squares[i+1].classList.contains('blank') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('blank') || 
          squares[i].classList.contains('wall') && squares[i+1].classList.contains('pellet') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('blank')) {
          //    squares[i].classList.add('bonusFruit'); 
             squares[i].classList.add('roundTopRight'); 
          }

          // roundBottomLeft
          if(squares[i].classList.contains('wall') && squares[i-1].classList.contains('pellet') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('pellet') || 
          squares[i].classList.contains('wall') && squares[i-1].classList.contains('blank') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('blank') ||
          squares[i].classList.contains('wall') && squares[i-1].classList.contains('pellet') && squares[i+1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('blank') || 
          squares[i-1].classList.contains('blank') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('pellet')) {
          //    squares[i].classList.add('bonusFruit'); 
             squares[i].classList.add('roundBottomLeft'); 
          } 

          // roundBottomRight
          if(squares[i].classList.contains('wall') && squares[i+1].classList.contains('pellet') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('pellet') || 
          squares[i].classList.contains('wall') && squares[i+1].classList.contains('blank') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('pellet') ||
          squares[i].classList.contains('wall') && squares[i+1].classList.contains('blank') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('blank') || 
          squares[i].classList.contains('wall') && squares[i+1].classList.contains('pellet') && squares[i-1].classList.contains('wall') && squares[i-28].classList.contains('wall') && squares[i+28].classList.contains('blank')) {
          //    squares[i].classList.add('bonusFruit'); 
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

export function reSetLairTextColor(color = "black") {
  document.querySelectorAll('.lairText').forEach(el => {
    el.style.color = color;
  });
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

export function setLairText() {
     // 
    reSetLairTextColor();
    squares[403].classList.add('lairText');
    squares[404].classList.add('lairText');
    squares[405].classList.add('lairText');
    squares[406].classList.add('lairText');
    squares[407].classList.add('lairText');
    squares[408].classList.add('lairText');  
  
    squares[431].classList.add('lairText');
    squares[432].classList.add('lairText');
    squares[433].classList.add('lairText');
    squares[434].classList.add('lairText');
    squares[435].classList.add('lairText');
    squares[436].classList.add('lairText');

    //lairText
    reSetLairTextColor("orange");
    squares[431].innerHTML = "R";
    squares[432].innerHTML = "E";
    squares[433].innerHTML = "A";
    squares[434].innerHTML = "D";
    squares[435].innerHTML = "Y";
    squares[436].innerHTML = "!";  
  
    // squares[489].style.color = "white";  
    // squares[489].innerHTML = "fruit";  
}

export function setTitleScreen() {
 reSetLairTextColor();
 for(let i = 0; i < squares.length; i++) {
   
     squares[i].classList.remove('pacMan', 'pacMan-move-left', 'pacMan-move-right', 'pacMan-move-up', 'pacMan-move-down','blank', 'wall', 'powerPellet', 'pellet', 'ghost', 'ghost-small','ghost-large', 'ghost-look-left', 'ghost-look-up', 'ghost-look-down', 'ghost-look-right',
                                'blinky', 'pinky', 'inky', 'clyde', 'lairWall', 'bonusFruit', 'roundBottomLeft', 'roundBottomRight',
                               'roundTopLeft', 'roundTopRight', 'level-completed.', 'tunnel');  
   
    squares[i].style.color = 'whitesmoke';
   
          squares[317].innerHTML = "";
          squares[373].innerHTML = "";
          squares[429].innerHTML = "";
          squares[485].innerHTML = "";
   
         if(overlayArrayTitleScreen[i] === 0) {
           squares[i].innerHTML = "";
         }
   
          if(overlayArrayTitleScreen[i] === 0) {
              squares[i].classList.add('blank');
          }
          if(overlayArrayTitleScreen[i] === 1) {
              squares[i].classList.add('wall');
          }
          if(overlayArrayTitleScreen[i] === 2) {
              squares[i].classList.add('powerPellet');
          }
          if(overlayArrayTitleScreen[i] === 3) {
              squares[i].classList.add('pellet');
          }
          if(overlayArrayTitleScreen[i] === 4) {
              squares[i].classList.add(`ghost-${ghostSize}`);
              squares[i].classList.add(`ghost-look-left-${eyeSize}`);
              squares[i].classList.add('ghost-red');
              squares[i].classList.add('blinky');
            // squares[i].classList.add('scared');
          }
          if(overlayArrayTitleScreen[i] === 5) {
              squares[i].classList.add(`ghost-${ghostSize}`);
              squares[i].classList.add(`ghost-look-up-${eyeSize}`);
              squares[i].classList.add('ghost-pink');
              squares[i].classList.add('pinky');
          }
          if(overlayArrayTitleScreen[i] === 6) {
              squares[i].classList.add(`ghost-${ghostSize}`);
              squares[i].classList.add(`ghost-look-down-${eyeSize}`);
              squares[i].classList.add('ghost-blue');
              squares[i].classList.add('inky');
          }
          if(overlayArrayTitleScreen[i] === 7) {
              squares[i].classList.add(`ghost-${ghostSize}`);
              squares[i].classList.add(`ghost-look-right-${eyeSize}`);
              squares[i].classList.add('ghost-orange');
              squares[i].classList.add('clyde');
          }
          if(overlayArrayTitleScreen[i] === 8) {
              squares[i].classList.add('pacMan');
              squares[i].classList.add('pacMan-move-left');
          }  
          if(overlayArrayTitleScreen[i] === 9) {
              squares[i].classList.add('lairWall');
          } 
          if(overlayArrayTitleScreen[i] === 10) {
              squares[i].classList.add('bonusFruit');
          }     
 } 
    squares[206].innerHTML = "C";
    squares[207].innerHTML = "H";
    squares[208].innerHTML = "A";
    squares[209].innerHTML = "R";
    squares[210].innerHTML = "A";
    squares[211].innerHTML = "C";   
    squares[212].innerHTML = "T"; 
    squares[213].innerHTML = "E"; 
    squares[214].innerHTML = "R"; 
    squares[215].innerHTML = "S"; 
  
    squares[319].innerHTML = "-";
    squares[320].innerHTML = "B";
    squares[321].innerHTML = "L";
    squares[322].innerHTML = "I";
    squares[323].innerHTML = "N";
    squares[324].innerHTML = "K";
    squares[325].innerHTML = "Y";
  
    squares[375].innerHTML = "-";
    squares[376].innerHTML = "P";
    squares[377].innerHTML = "I";
    squares[378].innerHTML = "N";
    squares[379].innerHTML = "K";
    squares[380].innerHTML = "Y";
  
    squares[431].innerHTML = "-";
    squares[432].innerHTML = "I";
    squares[433].innerHTML = "N";
    squares[434].innerHTML = "K";
    squares[435].innerHTML = "Y";
  
    squares[487].innerHTML = "-";
    squares[488].innerHTML = "C";
    squares[489].innerHTML = "L";
    squares[490].innerHTML = "Y";
    squares[491].innerHTML = "D";
    squares[492].innerHTML = "E";
  
    squares[685].classList.add('pellet');
    squares[686].innerHTML = '10';
    squares[687].innerHTML = 'points';

    squares[713].classList.add('powerPellet');
    squares[714].innerHTML = '50';
    squares[715].innerHTML = 'points';  
  
    squares[793].innerHTML = "P";
    squares[794].innerHTML = "R";
    squares[795].innerHTML = "E";
    squares[796].innerHTML = "S";
    squares[797].innerHTML = "S";
    squares[798].innerHTML = "";   
  
    squares[800].innerHTML = "S";
    squares[801].innerHTML = "T";
    squares[802].innerHTML = "A";
    squares[803].innerHTML = "R";
    squares[804].innerHTML = "T";
    squares[805].innerHTML = "!";  
} // setTitleScreen

export function setScoreScreen() {
 reSetLairTextColor();   
 for(let i = 0; i < squares.length; i++) {
   
   squares[i].classList.remove('pacMan', 'pacMan-move-left', 'pacMan-move-right', 'pacMan-move-up', 'pacMan-move-down','blank', 'wall', 'powerPellet', 'pellet', 'ghost', 'ghost-small','ghost-large', 'ghost-look-left', 'ghost-look-up', 'ghost-look-down', 'ghost-look-right',
                               'blinky', 'pinky', 'inky', 'clyde', 'lairWall', 'bonusFruit', 'roundBottomLeft', 'roundBottomRight',
                               'roundTopLeft', 'roundTopRight', 'level-completed', 'tunnel');  

   squares[i].style.color = 'whitesmoke';
   
   if(overlayArrayTitleScreen[i] === 0) {
     squares[i].innerHTML = "";
   }
          if(overlayArrayTitleScreen[i] === 4) {
              squares[i].classList.remove(`ghost-${ghostSize}`);
              squares[i].classList.remove(`ghost-look-left-${eyeSize}`);
              squares[i].classList.remove('ghost-red');
              squares[i].classList.remove('blinky');
            // squares[i].classList.add('scared');
          }
          if(overlayArrayTitleScreen[i] === 5) {
              squares[i].classList.remove(`ghost-${ghostSize}`);
              squares[i].classList.remove(`ghost-look-up-${eyeSize}`);
              squares[i].classList.remove('ghost-pink');
              squares[i].classList.remove('pinky');
          }
          if(overlayArrayTitleScreen[i] === 6) {
              squares[i].classList.remove(`ghost-${ghostSize}`);
              squares[i].classList.remove(`ghost-look-down-${eyeSize}`);
              squares[i].classList.remove('ghost-blue');
              squares[i].classList.remove('inky');
          }
          if(overlayArrayTitleScreen[i] === 7) {
              squares[i].classList.remove(`ghost-${ghostSize}`);
              squares[i].classList.remove(`ghost-look-right-${eyeSize}`);
              squares[i].classList.remove('ghost-orange');
              squares[i].classList.remove('clyde');
          }   

   if(overlayArrayScoreScreen[i] === 8) {
     squares[i].classList.add('pacMan');
     squares[i].classList.add('pacMan-move-left');
   }  
 } 
  
    squares[65].innerHTML = "B";
    squares[66].innerHTML = "O";
    squares[67].innerHTML = "N";
    squares[68].innerHTML = "U";   
    squares[69].innerHTML = "S"; 

    squares[72].innerHTML = "P";
    squares[73].innerHTML = "O";
    squares[74].innerHTML = "I";
    squares[75].innerHTML = "N";   
    squares[76].innerHTML = "T"; 
    squares[77].innerHTML = "S"; 
  
    squares[152].innerHTML = "🍒";
    squares[154].innerHTML = "-";
    squares[155].innerHTML = "1";
    squares[156].innerHTML = "0";
    squares[157].innerHTML = "0";
  
    squares[208].innerHTML = "🍓";
    squares[210].innerHTML = "-";
    squares[211].innerHTML = "3";
    squares[212].innerHTML = "0";
    squares[213].innerHTML = "0";

    squares[264].innerHTML = "🍊";
    squares[266].innerHTML = "-";
    squares[267].innerHTML = "5";
    squares[268].innerHTML = "0";
    squares[269].innerHTML = "0";
  
    squares[320].innerHTML = "🍎";
    squares[322].innerHTML = "-";
    squares[323].innerHTML = "7";
    squares[324].innerHTML = "0";
    squares[325].innerHTML = "0";
  
    squares[376].innerHTML = "🍈";
    squares[378].innerHTML = "-";
    squares[379].innerHTML = "1 ,";
    squares[380].innerHTML = "0";
    squares[381].innerHTML = "0";
    squares[382].innerHTML = "0";
  
    squares[432].innerHTML = "🚀";
    squares[434].innerHTML = "-";
    squares[435].innerHTML = "2 ,";
    squares[436].innerHTML = "0";
    squares[437].innerHTML = "0";
    squares[438].innerHTML = "0";
  
    squares[488].innerHTML = "🔔";
    squares[490].innerHTML = "-";
    squares[491].innerHTML = "3 ,";
    squares[492].innerHTML = "0";
    squares[493].innerHTML = "0";
    squares[494].innerHTML = "0";
  
    squares[544].innerHTML = "🔑";
    squares[546].innerHTML = "-";
    squares[547].innerHTML = "5 ,";
    squares[548].innerHTML = "0";
    squares[549].innerHTML = "0";
    squares[550].innerHTML = "0";
  
    squares[653].innerHTML = 'E';
    squares[654].innerHTML = 'X';
    squares[655].innerHTML = 'T';
    squares[656].innerHTML = 'R';
    squares[657].innerHTML = 'A';  
  
    squares[661].innerHTML = '1';
    squares[662].innerHTML = '0 ,';
    squares[663].innerHTML = '0';
    squares[664].innerHTML = '0';
    squares[665].innerHTML = '0';
  
    squares[793].innerHTML = "P";
    squares[794].innerHTML = "R";
    squares[795].innerHTML = "E";
    squares[796].innerHTML = "S";
    squares[797].innerHTML = "S";
    squares[798].innerHTML = "";   
  
    squares[800].innerHTML = "S";
    squares[801].innerHTML = "T";
    squares[802].innerHTML = "A";
    squares[803].innerHTML = "R";
    squares[804].innerHTML = "T";
    squares[805].innerHTML = "!";  
} // setScoreScreen

export function addBlinkToPressStart() {    
    squares[793].classList.add('blink');
    squares[794].classList.add('blink');
    squares[795].classList.add('blink');
    squares[796].classList.add('blink');
    squares[797].classList.add('blink');
    squares[798].classList.add('blink');

    squares[800].classList.add('blink');
    squares[801].classList.add('blink');
    squares[802].classList.add('blink');
    squares[803].classList.add('blink');
    squares[804].classList.add('blink');
    squares[805].classList.add('blink');    
}

export function removeBlinkFromPressStart() {
    squares[793].classList.remove('blink');
    squares[794].classList.remove('blink');
    squares[795].classList.remove('blink');
    squares[796].classList.remove('blink');
    squares[797].classList.remove('blink');
    squares[798].classList.remove('blink');

    squares[800].classList.remove('blink');
    squares[801].classList.remove('blink');
    squares[802].classList.remove('blink');
    squares[803].classList.remove('blink');
    squares[804].classList.remove('blink');
    squares[805].classList.remove('blink');
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
          // squares[i].classList.add('game-board-square');      
    squares[i].innerHTML = '';
    squares[i].style.color = 'orange';
      
          if(overlayArray[i] === 0) {
              squares[i].classList.add('blank');
          }
          if(overlayArray[i] === 1) {
              squares[i].classList.add('wall');
              // squares[i].classList.add('level-completed');
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
  // startGhosts();
  removeGhosts();
  resetGhosts();
  // ghosts.forEach(ghost => moveGhost(ghost));
 } // setGameBoard

export function buildGameBoard(){
  buildTheBoard();
  setGameBoard();
  roundOutTheGameboard();
  // setLairText();
} // function buildGameBoard

