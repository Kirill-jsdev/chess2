import type { BoardState, Position } from "../types/types";
import { getPawnMoves } from "./getPawnMoves";
import { getKnightMoves } from "./getKnightMoves";
import { getBishopMoves } from "./getBishopMoves";
import { getRookMoves } from "./getRookMoves";
import { getQueenMoves } from "./getQueenMoves";
import { getKingMoves } from "./getKingMoves";

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
      case "King":
        moves = getKingMoves(pos as Position, opponentColor, board);
        break;
      default:
        break;
    }
    if (moves.includes(kingPosition)) {
      return true;
    }
  }
  return false;
}
