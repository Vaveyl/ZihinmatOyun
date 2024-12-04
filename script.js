document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("game-board");
    const button = document.getElementById("next-move");
    let currentPlayer = 'X';
    let cells = [];

    // Oyun tahtasını oluştur
    function createBoard() {
        board.innerHTML = ''; // Temizle
        cells = []; // Hücreleri sıfırla
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', makeMove, { once: true });
            board.appendChild(cell);
            cells.push(cell);
        }
    }

    // Hücreye tıklama olayını işleme
    function makeMove(e) {
        e.target.textContent = currentPlayer;
        if (checkWinner()) {
            alert(`${currentPlayer} kazandı!`);
            resetGame();
        } else if (isBoardFull()) {
            alert('Beraberlik!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Sıradaki oyuncuya geç
        }
    }

    // Kazananı kontrol et
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            );
        });
    }

    // Tüm hücreler dolu mu kontrol et
    function isBoardFull() {
        return cells.every(cell => cell.textContent !== '');
    }

    // Oyunu sıfırla
    function resetGame() {
        setTimeout(createBoard, 1000);
        currentPlayer = 'X'; // Oyuncuyu başa al
    }

    // Yeni hamle butonuna basıldığında tahtayı sıfırla
    button.addEventListener('click', createBoard);

    // Oyunu başlat
    createBoard();
});
