let rollCount = Array(6).fill(0);
let last300Rolls = [];
let updateInterval;

(function() {
  let rollCount = Array(6).fill(0);
  let last300Rolls = [];
  let updateInterval;

  // Добавьте следующую строку для обновления строки с общим количеством генераций
  document.getElementById("totalGenerationsCount").textContent = last300Rolls.length;

  function updateStatisticsTable(number) {
    rollCount[number - 1]++;
    // Проверяем, активен ли интервал обновления
    if (!updateInterval) {
      // Если нет, устанавливаем интервал на 3 секунды
      updateInterval = setInterval(() => {
        updateStatisticsTableDisplay();
      }, 3000);
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

    // Очищаем интервал после обновления
    clearInterval(updateInterval);
    updateInterval = null;
  }
})();
