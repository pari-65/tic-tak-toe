const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let gameActive = true;

function makeMove(row, col) {
    if (board[row][col] || !gameActive) return;
    
    board[row][col] = currentPlayer;
    const cell = document.querySelectorAll('.cell')[row * 3 + col];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    
    if (checkWinner()) {
        document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    
    if (board.flat().every(cell => cell)) {
        document.getElementById('message').textContent = 'It\'s a tie!';
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        // Horizontal
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Vertical
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonal
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a[0]][a[1]] &&
               board[a[0]][a[1]] === board[b[0]][b[1]] &&
               board[a[0]][a[1]] === board[c[0]][c[1]];
    });
}

function resetGame() {
    board.forEach(row => row.fill(''));
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    document.getElementById('message').textContent = '';
    currentPlayer = 'X';
    gameActive = true;
}
