let fixCount = 0;
const maxFixes = 25; 
const timeLimit = 5000; 
let isPaused = false;
let isGameOver = false;
let timer;
let currentLanguage = 'en';
let selectedLaptop = 'assets/laptop-1.webp';

const laptop = document.getElementById('laptop');
const message = document.getElementById('message');
const progressBar = document.getElementById('progress-bar');
const pauseButton = document.getElementById('pauseButton');

// Screen Management
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
    updateTexts();
}

function showSettings() { hideAll(); document.getElementById('settings-container').style.display = 'block'; }
function showCreation() { hideAll(); document.getElementById('creation-container').style.display = 'block'; }

// Laptop Selection Logic
function showLaptopSelection() {
    hideAll();
    const container = document.getElementById('laptop-selection-container');
    container.style.display = 'block';
    
    const title = currentLanguage === 'en' ? "Laptop Selection" : "Wybór Laptopa";
    const backBtn = currentLanguage === 'en' ? "Back to Menu" : "Powrót";
    
    container.innerHTML = `
        <h2>${title}</h2>
        <div class="selection-grid">
            <div class="laptop-card ${selectedLaptop.includes('laptop-1') ? 'active' : ''}" onclick="selectLaptop('assets/laptop-1.webp')">
                <img src="assets/laptop-1.webp">
                <p>Model 1</p>
            </div>
            <div class="laptop-card ${selectedLaptop.includes('laptop-2') ? 'active' : ''}" onclick="selectLaptop('assets/laptop-2.webp')">
                <img src="assets/laptop-2.webp">
                <p>Model 2</p>
            </div>
        </div>
        <br>
        <button class="button" onclick="backToMenu()">${backBtn}</button>
    `;
}

function selectLaptop(path) {
    selectedLaptop = path;
    showLaptopSelection();
}

// Game Mechanics
function resetGame() {
    fixCount = 0;
    isPaused = false;
    isGameOver = false;
    stopTimer();
    laptop.src = selectedLaptop;
    laptop.style.cursor = 'pointer';
    laptop.style.filter = 'none';
    pauseButton.textContent = currentLanguage === 'en' ? 'Pause' : 'Pauza';
    updateTexts();
}

function startTimer() {
    stopTimer();
    if (isPaused || isGameOver) return;

    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';
    void progressBar.offsetWidth; 

    progressBar.style.transition = `width ${timeLimit}ms linear`;
    progressBar.style.width = '0%';

    timer = setTimeout(() => {
        explode(currentLanguage === 'en' ? "Time ran out!" : "Czas minął!");
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
    laptop.src = selectedLaptop;
    laptop.style.filter = "drop-shadow(0 0 20px gold) brightness(1.1)";
    message.textContent = currentLanguage === 'en' ? 
        "STABLE! You fixed the computer!" : 
        "STABILNY! Komputer został naprawiony!";
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
        message.textContent = currentLanguage === 'en' ? "Game Paused" : "Gra wstrzymana";
    } else {
        pauseButton.textContent = currentLanguage === 'en' ? 'Pause' : 'Pauza';
        if(fixCount > 0) startTimer();
        else updateTexts();
    }
});

function changeLanguage() {
    currentLanguage = document.getElementById('language').value;
    updateTexts();
}

function updateTexts() {
    const t = {
        en: { play: "Play", select: "Laptop Selection", create: "Creation", settings: "Settings", msg: "Click to start fixing!" },
        pl: { play: "Graj", select: "Wybór laptopa", create: "Tworzenie", settings: "Ustawienia", msg: "Kliknij, aby zacząć!" }
    }[currentLanguage];

    const menuBtns = document.querySelectorAll('#menu-container .button');
    menuBtns[0].textContent = t.play;
    menuBtns[1].textContent = t.select;
    menuBtns[2].textContent = t.create;
    menuBtns[3].textContent = t.settings;
    if (fixCount === 0 && !isGameOver) message.textContent = t.msg;
}

// Initialize Menu
backToMenu();
