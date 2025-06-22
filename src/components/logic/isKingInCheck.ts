//THIS FUNCTION IS NOT USED ANYWHERE CAN BE REMOVED IN THE FUTERE
//instead getGameStatus is used

import type { BoardState, Position } from "../types/types";
import { getPawnMoves } from "./getPawnMoves";
import { getKnightMoves } from "./getKnightMoves";
import { getBishopMoves } from "./getBishopMoves";
import { getRookMoves } from "./getRookMoves";
import { getQueenMoves } from "./getQueenMoves";

export function isKingInCheck(color: "White" | "Black", board: BoardState): boolean {
  // Find the king's position
  let kingPosition: Position | null = null;
  for (const pos in board) {
    if (board[pos as Position] === `King-${color}`) {
      kingPosition = pos as Position;
      break;
    }
  }
  if (!kingPosition) return false; // King not found

  // Check all opponent moves to see if any can capture the king
  const opponentColor = color === "White" ? "Black" : "White";
  for (const pos in board) {
    const piece = board[pos as Position];
    if (!piece) continue;
    const [pieceType, pieceColor] = piece.split("-");
    if (pieceColor !== opponentColor) continue;

    let moves: Position[] = [];
    switch (pieceType) {
      case "Pawn":
        moves = getPawnMoves(pos as Position, opponentColor, board);
        break;
      case "Knight":
        moves = getKnightMoves(pos as Position, opponentColor, board);
        break;
      case "Bishop":
        moves = getBishopMoves(pos as Position, opponentColor, board);
        break;
      case "Rook":
        moves = getRookMoves(pos as Position, opponentColor, board);
        break;
      case "Queen":
        moves = getQueenMoves(pos as Position, opponentColor, board);
        break;
      case "King": {
        // Instead of getKingMoves, check adjacent squares, getKingMoves inside uses isKingInCheck and creates a loop
        const [f, r] = [pos.charCodeAt(0), parseInt(pos[1])];
        const kingDirs = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ];
        moves = kingDirs
          .map(([df, dr]) => `${String.fromCharCode(f + df)}${r + dr}` as Position)
          .filter((p) => p.length === 2 && p[0] >= "a" && p[0] <= "h" && parseInt(p[1]) >= 1 && parseInt(p[1]) <= 8);
        break;
      }
      default:
        break;
    }
    if (moves.includes(kingPosition)) {
      return true;
    }
  }
  return false;
}
