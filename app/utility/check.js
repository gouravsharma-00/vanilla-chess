// chessCheck.js
export function isKingInCheck(color) {
    const kingSquare = findKing(color);
    if (!kingSquare) return { inCheck: false, attackers: [] };

    const attackers = [];
    const enemyColor = color === "white" ? "black" : "white";

    // check all enemy pieces and see if they can move to king
    const pieces = document.querySelectorAll(`img[data-color='${enemyColor}']`);
    pieces.forEach(piece => {
        const moves = getMovesForPiece(piece);
        moves.forEach(([r, c]) => {
            if (r == kingSquare.row && c == kingSquare.col) {
                attackers.push({
                    type: piece.alt,
                    from: piece.dataset.position,
                    to: `${r},${c}`,
                    name: piece.dataset.name
                });
            }
        });
    });

    return { inCheck: attackers.length > 0, attackers };
}

export function isCheckmate(color) {
    const { inCheck } = isKingInCheck(color);
    if (!inCheck) return false;

    // simulate all possible moves for this color
    const pieces = document.querySelectorAll(`img[data-color='${color}']`);
    for (const piece of pieces) {
        const moves = getMovesForPiece(piece);
        for (const [r, c] of moves) {
            if (simulateMove(piece, r, c)) {
                return false; // has at least one escape
            }
        }
    }

    return true; // no legal moves left → checkmate
}

// === Helpers ===

function findKing(color) {
    const king = document.querySelector(`img[alt="king"][data-color='${color}']`);
    if (!king) return null;
    return { row: Number(king.dataset.row), col: Number(king.dataset.col) };
}

function getMovesForPiece(piece) {
    const type = piece.alt;
    const color = piece.dataset.color;
    const row = Number(piece.dataset.row);
    const col = Number(piece.dataset.col);

    switch (type) {
        case "pawn": return getPawnMoves(row, col, color);
        case "rook": return getRookMoves(row, col, color);
        case "knight": return getKnightMoves(row, col, color);
        case "bishop": return getBishopMoves(row, col, color);
        case "queen": return getQueenMoves(row, col, color);
        case "king": return getKingMoves(row, col, color);
    }
    return [];
}

// simulate a move and check if king is still in check
function simulateMove(piece, r, c) {
    const startSquare = document.getElementById(`square-${piece.dataset.row}-${piece.dataset.col}`);
    const endSquare = document.getElementById(`square-${r}-${c}`);

    const targetImg = endSquare.querySelector("img");

    // simulate move
    startSquare.removeChild(piece);
    if (targetImg) targetImg.remove();
    endSquare.appendChild(piece);

    // update dataset
    const oldRow = piece.dataset.row, oldCol = piece.dataset.col;
    piece.dataset.row = r;
    piece.dataset.col = c;

    const { inCheck } = isKingInCheck(piece.dataset.color);

    // undo move
    endSquare.removeChild(piece);
    startSquare.appendChild(piece);
    piece.dataset.row = oldRow;
    piece.dataset.col = oldCol;
    if (targetImg) endSquare.appendChild(targetImg);

    return !inCheck;
}

// === Piece move generators (same as before) ===
function getPawnMoves(row, col, color) {
    const dir = color === "white" ? 1 : -1;
    let moves = [];

    // forward move
    let nextRow = row + dir;
    if (isEmpty(nextRow, col)) {
        moves.push([nextRow, col]);

        // double move from start
        if ((color === "white" && row === 1) || (color === "black" && row === 6)) {
            if (isEmpty(row + 2 * dir, col)) moves.push([row + 2 * dir, col]);
        }
    }

    // captures
    [[nextRow, col - 1], [nextRow, col + 1]].forEach(([r, c]) => {
        if (isEnemy(r, c, color)) moves.push([r, c]);
    });

    return moves;
}

function getRookMoves(row, col, color) {
    return getSlidingMoves(row, col, color, [[1,0],[-1,0],[0,1],[0,-1]]);
}

function getBishopMoves(row, col, color) {
    return getSlidingMoves(row, col, color, [[1,1],[1,-1],[-1,1],[-1,-1]]);
}

function getQueenMoves(row, col, color) {
    return [
        ...getRookMoves(row, col, color),
        ...getBishopMoves(row, col, color)
    ];
}

function getKnightMoves(row, col, color) {
    const offsets = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
    return offsets.filter(([dr, dc]) => isOnBoard(row+dr, col+dc) && !isAlly(row+dr, col+dc, color))
                  .map(([dr, dc]) => [row+dr, col+dc]);
}

function getKingMoves(row, col, color) {
    const offsets = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
    return offsets.filter(([dr, dc]) => isOnBoard(row+dr, col+dc) && !isAlly(row+dr, col+dc, color))
                  .map(([dr, dc]) => [row+dr, col+dc]);
}

// sliding pieces helper
function getSlidingMoves(row, col, color, directions) {
    let moves = [];
    directions.forEach(([dr, dc]) => {
        let r = row + dr, c = col + dc;
        while (isOnBoard(r,c)) {
            if (isEmpty(r,c)) {
                moves.push([r,c]);
            } else {
                if (isEnemy(r,c,color)) moves.push([r,c]);
                break;
            }
            r += dr; c += dc;
        }
    });
    return moves;
}

// helpers
function isOnBoard(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
}
function isEmpty(r, c) {
    const sq = document.getElementById(`square-${r}-${c}`);
    return sq && !sq.querySelector("img");
}
function isEnemy(r, c, color) {
    const sq = document.getElementById(`square-${r}-${c}`);
    const piece = sq?.querySelector("img");
    return piece && piece.dataset.color !== color;
}
function isAlly(r, c, color) {
    const sq = document.getElementById(`square-${r}-${c}`);
    const piece = sq?.querySelector("img");
    return piece && piece.dataset.color === color;
}

function isEnemyPiece(img) {
    if (!selected || !img) return false;
    return img.dataset.color !== selected.color;
}

export function isKingCaptured() {
    const whiteKing = document.querySelector(`img[alt="king"][data-color="white"]`);
    const blackKing = document.querySelector(`img[alt="king"][data-color="black"]`);

    if (!whiteKing) {
        return { captured: true, winner: "Black" };
    }
    if (!blackKing) {
        return { captured: true, winner: "White" };
    }
    return { captured: false, winner: null };
}
