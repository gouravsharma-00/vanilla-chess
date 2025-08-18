let selected = null;

let Turn = false; // false = 0 = white and true = 1 = black

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
            color: img.dataset.color,
            row: img.dataset.row,
            col: img.dataset.col
        }
    getAvailableSquares(img);
}
export function getSquare(e) {
    if((Turn && e.target.dataset.color !== "black") || (!Turn && e.target.dataset.color !== "white")) {
        if(!selected) {
            return
        }
        
    }
    if(!selected) {
        select(e.target)

    }else {
        if(isEnemyPiece(e.target)) {

            
            const square = document.getElementById(`square-${e.target.dataset.row}-${e.target.dataset.col}`)
            const img = square.querySelector("img")

            // capture the opponent
            square.removeChild(img);
            e.target.removeEventListener("click", getSquare);

            // move the piece
            const selectedSquare = document.getElementById(`square-${selected.row}-${selected.col}`)
            const selectedImg = selectedSquare.querySelector("img")

            selectedSquare.removeChild(selectedImg);

            selectedImg.dataset.name = e.target.dataset.name
            selectedImg.dataset.row = e.target.dataset.row
            selectedImg.dataset.col = e.target.dataset.col
            selectedImg.dataset.position = square.dataset.position

            square.appendChild(selectedImg)



            console.log(
                `Moved ${selected.type} from ${selected.name} to ${e.target.dataset.name}`
            )

            select(null);


        }else {
            if(selected.color === e.target.dataset.color) {
                select(e.target)
            }else {
                select(null)
            }
        }
        Turn = !Turn

    }

    console.log(Turn)
}

function getAvailableSquares(img) {
    removeAvailableSquares();

    const currentRow = Number(img.dataset.row);
    const currentCol = Number(img.dataset.col);
    if(img.dataset.color === "white") {
    for(let i = 1; i < 3; i++) {
        const square = document.getElementById(`square-${currentRow + i}-${currentCol}`);
        if(!square.querySelector('img')) {
            square.classList.add("available")
        }else {
            return
        }
    }
    }else {
    for(let i = 1; i < 3; i++) {
        const square = document.getElementById(`square-${currentRow - i}-${currentCol}`);
        if(!square.querySelector('img')) {
            square.classList.add("available")
        }else {
            return
        }
    }
    }

}

function removeAvailableSquares() {
    const availableSquares = document.querySelectorAll(".available");
    availableSquares.forEach(square => {
        square.classList.remove("available");
    });
}

function isEnemyPiece(img) {
    if(!selected || !img) {
        console.error("selected or img is null/undefined")
        return false;
    }
    if(img.dataset.color !== selected.color){
        return true;
    }

    return false;
}



