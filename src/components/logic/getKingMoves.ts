import type { BoardState, Position } from "../types/types";

export function getKingMoves(position: Position, color: "White" | "Black", board: BoardState): Position[] {
  const file = position[0]; // 'a' to 'h'
  const rank = parseInt(position[1]); // 1 to 8

  const moves: Position[] = [];
  const directions = [
    [1, 0], // right
    [-1, 0], // left
    [0, 1], // up
    [0, -1], // down
    [1, 1], // up-right
    [1, -1], // down-right
    [-1, 1], // up-left
    [-1, -1], // down-left
  ];

  for (const [df, dr] of directions) {
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
