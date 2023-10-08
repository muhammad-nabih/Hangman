// List Of Letters
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const uppercaseAlphabetArray = Array.from(alphabet.toUpperCase());
const lettersContainer = document.querySelector(".letters");

// Counter Fill Span
let countSpanFill = 0;

// Function to create and add letter elements to the UI
function createLettersAndAddToUI() {
  uppercaseAlphabetArray.forEach((letter) => {
    const letterElement = document.createElement("span");
    letterElement.classList.add("letter-container");
    letterElement.appendChild(document.createTextNode(letter));
    const letterKeyCode = letter.charCodeAt();
    letterElement.setAttribute("data-key", letterKeyCode);
    lettersContainer.appendChild(letterElement);
  });
}

// Call the function to create and add letter elements to the UI
createLettersAndAddToUI();

// Function to fetch word data
async function fetchData() {
  const response = await fetch("data.json");
  return await response.json();
}

// Function to choose a random element from an array
function chooseRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to initialize the game
async function initializeGame() {
  const wordCategories = await fetchData();

  // Randomly select a word category
  const categoryKeys = Object.keys(wordCategories);
  const randomCategoryKey = chooseRandomElement(categoryKeys);

  // Display the selected category
  const categoryDisplayElement = document.querySelector("span.word");
  categoryDisplayElement.textContent = randomCategoryKey;

  // Select a random word from the chosen category
  const wordsInCategory = wordCategories[randomCategoryKey];
  const chosenWord = chooseRandomElement(wordsInCategory);

  // Convert the chosen word to lowercase and split it into an array of letters
  const chosenWordLowerCase = Array.from(chosenWord.toLowerCase());

  // Create letter elements for the word display
  const wordDisplayContainer = document.querySelector(".letters-guess");

  chosenWordLowerCase.forEach((letter) => {
    const letterElement = document.createElement("span");

    if (letter === " ") {
      letterElement.classList.add("with-space");
      countSpanFill++;
    }

    wordDisplayContainer.append(letterElement);
  });

  // Select guess spans
  let guessLetterElements = document.querySelectorAll(".letters-guess span");

  // Wrong Counter
  let wrongCounter = 0;

  // Select The Draw Element
  const theDraw = document.querySelector(".hangman-draw");

  const letterGuessLength = guessLetterElements.length;

  // Function to check for win condition
  function checkWin() {
    const winPopup = document.querySelector("#win-popup");
    const winPopupMessage = winPopup.querySelector("p");

    winPopupMessage.textContent = "Congratulations! You won!🏆🎊🥳";
    winPopup.style.display = "flex";
  }

  // Function to check for loss condition
  function checkLoss() {
    if (wrongCounter === 8) {
      lettersContainer.classList.add("over");
      const lossPopup = document.querySelector("#loss-popup");
      const lossPopupMessage = lossPopup.querySelector("p");
      const wordChosenElement = document.querySelector(
        "span.chosen-word-popup"
      );
      wordChosenElement.textContent =
        "The Word is: " + chosenWord.toUpperCase();
      lossPopupMessage.textContent = `Sorry😔, you lost😓 . Try again🔁`;
      lossPopup.style.display = "flex";
    }
  }

  // Handle clicking on letters
  document.addEventListener("click", (e) => {
    let isLetterCorrect = false;

    if (e.target.classList.contains("letter-container") && !isLetterCorrect) {
      e.target.classList.add("clicked");
      const clickedLetter = e.target.textContent.toLowerCase();

      chosenWordLowerCase.forEach((wordLetter, wordIndex) => {
        if (wordLetter.includes(clickedLetter)) {
          isLetterCorrect = true;
          guessLetterElements.forEach((element, index) => {
            if (wordIndex === index) {
              element.textContent = clickedLetter;
              return countSpanFill++;
            }
          });
        }
      });

      if (!isLetterCorrect) {
        wrongCounter++;
        theDraw.classList.add(`wrong-${wrongCounter}`);
        const fail = document.querySelector("#fail");
        fail.currentTime = 0;
        fail.play();
        checkLoss();
      } else {
        const success = document.querySelector("#success");
        success.currentTime = 0;
        success.play();
        if (countSpanFill === letterGuessLength) {
          checkWin();
        }
      }
    }
  });
}

// Initialize the game
initializeGame();

// Function to reload the page when clicking on "Play Again" button
function reloadPage(buttonId) {
  const button = document.querySelector(`#${buttonId}`);
  button.addEventListener("click", () => {
    location.reload();
  });
}

// Reload the page when clicking on the "Play Again" buttons
reloadPage("play-again-win");
reloadPage("play-again-loss");
