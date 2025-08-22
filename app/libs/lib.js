import { pieces } from '../types/pieces.types.js' 
import { getSquare } from '../utility/utility.js'
const board = document.getElementById('board')

export function createBoard() {
    // Place Tiles
    for(let row = 7; row >= 0; row--) {
        for(let col = 0; col < 8; col++) {
            const tile = document.createElement('div')
            const text = document.createElement("p")
            text.textContent = `${String.fromCharCode(97 + col)}${row + 1}`
            if((row + col) % 2 == 0) {
                tile.setAttribute('class', 'grid-white')
                tile.classList.add('grid-white')
                text.classList.add('tile-white')
            }else {
                tile.classList.add('grid-black')
                text.classList.add('tile-black')
            }

            tile.setAttribute('id', `square-${row}-${col}`)
            tile.dataset.position = [row, col]
            tile.dataset.name =  `${String.fromCharCode(97 + col)}${row + 1}`
            
            tile.appendChild(text)

            board.appendChild(tile)
        }
    }
    // Place Pieces
    for(const color in pieces) {
        pieces[color].map(item => {
            const img = document.createElement('img')
            img.src = item.img
            img.alt = item.type
            img.classList.add('pieces')

            const [row, col] = item.position

            const square = document.getElementById(`square-${row}-${col}`)
            img.dataset.position = square.dataset.position
            img.dataset.row = row;
            img.dataset.col = col;
            img.dataset.name = square.dataset.name
            img.dataset.color = color
            img.addEventListener("click", getSquare)
            square.appendChild(img)
        })
    }

    createRule();
}

export function createRule() {
    
    // rule dialog
    const rule = document.createElement('dialog')
    rule.setAttribute('id', 'rulesModal')
    rule.innerHTML = `
            <h2>Chess Rules</h2>
            <ul>
                <li>
                    <h3>Objective</h3>
                    <p>The goal is to **checkmate** the opponent's king. That's when their king is under attack and has no safe place to move. The game ends when a player is checkmated or they resign.</p>
                </li>
                <li>
                    <h3>The Board</h3>
                    <p>The game is played on an 8x8 board with alternating light and dark squares.</p>
                </li>
                <li>
                    <h3>Piece Movements</h3>
                    <ul>
                        <li>**King**: Moves one square in any direction.</li>
                        <li>**Queen**: Moves any number of squares horizontally, vertically, or diagonally.</li>
                        <li>**Rook**: Moves any number of squares horizontally or vertically.</li>
                        <li>**Bishop**: Moves any number of squares diagonally.</li>
                        <li>**Knight**: Moves in an "L" shape, jumping over other pieces.</li>
                        <li>**Pawn**: Moves one square forward. On its first move, it can go two squares. Pawns capture diagonally one square forward. When a pawn reaches the other end, it becomes a queen.</li>
                    </ul>
                </li>
                <li>
                    <h3>Game-Changing Cards</h3>
                    <p>Each player gets 3 special cards to use once during the game.</p>
                    <ul>
                        <li>**The Teleporter**: Move any of your pieces to any empty square.</li>
                        <li>**The Shield**: Protects one of your pieces for a full turn, making it invincible.</li>
                        <li>**The Destroyer**: Instantly remove any of your opponent's pawns from the board.</li>
                    </ul>
                </li>
            </ul>
            <button onclick="document.getElementById('rulesModal').close()">Close</button>
            `
    document.body.appendChild(rule)

    document.getElementById('rules').addEventListener("click", () => {
        document.getElementById('rulesModal').showModal();
    })
}