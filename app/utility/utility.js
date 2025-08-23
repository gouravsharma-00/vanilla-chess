import { isKingInCheck, isCheckmate, isKingCaptured  } from "./check.js";
import Replay from "./winner.js";
import Power from './power.js';

const P = new Power();

let selected = null;
let Turn = false; // false = 0 = white and true = 1 = black

function select(img) {
    if (!img) {
        selected = null;
        removeAvailableSquares();
        return;
    }

    // If a piece is already selected and user clicks another same-color piece → switch selection
    if (selected && img.dataset.color === selected.color) {
        removeAvailableSquares();
    }

    selected = {
        type: img.alt,
        name: img.dataset.name,
        position: img.dataset.position,
        color: img.dataset.color,
        row: img.dataset.row,
        col: img.dataset.col
    };

    getAvailableSquares(img);
}

export function getSquare(e) {
    // enforce turn system
    if ((Turn && e.target.dataset.color !== "black") || (!Turn && e.target.dataset.color !== "white")) {
        if (!selected) return;
    }

    if (!selected) {
        select(e.target);
    }  else {
            // if clicked same color piece → reselect
            if (selected.color === e.target.dataset.color) {
                select(e.target);
            }
        }


    // console.log(Turn); // turn
}

function getAvailableSquares(img) {
    removeAvailableSquares();

    const type = img.alt;
    const color = img.dataset.color;
    const row = Number(img.dataset.row);
    const col = Number(img.dataset.col);

    let moves = [];

    switch (type) {
        case "pawn": moves = getPawnMoves(row, col, color); break;
        case "rook": moves = getRookMoves(row, col, color); break;
        case "knight": moves = getKnightMoves(row, col, color); break;
        case "bishop": moves = getBishopMoves(row, col, color); break;
        case "queen": moves = getQueenMoves(row, col, color); break;
        case "king": moves = getKingMoves(row, col, color); break;
    }

    // highlight legal moves
    moves.forEach(([r, c]) => {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const square = document.getElementById(`square-${r}-${c}`);
            if (!square) return;

            const occupant = square.querySelector("img");
            if (!occupant) {
                square.classList.add("available"); // empty square
                square.addEventListener("click", moveSelectedPiece);
            } else if (occupant.dataset.color !== color) {
                square.classList.add("highlight-capture"); // enemy piece
                square.addEventListener("click", moveSelectedPiece);
            }
        }
    });
}

function moveSelectedPiece(e) {

    const square = e.currentTarget;
    const [r, c] = square.dataset.position.split(",").map(Number);

    const selectedSquare = document.getElementById(`square-${selected.row}-${selected.col}`);
    const selectedImg = selectedSquare.querySelector("img");

    // remove captured piece
    const targetImg = square.querySelector("img");
    if (targetImg) {
        if(selected.color == 'black' && P.activeshieldwhite) {
            return;
        }else if(P.activeshieldblack) {
            return;
        }
        targetImg.remove()
    };

    // move piece
    selectedSquare.removeChild(selectedImg);
    selectedImg.dataset.row = r;
    selectedImg.dataset.col = c;
    square.appendChild(selectedImg);
    

    console.log(`Moved ${selected.type} from ${selected.name} to ${square.dataset.name}`);
    selectedImg.dataset.name = square.dataset.name

    selected.color == 'black' ? P.expireShield('black') : P.expireShield('white');
    
    removeAvailableSquares();
    select(null);
    Turn = !Turn;
    // check and mate
     const currentColor = Turn ? "black" : "white";

    // === check for check or checkmate ===
    const { inCheck, attackers } = isKingInCheck(currentColor);

    if (inCheck) {
        console.log(`${currentColor} king is in CHECK by:`);
        console.log(attackers)
        attackers.forEach(a => {
            console.log(`- ${a.type} from ${a.name}`);
        });

        if (isCheckmate(currentColor)) {
            console.log(`CHECKMATE! ${currentColor} has no legal moves.`);
            pauseGame(); // remove listeners
            Replay(Turn ? "White" : "Black", restartGame);
        }
    }

    // === check if a king got captured ===
    const { captured, winner } = isKingCaptured();
    if (captured) {
        console.log(`GAME OVER — ${winner} wins by capturing the king!`);
        pauseGame(); // remove listeners
        Replay(winner, restartGame);
    }

}

function removeAvailableSquares() {
    const availableSquares = document.querySelectorAll(".available, .highlight-capture");
    availableSquares.forEach(square => {
        square.classList.remove("available", "highlight-capture");
        square.removeEventListener("click", moveSelectedPiece);
    });
}

// === Piece move generators (same as before) ===
export function getPawnMoves(row, col, color) {
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

export function getRookMoves(row, col, color) {
    return getSlidingMoves(row, col, color, [[1,0],[-1,0],[0,1],[0,-1]]);
}

export function getBishopMoves(row, col, color) {
    return getSlidingMoves(row, col, color, [[1,1],[1,-1],[-1,1],[-1,-1]]);
}

export function getQueenMoves(row, col, color) {
    return [
        ...getRookMoves(row, col, color),
        ...getBishopMoves(row, col, color)
    ];
}

export function getKnightMoves(row, col, color) {
    const offsets = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
    return offsets.filter(([dr, dc]) => isOnBoard(row+dr, col+dc) && !isAlly(row+dr, col+dc, color))
                  .map(([dr, dc]) => [row+dr, col+dc]);
}

export function getKingMoves(row, col, color) {
    const offsets = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
    return offsets.filter(([dr, dc]) => isOnBoard(row+dr, col+dc) && !isAlly(row+dr, col+dc, color))
                  .map(([dr, dc]) => [row+dr, col+dc]);
}

// sliding pieces helper
export function getSlidingMoves(row, col, color, directions) {
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
export function isOnBoard(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
}
export function isEmpty(r, c) {
    const sq = document.getElementById(`square-${r}-${c}`);
    return sq && !sq.querySelector("img");
}
export function isEnemy(r, c, color) {
    const sq = document.getElementById(`square-${r}-${c}`);
    const piece = sq?.querySelector("img");
    return piece && piece.dataset.color !== color;
}
export function isAlly(r, c, color) {
    const sq = document.getElementById(`square-${r}-${c}`);
    const piece = sq?.querySelector("img");
    return piece && piece.dataset.color === color;
}

function isEnemyPiece(img) {
    if (!selected || !img) return false;
    return img.dataset.color !== selected.color;
}



export function pauseGame() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(sq => {
        const clone = sq.cloneNode(true);
        sq.parentNode.replaceChild(clone, sq); // removes all listeners
    });
}

export function restartGame() {
    window.location.reload(); // simplest reset
}

document.getElementById('restart').addEventListener("click", () => {
    restartGame();
})

// power
document.getElementById('black-shield').addEventListener('click', () => {
    P.useShield('black');
    console.log("Shield Activated for Black")
})

document.getElementById('white-power').addEventListener('click', () => {
    P.useShield('white');
    console.log("Shield Activated for white")

})