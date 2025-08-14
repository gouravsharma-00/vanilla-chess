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


}