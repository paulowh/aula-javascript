document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = Array.from(document.getElementsByClassName('cell'));
    const restartBtn = document.getElementById('restartBtn');
    const message = document.getElementById('message');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
        [0, 4, 8], [2, 4, 6] // diagonais
    ];
    let currentPlayer = 'X';
    let gameEnded = false;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartBtn.addEventListener('click', restartGame);

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = cells.indexOf(cell);

        if (cell.textContent === '' && !gameEnded) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);

            if (checkWin()) {
                gameEnded = true;
                message.textContent = `Jogador ${currentPlayer} venceu!`;
                message.classList.add('win-message');
                return;
            }

            if (checkDraw()) {
                gameEnded = true;
                message.textContent = 'O jogo terminou em empate!';
                message.classList.add('draw-message');
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentPlayer);
            });
        });
    }

    function checkDraw() {
        return cells.every(cell => {
            return cell.textContent !== '';
        });
    }

    function restartGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });

        currentPlayer = 'X';
        gameEnded = false;
        message.textContent = '';
        message.classList.remove('win-message', 'draw-message');
    }
});
