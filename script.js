// List Of Letters
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const uppercaseAlphabetArray = Array.from(alphabet.toUpperCase());
const lettersContainer = document.querySelector(".letters");

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

// Array of words and categories
const wordCategories = {
  countries: [
    "Egypt",
    "Saudi Arabia",
    "Iraq",
    "Jordan",
    "Lebanon",
    "Syria",
    "Tunisia",
    "Morocco",
    "Kuwait",
    "UAE",
  ],
  people: [
    "Albert Einstein",
    "Nelson Mandela",
    "Oprah Winfrey",
    "Leonardo da Vinci",
    "Malala Yousafzai",
    "Steve Jobs",
    "Marie Curie",
    "Mahatma Gandhi",
    "Amelia Earhart",
    "Elon Musk",
  ],
  movies: [
    "Godfather",
    "Pulp Fiction",
    "The Dark Knight",
    "Forrest Gump",
    "The Matrix",
    "Inception",
  ],
  programming: [
    "JavaScript",
    "Python",
    "Java",
    "Ruby",
    "Swift",
    "PHP",
    "Csharp",
    "Go",
    "Rust",
  ],
};

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
  letter === " " ? letterElement.classList.add("with-space") : letterElement;
  wordDisplayContainer.append(letterElement);
});

// Select guess spans
let guessLetterElements = document.querySelectorAll(".letters-guess span");

// Set the choose state
let isLetterCorrect = false;

// Handle clicking on letters
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("letter-container") && !isLetterCorrect) {
    // Mark the letter as clicked
    e.target.classList.add("clicked");

    // Get the clicked letter
    const clickedLetter = e.target.textContent.toLowerCase();

    // Check if the clicked letter exists in the chosen word
    chosenWordLowerCase.forEach((wordLetter, wordIndex) => {
      
      // If The Clicked Letter Equal To One Of The Chosen Letter
      if (wordLetter.includes(clickedLetter)) {
     
        //  Update The Status Of The Letter Correction
        isLetterCorrect = true;

        // Update the display with the clicked letter
        guessLetterElements.forEach((element, index) => {
          if (wordIndex === index) {
            element.textContent = clickedLetter;
          }
        });
      }
    });

    // Log the current status
    console.log(isLetterCorrect);

    // Reset the choose state for the next click
    isLetterCorrect = false;
  }
});
