const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("on-of-guesses");
const guessesNumberRef = document.getElementById("guessed-nums");
const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");

let answer, noOfGuesses, guessedNumberArr;

const play = () => {
  const userGuess = guessInput.value;
  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    Swal.fire({
      icon: "error",
      title: "Please enter a valid Number between 1 and 100",
      confirmButtonColor: "#0984e3",
    });

    return;
  }
  guessedNumberArr.push(userGuess);
  noOfGuesses += 1;

  if (userGuess != answer) {
    if (userGuess < answer) {
      hint.innerHTML = "Too low Try Again!";
    } else {
      hint.innerHTML = "Too Hight Try Again!";
    }
    noOfGuessesRef.innerHTML = `<span>No. Of Guesses : </span> ${noOfGuesses}`;
    guessesNumberRef.innerHTML = `<span>Guessed Numbers are :</span> ${guessedNumberArr.join(
      ","
    )}`;

    hint.classList.remove("error");
    setTimeout(() => {
      hint.classList.add("error");
    }, 10);
  } else {
    hint.innerHTML = `Congratulations!<br>The Number was <span>${answer}</span>.<br>You guessed the number in <span>${noOfGuesses}</span>.triess`;
    hint.classList.add("success");
    game.style.display = "none";
    restartButton.style.display = "block";
  }
};

const init = () => {
  console.log("Game Started");
  answer = Math.floor(Math.random() * 100) + 1;
  console.log(answer);
  noOfGuesses = 0;
  guessedNumberArr = [];
  noOfGuessesRef.innerHTML = `No. of Guesses : 0`;
  guessesNumberRef.innerHTML = `Guessed Numbers are : None`;
  guessInput.value = "";
  hint.classList.remove("success", "error");
};

guessInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    event.preventDefault();
    play();
  }
});

restartButton.addEventListener("click", () => {
  game.style.display = "grid";
  restartButton.style.display = "none";
  hint.innerHTML = "";
  hint.classList.remove("success");
  let timerInterval;
  Swal.fire({
    title: "Game Restart",
    html: "I will close in <b></b> seconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        init();
    }
  });
  
});

checkButton.addEventListener("click", play);

window.addEventListener("load", init);
