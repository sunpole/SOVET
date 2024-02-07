let currentDiceValue;
let rollCount = 0;
let consecutiveCount = 0;
let probabilities = [0.05, 0.3, 0.6, 0.4, 0.6, 0.05];

function shouldRepeat() {
  // 1 in 70 chance for a number to repeat in the next roll
  return Math.random() <= 1 / 70;
}

function shouldAppearNextTo(currentDiceValue) {
  // 1 in 40 chance for a number to appear next to the currentDiceValue
  return Math.random() <= 1 / 40;
}

function updateProbabilityTable() {
  let table = document.getElementById("probabilityTable");
  table.innerHTML = "<tr><th>Dice Number</th><th>Probability</th></tr>";

  for (let i = 1; i <= 6; i++) {
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = i;
    cell2.innerHTML = probabilities[i - 1].toFixed(4);
  }
}

function updateStatisticsTable() {
  let table = document.getElementById("statisticsTable");
  table.innerHTML = "<tr><th>Dice Number</th><th>Count</th><th>Percentage</th></tr>";

  for (let i = 1; i <= 6; i++) {
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML = i;
    cell2.innerHTML = rollCount[i - 1];
    cell3.innerHTML = ((rollCount[i - 1] / rollCount.reduce((a, b) => a + b, 0)) * 100).toFixed(4) + "%";
  }
}

function generateAndDisplay() {
  rollCount++;

  let chance = Math.random();
  let cumulativeProbability = 0;

  for (let i = 1; i <= 6; i++) {
    cumulativeProbability += probabilities[i - 1];

    if (chance <= cumulativeProbability) {
      currentDiceValue = i;
      break;
    }
  }

  if (shouldRepeat() && rollCount > 1) {
    // Repeat the number
    consecutiveCount++;
  } else if (shouldAppearNextTo(currentDiceValue) && rollCount > 40) {
    // Generate a number next to the currentDiceValue
    currentDiceValue = (currentDiceValue % 6) + 1;
  }

  // Update probability table
  updateProbabilityTable();

  // Update statistics table
  rollCount[currentDiceValue - 1]++;
  updateStatisticsTable();

  // Display the generated number
  let generatedNumber = document.getElementById("generatedNumber");
  generatedNumber.textContent = currentDiceValue;
}
