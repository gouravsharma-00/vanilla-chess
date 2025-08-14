import { spawn } from 'child_process';

const stockfish = spawn('stockfish');

stockfish.stdout.on('data', (data) => {
  console.log(`Stockfish: ${data}`);
});

// // Start UCI protocol
stockfish.stdin.write('uci\n');

// Start a new game
stockfish.stdin.write('ucinewgame\n');

// Send the current board state in FEN
stockfish.stdin.write('position startpos moves e2e4 e7e5\n');

// Ask Stockfish to calculate best move (depth 15)
stockfish.stdin.write('go depth 2\n');