'use strict';
//Two current scores, two scores, one dice image and three buttons;
//Define the variables for the elements
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//Initialization

let activePlayer, currentscore, score, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  activePlayer = 0;
  currentscore = 0;
  score = [0, 0];
  playing = true;
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Roll the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    //check if dice is equal to 1
    if (dice !== 1) {
      //if not equal to one, then add dice to current active player current score
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      //switch player, set the current score to 0 both value and the display element
      switchPlayer();
    }
  }
});
//Add the hold botton, add current score to the total score
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      //current player wins, change the current player display
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      document.getElementById(`name--${activePlayer}`).textContent =
        'Winner!!!';
      playing = false;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//Add new game button to reset everything

btnNew.addEventListener('click', init);
