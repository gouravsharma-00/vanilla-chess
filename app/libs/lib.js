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
  // Create dialog
  const rule = document.createElement('dialog');
  rule.setAttribute('id', 'rulesModal');

  // Add content
  rule.innerHTML = `
    <div class="rules-content">
      <button class="close-btn" onclick="document.getElementById('rulesModal').close()">✖</button>
      <h2>♟️ Chess Rules</h2>
      <ul>
        <li>
          <h3>🎯 Objective</h3>
          <p>The goal is to <strong>checkmate</strong> your opponent’s king — when the king is under attack and has no legal move left. The game ends when a player is checkmated or has no legal moves.</p>
        </li>
        <li>
          <h3>🪧 The Board</h3>
          <p>Played on an <strong>8×8 grid</strong> with alternating light and dark squares.</p>
        </li>
        <li>
          <h3>♔ Piece Movements</h3>
          <ul>
            <li><strong>King</strong>: One square in any direction.</li>
            <li><strong>Queen</strong>: Any number of squares in any direction.</li>
            <li><strong>Rook</strong>: Any number of squares horizontally or vertically.</li>
            <li><strong>Bishop</strong>: Any number of squares diagonally.</li>
            <li><strong>Knight</strong>: “L” shape, jumping over pieces.</li>
            <li><strong>Pawn</strong>: One square forward (two on its first move). Captures diagonally. No Promotion to queen when reaching the opposite side.</li>
            <li><em>Note</em>: Some special moves like castling are disabled.</li>
          </ul>
        </li>
        <li>
          <h3>🃏 Game-Changing Cards</h3>
          <p>Each player gets <strong>3 special cards</strong> to use once during the game:</p>
          <ul>
            <li><strong>The Skip</strong>: Force your opponent to skip their turn.</li>
            <li><strong>The Shield</strong>: Make your pieces (any) invincible for a turn.</li>
            <li><strong>The Nuke</strong>: Instantly remove one of your opponent’s pawns.</li>
          </ul>
        </li>
      </ul>
    </div>
  `;

  // Append to body
  document.body.appendChild(rule);

  // Add CSS styles
  const style = document.createElement("style");
  style.textContent = `
    #rulesModal {
      border: none;
      padding: 0;
      background: transparent;
      margin: auto;
    }

    .rules-content {
      background: #fff;

      padding: 24px 28px;
      max-width: 650px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      font-family: Arial, sans-serif;
      position: relative;
      animation: fadeIn 0.4s ease;
    }

    .rules-content h2 {
      font-size: 1.8rem;
      text-align: center;
      margin-bottom: 20px;
      color: #2c3e50;
    }

    .rules-content h3 {
      font-size: 1.2rem;
      margin-bottom: 6px;
      color: #34495e;
    }

    .rules-content ul {
      list-style: none;
      padding-left: 0;
      margin-bottom: 16px;
    }

    .rules-content ul li {
      margin-bottom: 14px;
      padding-left: 10px;
      border-left: 3px solid #3498db;
    }

    .rules-content ul ul {
      margin-top: 8px;
      padding-left: 20px;
    }

    .rules-content ul ul li {
      border-left: none;
      margin-bottom: 8px;
      font-size: 0.95rem;
      color: #555;
    }

    .rules-content p {
      margin: 0 0 10px;
      font-size: 1rem;
      color: #444;
    }

    .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #e74c3c;
      border: none;
      color: #fff;
      font-size: 1.1rem;
      padding: 6px 10px;
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .close-btn:hover {
      background: #c0392b;
      transform: scale(1.1);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // Open on button click
  document.getElementById('rules').addEventListener("click", () => {
    document.getElementById('rulesModal').showModal();
  });
}
