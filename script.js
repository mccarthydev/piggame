'use strict';

const scores = [0, 0];
let currentScore = 0;
let playerTurn = 0;
let playing = true;

const reset = function () {
  //reset scores
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  //reset current
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  currentScore = 0;
  //reset dice
  document.querySelector('.dice').classList.add('hidden');
  //reset player turn
  playerTurn = 0;
  //reset player focus and styles
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  //playing
  playing = true;
};

const changePlayer = function () {
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  document.querySelector(`#current--${playerTurn}`).textContent = 0;
  currentScore = 0;
  playerTurn = playerTurn === 0 ? 1 : 0;
};

const diceRoll = function () {
  if (playing) {
    let diceResult;
    diceResult = Math.trunc(Math.random() * 6 + 1);

    document.querySelector('.dice').src = `dice-${diceResult}.png`;
    document.querySelector('.dice').classList.remove('hidden');

    currentScore += diceResult;

    console.log(scores);

    if (diceResult !== 1) {
      document.querySelector(`#current--${playerTurn}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
};

const scoreHold = function () {
  if (playing) {
    scores[playerTurn] += currentScore;
    document.querySelector(`#score--${playerTurn}`).textContent =
      scores[playerTurn];
    if (scores[playerTurn] >= 100) {
      winGame();
    }
    changePlayer();
  }
};

const winGame = function () {
  playing = false;
  document
    .querySelector(`.player--${playerTurn}`)
    .classList.add('player--winner');
};

document.querySelector('.btn--new').addEventListener('click', reset);
document.querySelector('.btn--roll').addEventListener('click', diceRoll);
document.querySelector('.btn--hold').addEventListener('click', scoreHold);
reset();
