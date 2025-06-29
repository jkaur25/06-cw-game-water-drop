let score = 0;
let gameOver = false;
let winScore = 10; // default normal difficulty

const scoreDisplay = document.getElementById("score");
const feedback = document.getElementById("feedback");
const playAgainBtn = document.getElementById("play-again");
const drops = document.querySelectorAll(".drop");
const difficultySelect = document.getElementById("difficulty-select");
const goodSound = document.getElementById("good-sound");
const badSound = document.getElementById("bad-sound");

let badIndex = Math.floor(Math.random() * drops.length);

difficultySelect.addEventListener("change", () => {
  const level = difficultySelect.value;
  winScore = level === "easy" ? 5 : level === "normal" ? 10 : 15;
  resetGame();
});

function resetGame() {
  score = 0;
  gameOver = false;
  scoreDisplay.textContent = score;
  feedback.textContent = "";
  playAgainBtn.style.display = "none";
  drops.forEach(drop => {
    drop.classList.remove("bad");
    drop.textContent = "";
    drop.style.visibility = "visible";
  });
  badIndex = Math.floor(Math.random() * drops.length);
}

function updateBadDrop() {
  drops.forEach(drop => {
    drop.classList.remove("bad");
    drop.textContent = "";
  });
  badIndex = Math.floor(Math.random() * drops.length);
}

drops.forEach((drop, index) => {
  drop.addEventListener("click", () => {
    if (gameOver) return;

    if (index === badIndex) {
      drop.classList.add("bad");
      drop.textContent = "X";
      feedback.textContent = "Oops! That was polluted water!";
      badSound.play();
      gameOver = true;
      playAgainBtn.style.display = "inline-block";
    } else {
      score++;
      scoreDisplay.textContent = score;
      goodSound.play();
      feedback.textContent = "";
      drop.style.visibility = "hidden"; // disappear clicked good drop
      setTimeout(() => drop.style.visibility = "visible", 300);
      showMilestones();
      if (score >= winScore) {
        feedback.textContent = "🎉 You win! Great job! 🎉";
        confettiBurst();
        gameOver = true;
        playAgainBtn.style.display = "inline-block";
      } else {
        updateBadDrop();
      }
    }
  });
});

playAgainBtn.addEventListener("click", resetGame);

function showMilestones() {
  if (score === Math.floor(winScore / 2)) {
    feedback.textContent = "Halfway there!";
  }
  if (score === winScore - 1) {
    feedback.textContent = "Almost at the goal!";
  }
}

function confettiBurst() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  });
}
