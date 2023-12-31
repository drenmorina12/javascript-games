const possibleChoices = document.querySelectorAll(".option");
const playerChoiceImg = document.querySelector(".player-choice-img");
const computerChoiceImg = document.querySelector(".computer-choice-img");
const ROUNDS = 3;

let playerChoice;
let playerColor;
let result;
let computerChoice;
let computerColor;

let round = 1;
let playerRound = 0;
let computerRound = 0;
let playerScore = 0;
let computerScore = 0;

function playerAttributes() {
  playerChoiceImg.setAttribute("src", "images/" + playerColor + ".png");
  playerChoiceImg.classList.add("player-img");
}

function computerAttributes() {
  computerChoiceImg.setAttribute("src", "images/" + computerColor + ".png");
  computerChoiceImg.classList.add("computer-img");
}

function generateComputerChoice() {
  const randomChoice =
    possibleChoices[Math.floor(Math.random() * possibleChoices.length)].id;
  computerChoice = randomChoice;
  computerColor = computerChoice;
}

function colorDistinction() {
  if (result == "win") {
    playerColor += "-green";
    computerColor += "-red";
  } else if (result == "lose") {
    playerColor += "-red";
    computerColor += "-green";
  }
}

function getResult() {
  if (computerChoice === playerChoice) {
    result = "draw";
  } else if (computerChoice === "rock" && playerChoice === "paper") {
    result = "win";
  } else if (computerChoice === "paper" && playerChoice === "scissors") {
    result = "win";
  } else if (computerChoice === "scissors" && playerChoice === "rock") {
    result = "win";
  } else result = "lose";
}

function updateResultBoxes() {
  const playerResult = document.querySelector(
    ".player-side .result-boxes .result-box-" + round
  );
  const computerResult = document.querySelector(
    ".computer-side .result-boxes .result-box-" + round
  );

  if (result == "win") {
    playerResult.innerHTML = '<img src="images/tick.jpg" alt="Tick">';
    computerResult.innerHTML = '<img src="images/x.png" alt="x">';
    round++;
    playerRound++;
  } else if (result == "lose") {
    playerResult.innerHTML = '<img src="images/x.png" alt="x">';
    computerResult.innerHTML = '<img src="images/tick.jpg" alt="tick">';
    round++;
    computerRound++;
  }
}

function resetRound() {
  playerRound = 0;
  computerRound = 0;
  round = 1;
  for (let i = 1; i <= ROUNDS; i++) {
    const resetPlayer = document.querySelector(
      ".player-side .result-boxes .result-box-" + i
    );
    const resetComputer = document.querySelector(
      ".computer-side .result-boxes .result-box-" + i
    );
    resetPlayer.textContent = "";
    resetComputer.textContent = "";
  }
}

function updateGameStats() {
  if (playerRound == 2) {
    playerScore++;
    resetRound();
  } else if (computerRound == 2) {
    computerScore++;
    resetRound();
  }

  const displayPlayerScore = document.querySelector(".player-side .side-text");
  displayPlayerScore.textContent = playerScore;

  const displayComputerSide = document.querySelector(
    ".computer-side .side-text"
  );
  displayComputerSide.textContent = computerScore;
}

possibleChoices.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", (e) => {
    const clickedOption = e.target.closest(".option");

    if (clickedOption) {
      playerChoice = clickedOption.id;
      playerColor = playerChoice;
      generateComputerChoice();
      getResult();
      colorDistinction();
      playerAttributes();
      computerAttributes();
      updateGameStats();
      updateResultBoxes();
    }
  })
);
