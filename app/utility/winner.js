export default function Replay(winner, onRestart) {
    // Create modal container
    const modal = document.createElement("div");
    modal.className = "replay-modal";

    // Modal content
    modal.innerHTML = `
        <div class="replay-content">
            <h2>🎉 Congratulations ${winner}! 🎉</h2>
            <p>You won the game.</p>
            <div class="replay-buttons">
                <button id="restartBtn">Restart Game</button>
            </div>
        </div>
    `;

    // Append modal to body
    document.body.appendChild(modal);

    // Restart button click
    document.getElementById("restartBtn").addEventListener("click", () => {
        modal.remove(); // remove modal
        if (onRestart) onRestart(); // call restart logic
    });
}