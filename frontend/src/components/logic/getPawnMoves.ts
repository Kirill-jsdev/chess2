import type { BoardState, Position } from "../types/types";

export function getPawnMoves(position: Position, color: "White" | "Black", board: BoardState): Position[] {
  const file = position[0]; // 'a' to 'h'
  const rank = parseInt(position[1]); // 1 to 8

  const moves: Position[] = [];

  // Determine direction based on color
  const direction = color === "White" ? 1 : -1;
  const startRank = color === "White" ? 2 : 7;

  // One square forward
  const forwardRank = rank + direction;
  const forwardPos = `${file}${forwardRank}` as Position;
  if (forwardRank >= 1 && forwardRank <= 8 && !board[forwardPos]) {
    moves.push(forwardPos);

    // Two squares forward from starting position
    const doubleForwardRank = rank + 2 * direction;
    const doubleForwardPos = `${file}${doubleForwardRank}` as Position;
    if (rank === startRank && !board[doubleForwardPos] && !board[forwardPos]) {
      moves.push(doubleForwardPos);
    }
  }

  // Captures (diagonals)
  const fileCodes = [file.charCodeAt(0) - 1, file.charCodeAt(0) + 1];
  for (const fc of fileCodes) {
    if (fc >= 97 && fc <= 104) {
      // 'a' to 'h'
      const capturePos = `${String.fromCharCode(fc)}${forwardRank}` as Position;
      const target = board[capturePos];
      if (
        target &&
        target.split("-")[1] !== color // Only capture opponent's piece
      ) {
        moves.push(capturePos);
      }
    }
  }

  return moves;
}
