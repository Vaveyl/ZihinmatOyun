// Oyun Durumları
let usedNumbers = [];
let errorCount = 0;
const maxErrors = 3;

// DOM Elementleri
const input = document.getElementById("number-input");
const submitBtn = document.getElementById("submit-btn");
const gameLog = document.getElementById("game-log");
const errorCountDisplay = document.getElementById("error-count");

// Yardımcı Fonksiyonlar
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function logMessage(message) {
    gameLog.innerText = message;
}

// Ana Oyun İşlevi
function playGame() {
    const inputValue = input.value.trim().toLowerCase();

    if (inputValue === "pas") {
        logMessage("Pas geçtiniz! Sıra diğer oyuncuda.");
        input.value = "";
        return;
    }

    const number = parseInt(inputValue, 10);

    if (isNaN(number)) {
        logMessage("Lütfen geçerli bir sayı girin!");
        return;
    }

    if (usedNumbers.includes(number)) {
        errorCount++;
        logMessage(`Bu sayı daha önce söylendi! Hata sayınız: ${errorCount}`);
        if (errorCount >= maxErrors) {
            logMessage("Çok fazla hata yaptınız! Oyun sona erdi.");
            submitBtn.disabled = true;
        }
        return;
    }

    if (isPrime(number)) {
        errorCount++;
        logMessage(`Asal bir sayı söylediniz! Hata sayınız: ${errorCount}`);
        if (errorCount >= maxErrors) {
            logMessage("Çok fazla hata yaptınız! Oyun sona erdi.");
            submitBtn.disabled = true;
        }
        return;
    }

    usedNumbers.push(number);
    logMessage(`Geçerli sayı: ${number}. Sıra diğer oyuncuda.`);
    errorCountDisplay.innerText = errorCount;
    input.value = "";
}

// Olay Dinleyiciler
submitBtn.addEventListener("click", playGame);
