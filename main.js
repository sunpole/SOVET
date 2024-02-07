// main.js
function toggleSuperFast() {
  let button = document.getElementById("superFastButton");
  button.classList.toggle("auto-generation");
  button.textContent = button.classList.contains("auto-generation") ? "Enable Super Fast" : "Toggle Super Fast";
}

function generateAndDisplay() {
  if (!document.getElementById("superFastButton").classList.contains("auto-generation")) {
    // Normal generation logic
    currentDiceValue = generateRandomNumber();
    // Display the generated number
    let generatedNumber = document.getElementById("generatedNumber");
    generatedNumber.textContent = currentDiceValue;
    // Update statistics table
    updateStatisticsTable(currentDiceValue);
    // Update last 300 rolls for prediction
    updateLast300Rolls(currentDiceValue);
    // Predict the next number and update the first table
    predictNextNumber();
  } else {
    // Super fast generation logic
    startSuperFastGeneration();
  }
}

function startSuperFastGeneration() {
  let intervalId = setInterval(() => {
    currentDiceValue = generateRandomNumber();
    // Update statistics table
    updateStatisticsTable(currentDiceValue);
    // Update last 300 rolls for prediction
    updateLast300Rolls(currentDiceValue);
    // Predict the next number and update the first table
    predictNextNumber();
  }, 10); // Generate every 10 milliseconds
}
