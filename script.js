const targetColour = document.getElementById("targetColor");
const colourOptions = document.querySelector(".color-options");
const scores = document.getElementById("score");

let score = 0;
let correctColour;
let currentRound = 0;
const totalRounds = 10;

/* Generate random  colors.*/
function getRandomColor() {
    const hexChars = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
    }

    return color;
}

/* ends the game if all rounds are complete.*/
const gameStatus = document.getElementById("gameStatus");
const rounds = document.getElementById("rounds");
function startNewRound() {
    if (currentRound === totalRounds) {  
        showGameOver();
        return;
    }

    currentRound++;
    rounds.textContent = `Round: ${currentRound}/${totalRounds}`;

    let colorsArray = [];

    for (let i = 0; i < 6; i++) {
        colorsArray.push(getRandomColor());
    }

    correctColour = colorsArray[Math.floor(Math.random() * colorsArray.length)];
    targetColour.style.backgroundColor = correctColour;

    colourOptions.innerHTML = "";

    colorsArray.forEach((color) => {
        const button = document.createElement("button");
        button.classList.add("color-btn");
        button.style.backgroundColor = color;
        button.onclick = () => handleColorSelection(color, button);
        colourOptions.appendChild(button);
    });

    setTimeout(() => {
        gameStatus.textContent = "";
    }, 1000);
}

function handleColorSelection(selectedColor, button) {
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

    setTimeout(() => {
        gameStatus.textContent = "";
    }, 1500);

    setTimeout(startNewRound, 1000);
}

/* Displays the Game Over modal. */
const gameOverModal = document.getElementById("gameOverModal");
const finalscores = document.getElementById("finalScore");
const gameContainer = document.querySelector(".container");

function showGameOver() {
    gameOverModal.style.display = "block"; // Show the game over modal
    gameContainer.style.display = "none"; // Hide the game 
    finalscores.textContent = `Final Score: ${score}`;
}
function resetGame() {
    score = 0;
    currentRound = 0;
    scores.textContent = `Score: ${score}`;
    rounds.textContent = `Round: ${currentRound}/${totalRounds}`;

    gameContainer.style.display = "block"; // Show game 
    gameOverModal.style.display = "none"; // Hides modal

    startNewRound();
}

const restartGameButton = document.getElementById("restartGameButton");
const newGameButton = document.getElementById("newGameButton");

restartGameButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);

startNewRound();