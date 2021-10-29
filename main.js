const input = document.querySelector(".input-guess");
const button = document.querySelector(".guess");
const guesses = document.querySelector(".guesses");
const state = document.querySelector(".game-state");
const feedback = document.querySelector(".feedback");
const playAgain = document.querySelector(".play-again");
const lose = document.querySelector(".lose");
const messages = [
    "Wrong!",
    "Try again",
    "Maybe close, who knows!",
    "Do it again!",
    "Don't give up!",
    "Maybe try something else",
    "You need to try harder!"
];

let previousGuesses, trials, trialLimit, playing, guessNumber, lost;

button.addEventListener("click", () => {
    if (playing) {
        let number = parseInt(input.value);
        input.value = '';
        if (number) {
            trials++;
            if (trials == 1) {
                guesses.style.display = "block";
                state.style.display = "block";
                feedback.style.display = "block";
            }
            previousGuesses.push(number);
            guesses.textContent = `Previous guesses : ${previousGuesses.join(', ')}`;

            if (number != guessNumber) {
                if (!state.classList.contains("wrong-guess"))
                    state.classList.add("wrong-guess");
                state.innerHTML = `<p>${messages[Math.floor(Math.random() * messages.length)]}</p>`;
                if (number < guessNumber)
                    feedback.innerHTML = "<p>Your guess was too low!</p>";
                else
                    feedback.innerHTML = "<p>Your guess was too high!</p>";
            }
            else {
                state.classList.add("right-guess");
                state.textContent = "Congratulations! you won!";
                stopTheGame();
                
                feedback.style.display = "none";
                playAgain.style.display = "block";
            }

            if (trials >= trialLimit) {
                lost = true;
                stopTheGame();
            }
        }
    }
});

playAgain.addEventListener("click", () => {
    init();
    guesses.style.display = "none";
    state.style.display = "none";
    feedback.style.display = "none";
    state.classList.remove("wrong-guess");
    state.classList.remove("right-guess");   
    playAgain.style.display = "none"; 
    lose.style.display = "none";
});

function init() {
    if (!playing) {
        guessNumber = Math.floor(Math.random() * 100) + 1;
        previousGuesses = [];
        trials = 0;
        trialLimit = 10;
        playing = true;
        input.disabled = false;
        button.disabled = false;
        lost = false;
    }
}

function stopTheGame() {
    if (lost) {
        state.style.display = "none";
        lose.style.display = "block";
        lose.innerHTML = `<p>Game Over, you ran out of turns. The number was ${guessNumber}</p>`;
    }
    playing = false;
    input.disabled = true;
    button.disabled = true;
    feedback.style.display = "none";
    playAgain.style.display = "block";
}

window.onload = () => init();