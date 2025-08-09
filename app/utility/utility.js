import { pieces } from '../types/pieces.types.js'
import {legalMoves} from '../libs/lib.js'

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
                const position = e.target.getAttribute('data-position').split(',')
                const type = e.target.getAttribute('data-type')
                const color = e.target.getAttribute('data-color')
                console.log(position, type, color)

                legalMoves({type, position, color})
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
            img.setAttribute('data-position', piece.position)
            img.setAttribute('data-type', piece.type)
            img.setAttribute('data-color', color)
            
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