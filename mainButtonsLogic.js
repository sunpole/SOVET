// mainButtonsLogic.js
let autoGenerationInterval;
let last300Rolls = [];
let rollCount = Array(6).fill(0);

function generateSingle() {
  clearInterval(autoGenerationInterval);
  const generatedNumber = generateRandomNumber();
  document.getElementById("generatedNumberDisplay").textContent = generatedNumber;
  updateStatisticsTable(generatedNumber);
  updateLast300Rolls(generatedNumber);
  predictNextNumber();
  updateStatisticsTableDisplay();
}

function startAutoGeneration(speed) {
  clearInterval(autoGenerationInterval);
  autoGenerationInterval = setInterval(() => {
    const generatedNumber = generateRandomNumber();
    document.getElementById("generatedNumberDisplay").textContent = generatedNumber;
    updateStatisticsTable(generatedNumber);
    updateLast300Rolls(generatedNumber);
    predictNextNumber();
    updateStatisticsTableDisplay();
  }, 1000 / speed);
}

function stopAutoGeneration() {
  clearInterval(autoGenerationInterval);
}

// Добавьте здесь логику для обновления таблиц
// ...

function updateLast300Rolls(number) {
  last300Rolls.push(number);
  if (last300Rolls.length > 300) {
    last300Rolls.shift(); // Удаляем первый элемент, если превышено 300 бросков
  }
}

function updateStatisticsTableDisplay() {
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

  document.getElementById("totalGenerationsCount").textContent = last300Rolls.length;
}
