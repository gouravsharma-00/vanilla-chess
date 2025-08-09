import { pieces } from '../types/pieces.types.js'

export function createBoard() {
    const board = document.getElementById('board')
    
    for(let row = 0; row < 8; row++) {
        for(let col = 0; col < 8; col++) {
            const grid = document.createElement('div')
            if((col + row) % 2 == 0) {
                grid.setAttribute('class', 'grid-white')
            }else {
                grid.setAttribute('class', 'grid-black')
            }
            grid.setAttribute('id', `square-${row}-${col}`)

            grid.addEventListener('click', (e) =>{
                console.log(e.target)
            })
            board.appendChild(grid)
        }
    }

    PlaceItems()
}


export function PlaceItems() {
    for(const color in pieces) {
        pieces[color].forEach(piece => {
            const img = document.createElement('img')
            img.src = piece.img
            img.alt = piece.type
            img.classList.add('pieces', `piece-${color}`)

            const [row, col] = piece.position

            const square = document.getElementById(`square-${row}-${col}`)
            square.appendChild(img)
        })
    }

}



/**
 * [
 * [1, 1, 1, 1, 1, 1, 1, 1],
 * [1, 1, 1, 1, 1, 1, 1, 1],
 * [0, 0, 0, 0, 0, 0, 0, 0],
 * [0, 0, 0, 0, 0, 0, 0, 0],
 * [0, 0, 0, 0, 0, 0, 0, 0],
 * [0, 0, 0, 0, 0, 0, 0, 0],
 * [1, 1, 1, 1, 1, 1, 1, 1],
 * [1, 1, 1, 1, 1, 1, 1, 1]
 * ]
 */