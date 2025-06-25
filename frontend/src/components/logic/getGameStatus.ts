import type { BoardState, PieceColor, Position, GameStatus } from "../types/types";
import { getPawnMoves } from "./getPawnMoves";
import { getKnightMoves } from "./getKnightMoves";
import { getBishopMoves } from "./getBishopMoves";
import { getRookMoves } from "./getRookMoves";
import { getQueenMoves } from "./getQueenMoves";
import { getKingMoves } from "./getKingMoves";

export function getGameStatus(color: PieceColor, board: BoardState): GameStatus {
  // 1. Find king position
  let kingPosition: Position | null = null;
  for (const pos in board) {
    if (board[pos as Position] === `King-${color}`) {
      kingPosition = pos as Position;
      break;
    }
  }
  if (!kingPosition) return "inProgress"; // King not found

  // 2. Check if king is attacked
  const opponentColor = color === "White" ? "Black" : "White";
  let inCheck = false;
  for (const pos in board) {
    const piece = board[pos as Position];
    if (!piece) continue;
    const [type, pieceColor] = piece.split("-");
    if (pieceColor !== opponentColor) continue;

    let moves: Position[] = [];
    switch (type) {
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
      inCheck = true;
      break;
    }
  }

  // 3. If not in check, it's inProgress unless no legal moves (stalemate, not handled here)
  if (!inCheck) return "inProgress";

  // 4. If in check, check for any legal move to escape
  for (const pos in board) {
    const piece = board[pos as Position];
    if (!piece) continue;
    const [type, pieceColor] = piece.split("-");
    if (pieceColor !== color) continue;

    let moves: Position[] = [];
    switch (type) {
      case "Pawn":
        moves = getPawnMoves(pos as Position, color, board);
        break;
      case "Knight":
        moves = getKnightMoves(pos as Position, color, board);
        break;
      case "Bishop":
        moves = getBishopMoves(pos as Position, color, board);
        break;
      case "Rook":
        moves = getRookMoves(pos as Position, color, board);
        break;
      case "Queen":
        moves = getQueenMoves(pos as Position, color, board);
        break;
      case "King":
        moves = getKingMoves(pos as Position, color, board);
        break;
      default:
        break;
    }

    for (const move of moves) {
      const newBoard = { ...board, [move]: piece };
      delete newBoard[pos as Position];

      // Check if king is still attacked after this move
      let kingPosAfterMove: Position | null = kingPosition;
      if (type === "King") kingPosAfterMove = move;

      let stillInCheck = false;
      for (const oppPos in newBoard) {
        const oppPiece = newBoard[oppPos as Position];
        if (!oppPiece) continue;
        const [oppType, oppColor] = oppPiece.split("-");
        if (oppColor !== opponentColor) continue;

        let oppMoves: Position[] = [];
        switch (oppType) {
          case "Pawn":
            oppMoves = getPawnMoves(oppPos as Position, opponentColor, newBoard);
            break;
          case "Knight":
            oppMoves = getKnightMoves(oppPos as Position, opponentColor, newBoard);
            break;
          case "Bishop":
            oppMoves = getBishopMoves(oppPos as Position, opponentColor, newBoard);
            break;
          case "Rook":
            oppMoves = getRookMoves(oppPos as Position, opponentColor, newBoard);
            break;
          case "Queen":
            oppMoves = getQueenMoves(oppPos as Position, opponentColor, newBoard);
            break;
          case "King": {
            const [f, r] = [oppPos.charCodeAt(0), parseInt(oppPos[1])];
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
            oppMoves = kingDirs
              .map(([df, dr]) => `${String.fromCharCode(f + df)}${r + dr}` as Position)
              .filter((p) => p.length === 2 && p[0] >= "a" && p[0] <= "h" && parseInt(p[1]) >= 1 && parseInt(p[1]) <= 8);
            break;
          }
          default:
            break;
        }
        if (oppMoves.includes(kingPosAfterMove)) {
          stillInCheck = true;
          break;
        }
      }
      if (!stillInCheck) return "check";
    }
  }

  return "checkmate";
}
