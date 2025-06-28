let userscore = 0;
let compscore = 0;
let roundsPlayed = 0;
let totalRounds = 5;

const userScorePara = document.getElementById("userscore");
const compScorePara = document.getElementById("compscore");
const msgPara = document.getElementById("msg");
const finalResult = document.getElementById("final-result");
const winnerMsg = document.getElementById("winner-msg");
const roundDisplay = document.getElementById("round-display");
const roundsSelect = document.getElementById("rounds");

roundsSelect.addEventListener("change", () => {
  totalRounds = parseInt(roundsSelect.value);
  resetGame();
});

const choices = document.querySelectorAll(".choice");

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    if (roundsPlayed >= totalRounds) return;
    const userChoice = choice.id;
    playRound(userChoice);
  });
});

function playRound(userChoice) {
  const options = ["rock", "paper", "scissors"];
  const compChoice = options[Math.floor(Math.random() * 3)];

  let result = "";

  if (userChoice === compChoice) {
    result = "It's a draw!";
  } else if (
    (userChoice === "rock" && compChoice === "scissors") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissors" && compChoice === "paper")
  ) {
    userscore++;
    result = `You Win! ${userChoice} beats ${compChoice}`;
  } else {
    compscore++;
    result = `You Lose! ${compChoice} beats ${userChoice}`;
  }

  roundsPlayed++;
  updateUI(result);

  if (roundsPlayed === totalRounds) {
    showFinalWinner();
  }
}

function updateUI(message) {
  userScorePara.textContent = userscore;
  compScorePara.textContent = compscore;
  msgPara.textContent = message;

  const resultBox = document.getElementById("msg");
  resultBox.classList.remove("result-win", "result-lose", "result-default");

  if (message.includes("Win")) {
    resultBox.classList.add("result-win");
  } else if (message.includes("Lose")) {
    resultBox.classList.add("result-lose");
  } else {
    resultBox.classList.add("result-default");
  }

  roundDisplay.textContent = `Round: ${roundsPlayed + 1 <= totalRounds ? roundsPlayed + 1 : totalRounds}`;
}

function showFinalWinner() {
  finalResult.style.display = "block";
  let winner = "";

  if (userscore > compscore) {
    winner = "🎉 You are the Overall Winner!";
  } else if (compscore > userscore) {
    winner = "💻 Computer Wins the Game!";
  } else {
    winner = "🤝 It's a Tie!";
  }

  winnerMsg.textContent = `Game Over! ${winner}`;
}

function resetGame() {
  userscore = 0;
  compscore = 0;
  roundsPlayed = 0;
  userScorePara.textContent = "0";
  compScorePara.textContent = "0";
  msgPara.textContent = "Play Your Move";
  roundDisplay.textContent = "Round: 1";
  msgPara.className = "result-default";
  finalResult.style.display = "none";
}
