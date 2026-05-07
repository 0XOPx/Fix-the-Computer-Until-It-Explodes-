let fixCount = 0;
const maxFixes = 20;  
let isPaused = false; 
let currentLanguage = 'en'; 

const laptop = document.getElementById('laptop');
const message = document.getElementById('message');
const pauseButton = document.getElementById('pauseButton');

// Navigation Functions
function hideAll() {
    const containers = [
        'menu-container', 'game-container', 'settings-container', 
        'laptop-selection-container', 'creation-container'
    ];
    containers.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
}

function showSettings() {
    hideAll();
    document.getElementById('settings-container').style.display = 'block';
}

function backToMenu() {
    hideAll();
    document.getElementById('menu-container').style.display = 'flex';
}

function startGame() {
    hideAll();
    document.getElementById('game-container').style.display = 'block';
    resetGame(); // Ensure game starts fresh
}

function showLaptopSelection() {
    hideAll();
    document.getElementById('laptop-selection-container').style.display = 'block';
}

function showCreation() {
    hideAll();
    document.getElementById('creation-container').style.display = 'block';
}

// Logic functions
function resetGame() {
    fixCount = 0;
    isPaused = false;
    laptop.src = 'assets/laptop.png';
    laptop.style.cursor = 'pointer';
    updateTexts();
}

function changeLanguage() {
    currentLanguage = document.getElementById('language').value;
    updateTexts();
}

function updateTexts() {
    const texts = {
        en: {
            message: 'Click to fix the laptop! BE CAREFUL UNTIL IT EXPLODES',
            play: 'Play',
            laptopSelection: 'Laptop Selection',
            creation: 'Creation (Coming Soon)',
            backToMenu: 'Back to Menu',
            paused: 'Game Paused. Click "Resume" to continue.',
            boom: 'Boom! TOO LATE! The laptop exploded!'
        },
        pl: {
            message: 'Kliknij, aby naprawić laptopa! UWAŻAJ, ABY NIE WYBUCHŁ!',
            play: 'Graj',
            laptopSelection: 'Wybór laptopa',
            creation: 'Tworzenie (Wkrótce)',
            backToMenu: 'Powrót do menu',
            paused: 'Gra wstrzymana. Kliknij "Wznów", aby kontynuować.',
            boom: 'BUM! ZA PÓŹNO! Laptop wybuchł!'
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
