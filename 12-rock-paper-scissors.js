let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();
/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/
const rockBtnElem = document.querySelector('.js-rock-btn')
const paperBtnElemc = document.querySelector('.js-paper-btn')
const scissorsBtnElem = document.querySelector('.js-scissors-btn')

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === '✌') {
    if (computerMove === '✊') {
      result = 'You lose.';
    } else if (computerMove === '🖐') {
      result = 'You win.';
    } else if (computerMove === '✌') {
      result = 'Tie.';
    }

  } else if (playerMove === '🖐') {
    if (computerMove === '✊') {
      result = 'You win.';
    } else if (computerMove === '🖐') {
      result = 'Tie.';
    } else if (computerMove === '✌') {
      result = 'You lose.';
    }

  } else if (playerMove === '✊') {
    if (computerMove === '✊') {
      result = 'Tie.';
    } else if (computerMove === '🖐') {
      result = 'You lose.';
    } else if (computerMove === '✌') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1
  } else if (result === 'You lose.') {
    score.losses += 1
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;

  updateScoreElement()

  document.querySelector('.js-moves').innerHTML = `You picked: ${playerMove} - Computer Picked: ${computerMove}`
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `
    Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}`
}

//creates random choices
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = '✊';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = '🖐';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = '✌';
  }

  return computerMove;
}

let playerMove;
let isPlaying = false;
let startAutoPlay;

//const autoPlay = () => {}
function autoPlay() {
  const autoButton = document.querySelector('.auto-play')
  if(!isPlaying) {
    startAutoPlay = setInterval(() => {
      playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000)
    isPlaying = true;
    autoButton.classList.add('is-stopped')
    autoButton.innerHTML = 'Stop Auto'
  } else {
    autoButton.classList.remove('is-stopped')
    autoButton.innerHTML = 'Auto Play'
    clearInterval(startAutoPlay);
    isPlaying = false;
  }
}

document.querySelector('.js-rock-btn').addEventListener('click', () => {
  playGame('✊')
})

document.querySelector('.js-paper-btn').addEventListener('click', () => {
  playGame('🖐')
})

document.querySelector('.js-scissors-btn').addEventListener('click', () => {
  playGame('✌')
});

document.querySelector('.auto-play').addEventListener('click', () => {
  autoPlay();
})


function resetScore() {
  score.wins = 0; score.losses = 0; score.ties = 0;
  updateScoreElement();
  localStorage.removeItem('score');
}

document.querySelector('.js-reset').addEventListener('click', () => {
  showResetOption();
})

function showResetOption() {
  document.querySelector('.js-show-reset-confirmation').innerHTML = `
  Are you sure you want to reset?
  <button class="js-yes-btn">Yes</button>
  <button class="js-no-btn">No</button>
  `
  document.querySelector('.js-yes-btn').addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  })
  
  document.querySelector('.js-no-btn').addEventListener('click', () => {
    hideResetConfirmation();
  })
}


function hideResetConfirmation() {
  document.querySelector('.js-show-reset-confirmation').innerHTML = ''
}