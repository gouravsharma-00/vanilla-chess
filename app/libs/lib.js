import { moves } from '../types/moves.types.js'

function clearHighlights() {
  document.querySelectorAll(".highlight-move, .highlight-capture")
    .forEach(el => el.classList.remove("highlight-move", "highlight-capture"));
}

export function legalMoves({type, position, color}) {
    clearHighlights()

    const {move, capture} = moves[color][type]

    const [row, col] = position
    for(const pos in move) {

        const canRow = move[pos][0] + Number(row)
        const canCol = move[pos][1] + Number(col)

        if(canRow < 8 && canCol < 8 && canRow >= 0 && canCol >= 0) {
            const square = document.getElementById(`square-${canRow}-${canCol}`)
            if(!square.querySelector('img')) {
                square.classList.add('highlight-move')
            }
        }

    }
    
    for(const pos in capture) {
        const canRow = Number(row) + capture[pos][0]
        const canCol = Number(col) + capture[pos][1] 

        if(canRow < 8 && canCol < 8 && canRow >= 0 && canCol >= 0) {
            const square = document.getElementById(`square-${canRow}-${canCol}`)

            if(square.querySelector('img')) {
                if(square.querySelector('img').getAttribute('data-color') !== color) {
                    square.classList.add('highlight-capture')
                }
            }
        }
    }
}

