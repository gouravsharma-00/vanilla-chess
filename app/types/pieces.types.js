export const pieces = {
  white: [
    { name: "rook1",  type: "rook",   img: "public/images/white/rook.png",   legalMoves: "rook",   position: [0, 0] },
    { name: "knight1",type: "knight", img: "public/images/white/knight.png", legalMoves: "knight", position: [0, 1] },
    { name: "bishop1",type: "bishop", img: "public/images/white/bishop.png", legalMoves: "bishop", position: [0, 2] },
    { name: "queen",  type: "queen",  img: "public/images/white/queen.png",  legalMoves: "queen",  position: [0, 3] },
    { name: "king",   type: "king",   img: "public/images/white/king.png",   legalMoves: "king",   position: [0, 4] },
    { name: "bishop2",type: "bishop", img: "public/images/white/bishop.png", legalMoves: "bishop", position: [0, 5] },
    { name: "knight2",type: "knight", img: "public/images/white/knight.png", legalMoves: "knight", position: [0, 6] },
    { name: "rook2",  type: "rook",   img: "public/images/white/rook.png",   legalMoves: "rook",   position: [0, 7] },

    // Pawns
    { name: "pawn1",  type: "pawn",   img: "public/images/white/pawn.png",   legalMoves: "pawn",   position: [1, 0] },
    { name: "pawn2",  type: "pawn",   img: "public/images/white/pawn.png",   legalMoves: "pawn",   position: [1, 1] },
    { name: "pawn3",  type: "pawn",   img: "public/images/white/pawn.png",   legalMoves: "pawn",   position: [1, 2] },
    { name: "pawn4",  type: "pawn",   img: "public/images/white/pawn.png",   legalMoves: "pawn",   position: [1, 3] },
    { name: "pawn5",  type: "pawn",   img: "public/images/white/pawn.png",   legalMoves: "pawn",   position: [1, 4] },
    { name: "pawn6",  type: "pawn",   img: "public/images/white/pawn.png",   legalMoves: "pawn",   position: [1, 5] },
    { name: "pawn7",  type: "pawn",   img: "public/images/white/pawn.png",   legalMoves: "pawn",   position: [1, 6] },
    { name: "pawn8",  type: "pawn",   img: "public/images/white/pawn.png",   legalMoves: "pawn",   position: [1, 7] },
  ],

  black: [
    { name: "rook1",  type: "rook",   img: "public/images/black/rook.png",   legalMoves: "rook",   position: [7, 0] },
    { name: "knight1",type: "knight", img: "public/images/black/knight.png", legalMoves: "knight", position: [7, 1] },
    { name: "bishop1",type: "bishop", img: "public/images/black/bishop.png", legalMoves: "bishop", position: [7, 2] },
    { name: "queen",  type: "queen",  img: "public/images/black/queen.png",  legalMoves: "queen",  position: [7, 3] },
    { name: "king",   type: "king",   img: "public/images/black/king.png",   legalMoves: "king",   position: [7, 4] },
    { name: "bishop2",type: "bishop", img: "public/images/black/bishop.png", legalMoves: "bishop", position: [7, 5] },
    { name: "knight2",type: "knight", img: "public/images/black/knight.png", legalMoves: "knight", position: [7, 6] },
    { name: "rook2",  type: "rook",   img: "public/images/black/rook.png",   legalMoves: "rook",   position: [7, 7] },

    // Pawns
    { name: "pawn1",  type: "pawn",   img: "public/images/black/pawn.png",   legalMoves: "pawn",   position: [6, 0] },
    { name: "pawn2",  type: "pawn",   img: "public/images/black/pawn.png",   legalMoves: "pawn",   position: [6, 1] },
    { name: "pawn3",  type: "pawn",   img: "public/images/black/pawn.png",   legalMoves: "pawn",   position: [6, 2] },
    { name: "pawn4",  type: "pawn",   img: "public/images/black/pawn.png",   legalMoves: "pawn",   position: [6, 3] },
    { name: "pawn5",  type: "pawn",   img: "public/images/black/pawn.png",   legalMoves: "pawn",   position: [6, 4] },
    { name: "pawn6",  type: "pawn",   img: "public/images/black/pawn.png",   legalMoves: "pawn",   position: [6, 5] },
    { name: "pawn7",  type: "pawn",   img: "public/images/black/pawn.png",   legalMoves: "pawn",   position: [6, 6] },
    { name: "pawn8",  type: "pawn",   img: "public/images/black/pawn.png",   legalMoves: "pawn",   position: [6, 7] },
  ]
};