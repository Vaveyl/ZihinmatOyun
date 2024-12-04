let currentNumber = null;
let gameLog = [];

const numberInput = document.getElementById('number-input');
const submitButton = document.getElementById('submit-button');
const currentNumberDisplay = document.getElementById('current-number');
const gameMessage = document.getElementById('game-message');
const logContainer = document.getElementById('log');

// Çarpan veya kat kontrolü
function isMultipleOrDivisor(newNumber, baseNumber) {
    return newNumber % baseNumber === 0 || baseNumber % newNumber === 0;
}

// Hamle geçmişini güncelle
function updateGameLog(message) {
    const logItem = document.createElement('li');
    logItem.textContent = message;
    logContainer.appendChild(logItem);
}

// "Gönder" butonu tıklandığında çalışacak işlev
submitButton.addEventListener('click', () => {
    const inputNumber = parseInt(numberInput.value, 10);

    // Geçersiz sayı kontrolü
    if (isNaN(inputNumber) || inputNumber <= 1) {
        gameMessage.textContent = "Lütfen 1'den büyük bir sayı girin!";
        return;
    }

    // İlk sayı seçimi
    if (currentNumber === null) {
        currentNumber = inputNumber;
        currentNumberDisplay.innerHTML = `Şu anki sayı: <strong>${currentNumber}</strong>`;
        gameMessage.textContent = "Oyun başladı! Şimdi sıra sizde.";
        updateGameLog(`Oyun ${currentNumber} ile başladı.`);
    } 
    // Çarpan veya kat kontrolü
    else if (isMultipleOrDivisor(inputNumber, currentNumber)) {
        currentNumber = inputNumber;
        currentNumberDisplay.innerHTML = `Şu anki sayı: <strong>${currentNumber}</strong>`;
        gameMessage.textContent = "Hamle başarılı!";
        updateGameLog(`Yeni sayı: ${currentNumber}`);
    } 
    // Geçersiz hamle
    else {
        gameMessage.textContent = "Girilen sayı geçerli değil! Aynı çarpan veya kat kuralına uymalı.";
    }

    numberInput.value = '';
    numberInput.focus();
});
