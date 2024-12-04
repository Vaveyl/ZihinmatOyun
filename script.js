let players = [];
let currentPlayerIndex = 0;
let lastNumber = null;
let invalidAttempts = {};
let gameActive = false;

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('submitButton').addEventListener('click', submitNumber);

function startGame() {
    players = prompt("Oyuncu sayısını girin (en az 2):").split(',').map(p => p.trim());
    currentPlayerIndex = 0;
    lastNumber = null;
    invalidAttempts = {};
    gameActive = true;

    document.getElementById('players').innerHTML = players.join(', ');
    document.getElementById('message').textContent = "Oyun başladı! İlk sayı, asal olmayan bir sayı olmalı.";
}

function submitNumber() {
    if (!gameActive) {
        return;
    }

    const input = document.getElementById('numberInput');
    const number = parseInt(input.value);

    // 1 sayısı yasak
    if (number === 1) {
        endGame(`${players[currentPlayerIndex]} oyundan çıktı!`);
        return;
    }

    // Asal olmayan sayı kontrolü
    if (lastNumber === null || (number % lastNumber === 0 || lastNumber % number === 0)) {
        lastNumber = number;
        input.value = '';
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        document.getElementById('message').textContent = `${players[currentPlayerIndex]}'in sırası. Son sayı: ${lastNumber}`;
    } else {
        invalidAttempts[players[currentPlayerIndex]] = (invalidAttempts[players[currentPlayerIndex]] || 0) + 1;

        if (invalidAttempts[players[currentPlayerIndex]] >= 3) {
            endGame(`${players[currentPlayerIndex]} oyundan çıktı!`);
        } else {
            document.getElementById('message').textContent = `${players[currentPlayerIndex]} hatalı sayı söyledi! ${3 - invalidAttempts[players[currentPlayerIndex]]} hakkı kaldı.`;
        }
    }
}

function endGame(message) {
    gameActive = false;
    document.getElementById('message').textContent = message;
    document.getElementById('numberInput').disabled = true;
    document.getElementById('submitButton').disabled = true;
}
