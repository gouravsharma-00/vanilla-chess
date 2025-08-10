import { pieces } from '../types/pieces.types.js' 

const board = document.getElementById('board')

export function createBoard() {
    // Place Tiles
    for(let row = 7; row >= 0; row--) {
        for(let col = 0; col < 8; col++) {
            const tile = document.createElement('div')
            if((row + col) % 2 == 0) {
                tile.setAttribute('class', 'grid-white')
                tile.classList.add('grid-white')
            }else {
                tile.classList.add('grid-black')
            }

            tile.setAttribute('id', `square-${row}-${col}`)
            tile.dataset.position = [row, col]

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
            square.appendChild(img)
        })
    }


}