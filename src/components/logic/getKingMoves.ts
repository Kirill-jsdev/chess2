import type { BoardState, ChessPieceColored, PieceColor, Position } from "../types/types";
import { isKingInCheck } from "./isKingInCheck";

export function getKingMoves(position: Position, color: "White" | "Black", board: BoardState): Position[] {
  const file = position[0]; // 'a' to 'h'
  const rank = parseInt(position[1]); // 1 to 8
  const King: ChessPieceColored = color === "White" ? "King-White" : "King-Black";

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

  const movesNotUnderAttack = moves.filter((to) => canKingMoveTo(position, to, King, board));

  return movesNotUnderAttack;
}

function canKingMoveTo(from: Position, to: Position, King: ChessPieceColored, board: BoardState): boolean {
  const boardCopy = { ...board };
  delete boardCopy[from];
  boardCopy[to] = King;
  const KingColor = King.split("-")[1] as PieceColor;
  return !isKingInCheck(KingColor, boardCopy);
}
