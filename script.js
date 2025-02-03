const targetColour = document.getElementById("targetColor");
const colourOptions = document.querySelector(".color-options");
const scores = document.getElementById("score");

let score = 0;
let correctColour;
let currentRound = 0;
const totalRounds = 10;

const gameStatus = document.getElementById("gameStatus");
const rounds = document.getElementById("rounds");
const gameOverModal = document.getElementById("gameOverModal");
const finalscores = document.getElementById("finalScore");
const gameContainer = document.querySelector(".container");

/* Generate a random hex color */
const getRandomColor = () => {
  const hexChars = "0123456789ABCDEF";
  return `#${Array.from(
    { length: 6 },
    () => hexChars[Math.floor(Math.random() * 16)]
  ).join("")}`;
};

/* Starts a new round */
const startNewRound = () => {
    if (currentRound === totalRounds) {
      showGameOver();
      return;
    }
  
    rounds.textContent = `Round: ${currentRound}/${totalRounds}`;
  
    correctColour = getRandomColor();
    targetColour.style.backgroundColor = correctColour;
  
    // Generate 4 shades of the correct color
    let colorsArray = [correctColour];
    for (let i = 0; i < 3; i++) {
      colorsArray.push(modifyShade(correctColour, 20)); // Adjust shade slightly
    }
  
    // Add 2 completely random colors
    colorsArray.push(getRandomColor(), getRandomColor());
  
    // Shuffle colors
    colorsArray = colorsArray.sort(() => Math.random() - 0.5);
  
    colourOptions.innerHTML = "";
    colorsArray.forEach((color) => {
      const button = document.createElement("button");
      button.classList.add("color-btn");
      button.style.backgroundColor = color;
      button.onclick = () => handleColorSelection(color, button);
      colourOptions.appendChild(button);
    });
  
    setTimeout(() => (gameStatus.textContent = ""), 1000);
  };
  
  // Function to modify the shades
  const modifyShade = (hex, amount) => {
    let r = parseInt(hex.slice(1, 3), 16) + amount;
    let g = parseInt(hex.slice(3, 5), 16) + amount;
    let b = parseInt(hex.slice(5, 7), 16) + amount;
  
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
  
    return `#` + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  
  
/* Handles color selection */
const handleColorSelection = (selectedColor, button) => {
  if (selectedColor === correctColour) {
    gameStatus.textContent = "🎯 Great job!";
    gameStatus.style.color = "#32CD32";
    score++;
    scores.textContent = `Score: ${score}`;
  } else {
    gameStatus.textContent = "❌ Oops! That's incorrect. Try again!";
    gameStatus.style.color = "#FF4C4C";
    button.classList.add("shake-and-fade");
    setTimeout(() => button.classList.remove("shake-and-fade"), 800);
  }

  currentRound++;
  rounds.textContent = `Round: ${currentRound}/${totalRounds}`;

  setTimeout(() => (gameStatus.textContent = ""), 1500);
  setTimeout(startNewRound, 1000);
};

/* Displays the Game Over modal */
const showGameOver = () => {
  gameOverModal.style.display = "block";
  gameContainer.style.display = "none";
  finalscores.textContent = `Final Score: ${score}`;
};

/* Resets the game */
const resetGame = () => {
  score = 0;
  currentRound = 0;
  scores.textContent = `Score: ${score}`;
  rounds.textContent = `Round: ${currentRound}/${totalRounds}`;
  gameContainer.style.display = "block";
  gameOverModal.style.display = "none";
  startNewRound();
};

/* Event Listeners */
document
  .getElementById("restartGameButton")
  .addEventListener("click", resetGame);
document.getElementById("newGameButton").addEventListener("click", resetGame);

rounds.textContent = `Round: ${currentRound}/${totalRounds}`;
startNewRound();
