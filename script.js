// HTML'deki oyun tahtası alanını seçiyoruz
const gameBoard = document.getElementById("game-board");

// Oyun için değişkenler
const usedNumbers = new Set(); // Söylenen sayıları takip eder
let currentNumber = null; // En son söylenen sayı
let playerTurn = 1; // Oyuncu sırasını tutar
const maxPlayers = 2; // Oyuncu sayısını belirler (daha fazlasına genişletilebilir)

// Oyun tahtasını oluştur
function createGameBoard() {
    for (let i = 1; i <= 100; i++) {
        const numberDiv = document.createElement("div");
        numberDiv.textContent = i;
        numberDiv.className = "number";
        gameBoard.appendChild(numberDiv);
    }
}

// Sayı geçerli mi? (Çarpan, kat veya daha önce söylenmemiş olmalı)
function isValidNumber(inputNumber) {
    if (usedNumbers.has(inputNumber)) {
        alert("Bu sayı daha önce söylendi!");
        return false;
    }
    if (currentNumber !== null) {
        if (inputNumber % currentNumber !== 0 && currentNumber % inputNumber !== 0) {
            alert("Sayı, önceki sayının çarpanı veya katı olmalı!");
            return false;
        }
    }
    return true;
}

// Kullanıcının sayı girmesi
function playerMove() {
    const input = prompt(`Oyuncu ${playerTurn}, bir sayı girin (1 hariç):`);
    const number = parseInt(input, 10);

    if (isNaN(number) || number === 1 || number < 1 || number > 100) {
        alert("Geçersiz giriş! Lütfen 1-100 arasında bir sayı girin (1 hariç).");
        return;
    }

    if (!isValidNumber(number)) {
        return;
    }

    // Sayı geçerliyse işlemleri uygula
    currentNumber = number;
    usedNumbers.add(number);

    // Sayıyı tahtada işaretle
    const allNumbers = document.querySelectorAll(".number");
    allNumbers[number - 1].classList.add("used");

    // Sırayı diğer oyuncuya geçir
    playerTurn = playerTurn % maxPlayers + 1;

    // Hamle bırakılmadığında oyunu bitir
    if (usedNumbers.size === 99) {
        alert("Oyun sona erdi! Hamle bırakılmadı. Oyun berabere!");
    }
}

// Başlatma
function startGame() {
    createGameBoard();
    alert("Oyun başlıyor! İlk sayı asal olmayan bir sayı olmalı.");
    playerMove(); // İlk hareket
}

// Tıklama olayını ekleyin
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        playerMove();
    }
});

// Başlat
startGame();
