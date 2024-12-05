const boardElement = document.getElementById('board');
const resultElement = document.getElementById('result');
let board = Array(9).fill(null);
let currentPlayer = 'X'; // Human player starts

// Initialize the board
function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.addEventListener('click', handleCellClick);
        boardElement.appendChild(cellElement);
    });
}

// Check for a winner or draw
function checkWinner(board) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return the winner ('X' or 'O')
        }
    }
    return board.includes(null) ? null : 'Draw'; // Return 'Draw' if no spaces left
}

// Minimax Algorithm
function minimax(newBoard, isMaximizing) {
    const winner = checkWinner(newBoard);
    if (winner === 'O') return { score: 1 };
    if (winner === 'X') return { score: -1 };
    if (winner === 'Draw') return { score: 0 };

    const moves = [];
    newBoard.forEach((cell, index) => {
        if (cell === null) {
            const move = {};
            move.index = index;
            newBoard[index] = isMaximizing ? 'O' : 'X';

            const result = minimax(newBoard, !isMaximizing);
            move.score = result.score;

            newBoard[index] = null;
            moves.push(move);
        }
    });

    if (isMaximizing) {
        return moves.reduce((best, move) => (move.score > best.score ? move : best), { score: -Infinity });
    } else {
        return moves.reduce((best, move) => (move.score < best.score ? move : best), { score: Infinity });
    }
}

// AI Move
function makeAIMove() {
    const bestMove = minimax(board, true);
    board[bestMove.index] = 'O';
    updateBoard();
    currentPlayer = 'X';
    checkGameOver();
}

// Handle Cell Click
function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] || checkWinner(board)) return;

    board[index] = currentPlayer;
    updateBoard();

    if (!checkGameOver()) {
        currentPlayer = 'O';
        setTimeout(makeAIMove, 500);
    }
}

// Update Board UI
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.classList.toggle('taken', !!board[index]);
    });
}

// Check if the game is over
function checkGameOver() {
    const winner = checkWinner(board);
    if (winner) {
        resultElement.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`;
        document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
        return true;
    }
    return false;
}

// Reset Game
function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    resultElement.textContent = '';
    createBoard();
}

// Initialize the game
createBoard();
