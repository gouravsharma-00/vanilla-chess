let selected = null;

function select(img) {
    if(!img) {
        selected = null;
        removeAvailableSquares();
        return;
    }
    selected = {
            type: img.alt,
            name: img.dataset.name,
            position: img.dataset.position,
            color: img.dataset.color
        }
    getAvailableSquares(img);
}
export function getSquare(e) {
    console.log(e.target);
    console.log(selected)

    if(!selected) {
        select(e.target)

    }else {
        if(isEnemyPiece(e.target)) {

        }else {
            if(selected.color === e.target.dataset.color) {
                select(e.target)
            }else {
                select(null)
            }
        }
        console.log(`Moved ${selected.name} (${selected.type}) from ${selected.position} to ${e.target.dataset.position}`)

        const square = document.getElementById(`square-${e.target.dataset.row}-${e.target.dataset.col}`)
        const img = square.querySelector("img")
        square.removeChild(img);
        selected = null
        console.log(square)
    }

    console.log(selected)
}

function getAvailableSquares(img) {
    removeAvailableSquares();

    const currentRow = img.dataset.row;
    const currentCol = img.dataset.col;

    console.log(`Selected: ${img}`)
}

function removeAvailableSquares() {
    const availableSquares = document.querySelectorAll(".available");
    availableSquares.forEach(square => {
        square.classList.remove("available");
    });
}