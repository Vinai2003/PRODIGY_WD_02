// script.js

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapTimes = [];
const display = document.getElementById('display');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        startStopButton.innerHTML = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopButton.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapTimes = [];
    display.innerHTML = '00:00:00.00';
    startStopButton.innerHTML = 'Start';
    laps.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.innerHTML = formatTime(updatedTime);
}

function formatTime(ms) {
    let milliseconds = parseInt((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
}

function recordLap() {
    if (running) {
        const lapTime = formatTime(updatedTime);
        lapTimes.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.innerHTML = `Lap ${lapTimes.length}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}
