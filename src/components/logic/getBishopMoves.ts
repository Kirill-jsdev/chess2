import type { BoardState, Position } from "../types/types";

export function getBishopMoves(position: Position, color: "White" | "Black", board: BoardState): Position[] {
  const file = position[0]; // 'a' to 'h'
  const rank = parseInt(position[1]); // 1 to 8

  const moves: Position[] = [];
  const directions = [
    [1, 1], // up-right
    [1, -1], // down-right
    [-1, 1], // up-left
    [-1, -1], // down-left
  ];

  for (const [df, dr] of directions) {
    let step = 1;
    while (true) {
      const newFileCode = file.charCodeAt(0) + df * step;
      const newRank = rank + dr * step;
      if (newFileCode < 97 || newFileCode > 104 || newRank < 1 || newRank > 8) break;
      const newPos = `${String.fromCharCode(newFileCode)}${newRank}` as Position;
      const target = board[newPos];
      if (!target) {
        moves.push(newPos);
      } else {
        if (target.split("-")[1] !== color) {
          moves.push(newPos);
        }
        break; // Can't jump over pieces
      }
      step++;
    }
  }

  return moves;
}
