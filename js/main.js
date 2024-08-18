document.addEventListener("DOMContentLoaded", () => {
  createSquares();

  let guessedWords = [[]];
  let availableSpace = 1;
  let word = getNewWord();
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard__row button");

  function getNewWord() {
    const words = window.wordList;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function getTileColor(letter, i) {
    const isCorrectLetter = word.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(58, 58, 60)";
    }

    const letterCurrentPosition = word.charAt(i);
    const isCorrectPosition = letter === letterCurrentPosition;

    if (isCorrectPosition) {
      return "rgb(0, 255, 0)";
    }

    return "rgb(255, 255, 0)";
  }

  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length !== 5) {
      window.alert("Word must be 5 characters long");
      return;
    }

    const currentWord = currentWordArr.join("");

    const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 300;
    currentWordArr.forEach((letter, i) => {
      setTimeout(() => {
        const tileColor = getTileColor(letter, i);

        const letterId = firstLetterId + i;
        const letterEl = document.getElementById(letterId);
        letterEl.classList.add("animate__flip");
        letterEl.style = `background-color: ${tileColor}`;
        `border-color:${tileColor}`;
      }, interval * i);
    });

    guessedWordCount = guessedWordCount + 1;

    if (currentWord === word) {
      window.alert("You've got it!");
    }

    if (guessedWords.length === 6) {
      window.alert(`Sorry! The correct word was ${word}.`);
    }

    guessedWords.push([]);
  }

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));
      availableSpace = availableSpace + 1;

      availableSpaceEl.textContent = letter;
    }
  }

  //  On load, initialize the gameboard by creating squares for each letter
  function createSquares() {
    const gameBoard = document.getElementById("game-board");

    for (let i = 0; i < 30; i++) {
      let square = document.createElement("div");
      square.classList.add("square");
      //square.classList.add("animate__flip");
      square.setAttribute("id", i + 1);
      gameBoard.appendChild(square);
    }
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      // User can submit a word by pressing the enter button
      if (letter === "enter") {
        handleSubmitWord();
        return;
      }

      // Allow user to delete a letter when pressing the delete button
      if (letter === "del") {
        guessedWords.pop();
        availableSpace = availableSpace - 1;
        const availableSpaceEl = document.getElementById(
          String(availableSpace)
        );
        availableSpaceEl.textContent = "";
        return;
      }

      updateGuessedWords(letter);
    };
  }
});
