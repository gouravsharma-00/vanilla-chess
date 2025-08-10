import { pieces } from '../types/pieces.types.js';
import { moves } from '../types/moves.types.js';

const boardElement = document.getElementById('board');
const squares = {};
let selectedPiece = null;
let currentTurn = 'white'; // White starts

export function createBoard() {
    boardElement.innerHTML = '';

    for (let row = 8; row >= 0; row--) {
        for (let col = 0; col < 9; col++) {
            const grid = document.createElement('div');
            const squareId = `${row}${String.fromCharCode(97 + col)}`;

            if (col === 8 && row !== 8) {
                grid.className = 'grid-num';
                grid.textContent = `${row + 1}`;
            } else if (row === 8 && col !== 8) {
                grid.className = 'grid-num';
                grid.textContent = `${String.fromCharCode(97 + col)}`;
            } else {
                grid.id = squareId;
                grid.dataset.place = squareId;
                grid.className = (col + row) % 2 === 0 ? 'grid-white' : 'grid-black';
                squares[squareId] = grid;
            }
            boardElement.appendChild(grid);
        }
    }
    PlaceItems();
}

export function PlaceItems() {
    for (const color in pieces) {
        pieces[color].forEach(piece => {
            const img = document.createElement('img');
            img.src = piece.img;
            img.alt = piece.type;
            img.dataset.type = piece.type;
            img.dataset.color = color;
            img.dataset.position = piece.position;
            img.className = `pieces piece-${color}`;

            const squareId = `${piece.position[0]}${String.fromCharCode(97 + piece.position[1])}`;
            const square = squares[squareId];

            if (square) {
                img.addEventListener('click', LegalMoves);
                square.appendChild(img);
            }
        });
    }
}

function highlightSquare(square, pieceColor, addMoveListener) {
    if (!square) return false;

    const occupyingPiece = square.querySelector('img');
    if (!occupyingPiece) {
        square.classList.add('highlight-move');
        addMoveListener(square);
        return true;
    } else if (occupyingPiece.dataset.color !== pieceColor) {
        square.classList.add('highlight-capture');
        addMoveListener(square);
        return false;
    } else {
        return false;
    }
}

export function LegalMoves(e) {
    const pieceColor = e.target.dataset.color;

    // Enforce turn
    if (pieceColor !== currentTurn) {
        return; // Not this player's turn
    }

    clearHighLight();
    selectedPiece = e.target;

    const { type, color, position } = e.target.dataset;
    const [row, col] = position.split(',').map(Number);

    const addMoveListener = (square) => {
        if (!square) return;
        square.addEventListener('click', () => movePiece(square), { once: true });
    };

    switch (type) {
        case 'pawn':
        case 'king':
        case 'knight':
            moves[color][type].move.forEach(m => {
                const newRow = row + m[0];
                const newCol = col + m[1];
                const squareId = `${newRow}${String.fromCharCode(97 + newCol)}`;
                highlightSquare(squares[squareId], color, addMoveListener);
            });
            break;

        case 'rook':
        case 'queen':
            // Up
            for (let i = row + 1; i < 8; i++) {
                if (!highlightSquare(squares[`${i}${String.fromCharCode(97 + col)}`], color, addMoveListener)) break;
            }
            // Down
            for (let i = row - 1; i >= 0; i--) {
                if (!highlightSquare(squares[`${i}${String.fromCharCode(97 + col)}`], color, addMoveListener)) break;
            }
            // Right
            for (let i = col + 1; i < 8; i++) {
                if (!highlightSquare(squares[`${row}${String.fromCharCode(97 + i)}`], color, addMoveListener)) break;
            }
            // Left
            for (let i = col - 1; i >= 0; i--) {
                if (!highlightSquare(squares[`${row}${String.fromCharCode(97 + i)}`], color, addMoveListener)) break;
            }
            if (type !== 'queen') break;

        case 'bishop':
            // Top-right
            for (let i = 1; row + i < 8 && col + i < 8; i++) {
                if (!highlightSquare(squares[`${row + i}${String.fromCharCode(97 + col + i)}`], color, addMoveListener)) break;
            }
            // Top-left
            for (let i = 1; row + i < 8 && col - i >= 0; i++) {
                if (!highlightSquare(squares[`${row + i}${String.fromCharCode(97 + col - i)}`], color, addMoveListener)) break;
            }
            // Bottom-right
            for (let i = 1; row - i >= 0 && col + i < 8; i++) {
                if (!highlightSquare(squares[`${row - i}${String.fromCharCode(97 + col + i)}`], color, addMoveListener)) break;
            }
            // Bottom-left
            for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
                if (!highlightSquare(squares[`${row - i}${String.fromCharCode(97 + col - i)}`], color, addMoveListener)) break;
            }
            break;
    }
}

function movePiece(targetSquare) {
    if (!selectedPiece) return;

    // Capture if enemy piece exists
    const enemyPiece = targetSquare.querySelector('img');
    if (enemyPiece && enemyPiece.dataset.color !== selectedPiece.dataset.color) {
        enemyPiece.remove();
    }

    // Move piece
    selectedPiece.parentElement.removeChild(selectedPiece);
    targetSquare.appendChild(selectedPiece);

    // Update piece position dataset
    const [row, colLetter] = [targetSquare.id[0], targetSquare.id[1]];
    selectedPiece.dataset.position = `${row},${colLetter.charCodeAt(0) - 97}`;

    // Change turn
    currentTurn = currentTurn === 'white' ? 'black' : 'white';

    clearHighLight();
    selectedPiece = null;
}

export function clearHighLight() {
    document.querySelectorAll('.highlight-move, .highlight-capture').forEach(ele => {
        ele.classList.remove('highlight-move', 'highlight-capture');
    });
}
