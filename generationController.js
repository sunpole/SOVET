// generationController.js
let intervalId;

function startGeneration(interval) {
  intervalId = setInterval(generateAndDisplay, interval);
  disableButtons(true);
}

function stopGeneration() {
  clearInterval(intervalId);
  disableButtons(false);
}

function disableButtons(disable) {
  let startButton = document.getElementById("single-generation-button");
  let stopButton = document.getElementById("stop-auto-button");

  startButton.disabled = disable;
  stopButton.disabled = !disable;
}

document.addEventListener("DOMContentLoaded", function () {
  let startButton = document.getElementById("single-generation-button");
  let stopButton = document.getElementById("stop-auto-button");

  startButton.addEventListener("click", function () {
    startGeneration(1000); // Передача интервала в миллисекундах (1 секунда)
  });

  stopButton.addEventListener("click", stopGeneration);
});
