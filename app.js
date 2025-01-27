let secretNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;
const maxGuesses = 5; // Sets the maximum amount of guesses to 5

const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("btn-submit");
const resetButton = document.getElementById("btn-reset");

resetButton.disabled = true;

submitButton.addEventListener("click", handleGuess);
resetButton.addEventListener("click", resetGame);
userInput.addEventListener("input", validateInput);

console.log(`The secret number is: ` + secretNumber);

function handleGuess(event) {
  event.preventDefault(); // Stops the page from refreshing
  const userGuess = Number(userInput.value);

  // Check if input is invalid
  if (!userGuess || userGuess < 1 || userGuess > 100) {
    alert("Please enter a valid number between 1 and 100!");
    return; // Exit the function so the game doesn't proceed
  }

  guessCount++;

  console.log(`The user's guess: ` + userGuess);
  console.log(`Guesses left: ` + (maxGuesses - guessCount));

  // Display of the number of guesses left
  document.getElementById("guess-count").textContent = `Guesses left: ${maxGuesses - guessCount}`;
  
  // Clear the input field after the guess
  userInput.value = "";

  // Hide all messages first
  hideMessages();

  // Check the user's guess
  if (userGuess > secretNumber) {
    document.getElementById("msg-high").classList.remove("hidden");
  } else if (userGuess < secretNumber) {
    document.getElementById("msg-low").classList.remove("hidden");
  } else {
    endGameSucces();
    return; // Exit the function to prevent the "Game Over" message being displayed
  }

  // If no guesses left, end the game
  if (guessCount >= maxGuesses) {
    endGameFail();
  }
}

function resetGame(event) {
  event.preventDefault(); // Stops the page from refreshing
  secretNumber = Math.floor(Math.random() * 100) + 1; // Generates a new number
  guessCount = 0;

  console.log(`The secret number is: ` + secretNumber);

  // Clear input and hide messages
  document.getElementById("user-input").value = "";
  hideMessages();

  // Reset the guess count display
  document.getElementById("guess-count").textContent = `Guesses left: ${maxGuesses}`;

  // Enable submit button
  submitButton.disabled = false;
  // Disables the input to make guesses
  userInput.disabled = false;
  // Disables the reset button during the game
  resetButton.disabled = true;
}

function hideMessages() {
  // Add the hidden class to all message elements
  document.getElementById("msg-high").classList.add("hidden");
  document.getElementById("msg-low").classList.add("hidden");
  document.getElementById("msg-correct").classList.add("hidden");
  document.getElementById("msg-gameover").classList.add("hidden");
}

function endGameFail() {
  // Show final message
  const gameOverMessage = document.getElementById("msg-gameover");
  const secretNumberSpan = document.getElementById("correct-number-fail");

  // Update the secret number in the message
  secretNumberSpan.textContent = secretNumber;

  // Remove the "hidden" class to show the message
  gameOverMessage.classList.remove("hidden");

  document.getElementById("msg-high").classList.add("hidden");
  document.getElementById("msg-low").classList.add("hidden");

  // Disable the submit button
  submitButton.disabled = true;
  // Disables the input to make guesses
  userInput.disabled = true;
  // Enables the reset button to play a new game
  resetButton.disabled = false;
}

function endGameSucces () {
  const gameWonMessage = document.getElementById("msg-correct");
  const secretNumberSpan = document.getElementById("correct-number-succes");

  secretNumberSpan.textContent = secretNumber;
  gameWonMessage.classList.remove("hidden");
  // Disables the input to make guesses
  userInput.disabled = true;
  // Enables the reset button to play a new game
  resetButton.disabled = false;
}

function validateInput() {
  const userGuess = userInput.value;

  // To allow only whole numbers between 1 and 100
  const isValid = /^[1-9][0-9]?$|^100$/.test(userGuess);

  if (userGuess!== "" && !isValid) {
    alert("Please enter a valid whole number between 1 and 100!");

    submitButton.disabled = true;
    return;
  }
  
  submitButton.disabled = false;
}