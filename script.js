// Oyun mantığı için gerekli olan başlangıç değerleri
let gameState = {
    playerTurn: true,  // true: oyuncu sırası, false: bilgisayar sırası
    board: [],
    message: "Oyuna Başlayın!"
};

// Oyun tahtası boyutları
const boardSize = 3;

// Sayfa yüklenince oyun başlatılır
window.onload = function() {
    initializeGame();

    // Mobil cihazlar için touchstart ve click etkinliklerini aynı anda dinlemek
    const makeMoveButton = document.getElementById('makeMoveButton');
    makeMoveButton.addEventListener('touchstart', handleButtonPress);
    makeMoveButton.addEventListener('click', handleButtonPress);
};

// Oyun başlatma fonksiyonu
function initializeGame() {
    gameState.board = Array(boardSize).fill().map(() => Array(boardSize).fill(null)); // 3x3'lik boş bir oyun tahtası
    gameState.message = "Oyuncu sırası!";
    updateUI();
}

// UI'yi güncelleme fonksiyonu
function updateUI() {
    const messageElement = document.getElementById('message');
    messageElement.innerText = gameState.message;
}

// Buton tıklama veya dokunma fonksiyonu
function handleButtonPress() {
    if (gameState.playerTurn) {
        gameState.message = "Bilgisayarın sırası!";
        gameState.playerTurn = false;
    } else {
        gameState.message = "Oyuncunun sırası!";
        gameState.playerTurn = true;
    }
    updateUI();
}
