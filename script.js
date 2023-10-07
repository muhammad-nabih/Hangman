// List Of Letters
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const uppercaseAlphabetArray = Array.from(alphabet.toUpperCase());
const lettersContainer = document.querySelector(".letters");

// Counter Fill Span
let countSpanFill = 0;

// Create letter elements and add them to the user interface
function createLettersAndAddToUI() {
  uppercaseAlphabetArray.forEach((letter) => {
    const letterElement = document.createElement("span");
    letterElement.classList.add("letter-container");
    letterElement.appendChild(document.createTextNode(letter));
    // Get the ASCII code for the current letter
    const letterKeyCode = letter.charCodeAt();
    // Add the key code to the current element as a data attribute
    letterElement.setAttribute("data-key", letterKeyCode);
    lettersContainer.appendChild(letterElement);
  });
}

// Call the function to create and add letter elements to the UI
createLettersAndAddToUI();

function initializeGame() {
  const dataFetch = async () => {
    const response = await fetch("data.json");
    const wordCategories = await response.json();

    // Randomly select a word category
    const categoryKeys = Object.keys(wordCategories);
    const randomCategoryIndex = Math.floor(Math.random() * categoryKeys.length);
    const randomCategoryKey = categoryKeys[randomCategoryIndex];

    // Display the selected category
    const categoryDisplayElement = document.querySelector("span.word");
    categoryDisplayElement.innerHTML = randomCategoryKey;

    // Select a random word from the chosen category
    const wordsInCategory = wordCategories[randomCategoryKey];
    const randomWordIndex = Math.floor(Math.random() * wordsInCategory.length);
    const chosenWord = wordsInCategory[randomWordIndex];

    // Convert the chosen word to lowercase and split it into an array of letters
    const chosenWordLowerCase = Array.from(chosenWord.toLowerCase());

    // Create letter elements for the word display
    const wordDisplayContainer = document.querySelector(".letters-guess");

    chosenWordLowerCase.forEach((letter) => {
      const letterElement = document.createElement("span");
      // Add a class for space to handle words with spaces

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

    // Check for win condition
    function checkWin() {
      const winPopup = document.querySelector("#win-popup");
      const winPopupMessage = winPopup.querySelector("p");

      winPopupMessage.innerHTML = "Congratulations! You won!🏆🎊🥳";
      winPopup.style.display = "flex";
    }

    // Check for loss condition
    function checkLoss() {
      if (wrongCounter === 8) {
        lettersContainer.classList.add("over");
        const lossPopup = document.querySelector("#loss-popup");
        const lossPopupMessage = lossPopup.querySelector("p");
        const wordChosenElement = document.querySelector(
          "span.chosen-word-popup"
        );
        wordChosenElement.innerHTML = "The Word is => " + chosenWord.toUpperCase();
        lossPopupMessage.innerHTML = `Sorry😔, you lost😓 . Try again🔁`;

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
  };
  return dataFetch();
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
