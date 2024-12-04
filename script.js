let currentNumber = null;
let gameLog = [];
const bannedNumbers = [1];
let wrongAttempts = 0;

// DOM Elements
const playerInput = document.getElementById('player-input');
const submitButton = document.getElementById('submit-button');
const currentNumberDisplay = document.getElementById('current-number');
const gameMessage = document.getElementById('game-message');
const gameLogElement = document.getElementById('game-log');

// Helper Functions
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function updateGameLog(message) {
    gameLog.push(message);
    const logItem = document.createElement('li');
    logItem.textContent = message;
    gameLogElement.appendChild(logItem);
}

// Game Logic
submitButton.addEventListener('click', () => {
    const input = parseInt(playerInput.value);
    if (isNaN(input)) {
        gameMessage.textContent = "Geçerli bir sayı giriniz!";
        return;
    }

    // İlk hamle
    if (currentNumber === null) {
        if (isPrime(input)) {
            gameMessage.textContent = "Oyun asal sayı ile başlayamaz!";
            return;
        }
        currentNumber = input;
        currentNumberDisplay.innerHTML = `Şu anki sayı: <strong>${currentNumber}</strong>`;
        gameMessage.textContent = "Oyun başladı! Çarpan veya kat giriniz.";
        updateGameLog(`İlk sayı: ${currentNumber}`);
        playerInput.value = "";
        return;
    }

    // Kurallara Uygunluk Kontrolü
    if (input % currentNumber !== 0 && currentNumber % input !== 0) {
        wrongAttempts++;
        gameMessage.textContent = `Hatalı hamle! Toplam yanlış: ${wrongAttempts}`;
        if (wrongAttempts >= 3) {
            gameMessage.textContent = "Üç hatalı hamle yaptınız, kaybettiniz!";
            submitButton.disabled = true;
        }
        return;
    }

    // Doğru hamle
    currentNumber = input;
    currentNumberDisplay.innerHTML = `Şu anki sayı: <strong>${currentNumber}</strong>`;
    gameMessage.textContent = "Sıradaki hamle için sayı giriniz.";
    updateGameLog(`Yeni sayı: ${currentNumber}`);
    playerInput.value = "";
});

