let fixCount = 0;
const maxFixes = 25; 
const timeLimit = 5000; // 5 seconds
let isPaused = false;
let isGameOver = false;
let timer;
let currentLanguage = 'en';

const laptop = document.getElementById('laptop');
const message = document.getElementById('message');
const progressBar = document.getElementById('progress-bar');
const pauseButton = document.getElementById('pauseButton');

// Navigation
function hideAll() {
    const screens = ['menu-container', 'game-container', 'settings-container', 'laptop-selection-container', 'creation-container'];
    screens.forEach(s => document.getElementById(s).style.display = 'none');
}

function startGame() {
    hideAll();
    document.getElementById('game-container').style.display = 'block';
    resetGame();
}

function backToMenu() {
    stopTimer();
    hideAll();
    document.getElementById('menu-container').style.display = 'flex';
}

function showSettings() { hideAll(); document.getElementById('settings-container').style.display = 'block'; }
function showLaptopSelection() { hideAll(); document.getElementById('laptop-selection-container').style.display = 'block'; }
function showCreation() { hideAll(); document.getElementById('creation-container').style.display = 'block'; }

// Game Logic
function resetGame() {
    fixCount = 0;
    isPaused = false;
    isGameOver = false;
    stopTimer();
    laptop.src = 'assets/laptop.png';
    laptop.style.cursor = 'pointer';
    laptop.style.filter = 'none';
    pauseButton.textContent = currentLanguage === 'en' ? 'Pause' : 'Pauza';
    updateTexts();
}

function startTimer() {
    stopTimer();
    if (isPaused || isGameOver) return;

    // Reset bar visual
    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';
    void progressBar.offsetWidth; // Force CSS reflow

    // Start shrink
    progressBar.style.transition = `width ${timeLimit}ms linear`;
    progressBar.style.width = '0%';

    timer = setTimeout(() => {
        explode(currentLanguage === 'en' ? "Too slow!" : "Za wolno!");
    }, timeLimit);
}

function stopTimer() {
    clearTimeout(timer);
    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';
}

laptop.addEventListener('click', () => {
    if (isPaused || isGameOver) return;

    fixCount++;
    if (fixCount < maxFixes) {
        message.textContent = currentLanguage === 'en' ? 
            `Fixing... (${fixCount}/${maxFixes})` : 
            `Naprawianie... (${fixCount}/${maxFixes})`;
        startTimer();
    } else {
        win();
    }
});

function win() {
    isGameOver = true;
    stopTimer();
    laptop.src = 'assets/laptop.png'; // Swap to a fixed image if you have one
    laptop.style.filter = "drop-shadow(0 0 15px gold)";
    message.textContent = currentLanguage === 'en' ? 
        "STABLE! You fixed the computer!" : 
        "STABILNY! Naprawiłeś komputer!";
}

function explode(reason) {
    isGameOver = true;
    stopTimer();
    laptop.src = 'assets/explode.gif';
    message.textContent = `BOOM! ${reason}`;
    laptop.style.cursor = 'not-allowed';
}

pauseButton.addEventListener('click', () => {
    if (isGameOver) return;
    isPaused = !isPaused;
    if (isPaused) {
        stopTimer();
        pauseButton.textContent = currentLanguage === 'en' ? 'Resume' : 'Wznów';
        message.textContent = currentLanguage === 'en' ? "Paused" : "Wstrzymano";
    } else {
        pauseButton.textContent = currentLanguage === 'en' ? 'Pause' : 'Pauza';
        startTimer();
    }
});

function changeLanguage() {
    currentLanguage = document.getElementById('language').value;
    updateTexts();
}

function updateTexts() {
    const t = {
        en: { play: "Play", select: "Laptop Selection", create: "Creation", msg: "Click to fix!" },
        pl: { play: "Graj", select: "Wybór laptopa", create: "Tworzenie", msg: "Kliknij, aby naprawić!" }
    }[currentLanguage];

    const menuBtns = document.querySelectorAll('#menu-container .button');
    menuBtns[0].textContent = t.play;
    menuBtns[1].textContent = t.select;
    menuBtns[2].textContent = t.create;
    if (fixCount === 0) message.textContent = t.msg;
}

// Start in Menu
backToMenu();
