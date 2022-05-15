'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const newGame = document.querySelector('.btn--new');
const rollingDice = document.querySelector('.btn--roll');
const holdingDice = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, isPlaying;

//Reset game
const resetPlayer = function () {
  //Initial Conditions

  scores = [0, 0];

  //Initialising Current score
  currentScore = 0;
  activePlayer = 0; //Since, the first player is the active player

  //Creating a variable to track whether we won or not. If we won then will stop playing
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

//Base conditions
resetPlayer();

//Switching Player functionality
const switchPlayer = function () {
  //Reset the previous active player score to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //if dice is 1 then change the active player
  activePlayer = activePlayer !== 0 ? 0 : 1;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality

rollingDice.addEventListener('click', function () {
  if (isPlaying) {
    //Generating random numbers
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Rolling the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //If dice is not 1 then adding to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdingDice.addEventListener('click', function () {
  if (isPlaying) {
    //Hold the current score and update its position
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Once score reaches to 50 then finish the game
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.remove('hidden');
      isPlaying = false;
    } else {
      switchPlayer();
    }
  }
});

//Reset score functionality
newGame.addEventListener('click', resetPlayer);
