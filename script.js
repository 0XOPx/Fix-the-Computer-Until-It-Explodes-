let fixCount = 0;
const maxFixes = 20;  
let isPaused = false; 
let currentLanguage = 'en'; 

// --- NEW TIMER VARIABLES ---
let timer; 
const timeLimit = 5000; // 5 seconds in milliseconds

const laptop = document.getElementById('laptop');
const message = document.getElementById('message');
const pauseButton = document.getElementById('pauseButton');

// Navigation
function hideAll() {
    const containers = ['menu-container', 'game-container', 'settings-container', 'laptop-selection-container', 'creation-container'];
    containers.forEach(id => document.getElementById(id).style.display = 'none');
}

function backToMenu() {
    stopTimer(); // Stop timer if we leave the game
    hideAll();
    document.getElementById('menu-container').style.display = 'flex';
}

function startGame() {
    hideAll();
    document.getElementById('game-container').style.display = 'block';
    resetGame();
}

// --- TIMER LOGIC ---
function startTimer() {
    stopTimer(); // Clear any existing timer first
    if (isPaused || fixCount >= maxFixes) return;

    timer = setTimeout(() => {
        explode("Time ran out!"); 
    }, timeLimit);
}

function stopTimer() {
    clearTimeout(timer);
}

// Logic functions
function resetGame() {
    fixCount = 0;
    isPaused = false;
    stopTimer();
    laptop.src = 'assets/laptop.png';
    laptop.style.cursor = 'pointer';
    updateTexts();
}

// Laptop Click Interaction
laptop.addEventListener('click', () => {
    if (isPaused || fixCount >= maxFixes) return; 

    fixCount++;

    if (fixCount < maxFixes) {
        message.textContent = `Fixing... (${fixCount}/${maxFixes}) - QUICK, CLICK AGAIN!`;
        startTimer(); // Reset the 5-second fuse on every click
    } else {
        stopTimer();
        explode("It couldn't take the pressure!");
    }
});

function explode(reason) {
    stopTimer();
    laptop.src = 'assets/explode.gif';  
    message.textContent = `BOOM! ${reason}`;
    laptop.style.cursor = 'not-allowed';
}

// Pause/Resume Logic
pauseButton.addEventListener('click', () => {
    if (fixCount >= maxFixes) return;

    isPaused = !isPaused;
    
    if (isPaused) {
        stopTimer();
        message.textContent = 'Game Paused.';
        pauseButton.textContent = 'Resume';
    } else {
        startTimer(); // Resume the fuse
        message.textContent = `Fixing... (${fixCount}/${maxFixes})`;
        pauseButton.textContent = 'Pause';
    }
});

function updateTexts() {
    const texts = {
        en: {
            message: 'Click to fix the laptop! Be careful, it explodes in 5 seconds.',
            play: 'Play',
            laptopSelection: 'Laptop Selection',
            creation: 'Creation (Coming Soon)',
            backToMenu: 'Back to Menu',
            paused: 'Game Paused. Click "Resume" to continue.',
            boom: 'Boom! TOO LATE! The laptop exploded!'
        },
        pl: {
            message: 'Kliknij, aby naprawić laptopa! Uważaj, wybuchnie za 5 sekund. (Tłumaczenie może być niedokładne)',
            play: 'Graj (Tłumaczenie może być niedokładne)',
            laptopSelection: 'Wybór laptopa (Tłumaczenie może być niedokładne)',
            creation: 'Tworzenie (Wkrótce) (Tłumaczenie może być niedokładne)',
            backToMenu: 'Powrót do menu (Tłumaczenie może być niedokładne)',
            paused: 'Gra wstrzymana. Kliknij "Wznów", aby kontynuować. (Tłumaczenie może być niedokładne)',
            boom: 'BUM! ZA PÓŹNO! Laptop wybuchł! (Tłumaczenie może być niedokładne)'
        }
    };

    const t = texts[currentLanguage];
    
    // Update Menu Buttons
    const menuBtns = document.querySelectorAll('#menu-container .button');
    menuBtns[0].textContent = t.play;
    menuBtns[1].textContent = t.laptopSelection;
    menuBtns[2].textContent = t.creation;

    // Update Game Message
    if (fixCount === 0) {
        message.textContent = t.message;
    } else if (fixCount >= maxFixes) {
        message.textContent = t.boom;
    }

    // Update "Back" buttons in all containers
    document.querySelectorAll('.button[onclick="backToMenu()"]').forEach(btn => {
        btn.textContent = t.backToMenu;
    });
}

// Laptop Click Interaction
laptop.addEventListener('click', () => {
    if (isPaused || fixCount >= maxFixes) return; 

    fixCount++;

    if (fixCount < maxFixes) {
        message.textContent = currentLanguage === 'en' ? 
            `Fixing... (${fixCount}/${maxFixes})` : 
            `Naprawianie... (${fixCount}/${maxFixes})`;
    } else {
        explode();
    }
});

function explode() {
    laptop.src = 'assets/explode.gif';  
    message.textContent = currentLanguage === 'en' ? 
        'Boom! TOO LATE!!!!!!!!!!!!!!!!!!!!!!!!!!!! The laptop exploded!' : 
        'BUM! ZA PÓŹNO!!!!!!!!!!!!!!!!!!!!!!!!!!!! Laptop wybuchł!';
    laptop.style.cursor = 'not-allowed';
}

// Pause/Resume Logic
pauseButton.addEventListener('click', () => {
    if (fixCount >= maxFixes) return; // Can't pause if it's already blown up!

    isPaused = !isPaused;
    
    if (isPaused) {
        message.textContent = currentLanguage === 'en' ? 'Game Paused.' : 'Gra wstrzymana.';
        pauseButton.textContent = currentLanguage === 'en' ? 'Resume' : 'Wznów';
    } else {
        message.textContent = currentLanguage === 'en' ? 
            `Fixing... (${fixCount}/${maxFixes})` : 
            `Naprawianie... (${fixCount}/${maxFixes})`;
        pauseButton.textContent = currentLanguage === 'en' ? 'Pause' : 'Pauza';
    }
});

// Init
updateTexts();
