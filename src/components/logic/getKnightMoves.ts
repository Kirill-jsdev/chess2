import type { BoardState, Position } from "../types/types";

export function getKnightMoves(position: Position, color: "White" | "Black", board: BoardState): Position[] {
  const file = position[0]; // 'a' to 'h'
  const rank = parseInt(position[1]); // 1 to 8

  const moves: Position[] = [];
  const knightMoves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  for (const [df, dr] of knightMoves) {
    const newFileCode = file.charCodeAt(0) + df;
    const newRank = rank + dr;
    if (newFileCode >= 97 && newFileCode <= 104 && newRank >= 1 && newRank <= 8) {
      const newPos = `${String.fromCharCode(newFileCode)}${newRank}` as Position;
      const target = board[newPos];
      if (!target || target.split("-")[1] !== color) {
        moves.push(newPos);
      }
    }
  }

  return moves;
}
