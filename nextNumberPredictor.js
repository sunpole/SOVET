// nextNumberPredictor.js
let last300Rolls = [];
let predictions = Array(6).fill(0);

function updateLast300Rolls(number) {
  last300Rolls.push(number);

  if (last300Rolls.length > 300) {
    last300Rolls.shift();
  }
}

function predictNextNumber() {
  predictions = calculatePredictions();

  // Update the first table with predictions
  updateFirstTable(predictions);
}

function calculatePredictions() {
  let probabilities = Array(6).fill(0);

  for (let i = 0; i < last300Rolls.length - 1; i++) {
    probabilities[last300Rolls[i] - 1]++;
  }

  return probabilities.map(count => count / (last300Rolls.length - 1));
}

function updateFirstTable(predictions) {
  let table = document.getElementById("probabilityTable");
  table.innerHTML = "<tr><th>Dice Number</th><th>Probability</th></tr>";

  for (let i = 1; i <= 6; i++) {
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = i;
    cell2.innerHTML = predictions[i - 1].toFixed(4);
  }
}

let generatedNumberDisplay = document.getElementById("generatedNumberDisplay");
if (generatedNumberDisplay) {
    generatedNumberDisplay.textContent = generatedNumber;
}

document.getElementById("totalGenerationsCount").textContent = last300Rolls.length;
