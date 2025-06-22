import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STARTING_POSITION } from "../../utils/startingPosition";
import type { BoardState, ChessPieceColored, GameStatus, PieceColor, Position } from "../../components/types/types";
import { isKingInCheck } from "../../components/logic/isKingInCheck";
import { getKingMoves } from "../../components/logic/getKingMoves";

import { getPawnMoves } from "../../components/logic/getPawnMoves";
import { getKnightMoves } from "../../components/logic/getKnightMoves";
import { getBishopMoves } from "../../components/logic/getBishopMoves";
import { getRookMoves } from "../../components/logic/getRookMoves";
import { getQueenMoves } from "../../components/logic/getQueenMoves";
// import { getKingMoves } from "../../components/logic/getKingMoves";
type PieceOnBoard = {
  piece: ChessPieceColored;
  position: Position;
  availableMoves: Position[];
};

type ChessboardSlice = {
  board: BoardState;
  currentTurn: PieceColor;
  selectedPiece: PieceOnBoard | null;
  isCheck: boolean;
  status: GameStatus;
};

const initialState: ChessboardSlice = {
  board: STARTING_POSITION,
  currentTurn: "White",
  selectedPiece: null,
  isCheck: false,
  status: "inProgress",
};

export const chessboardSlice = createSlice({
  name: "chessboard",
  initialState,
  reducers: {
    move: (state, action: PayloadAction<{ oldPosition: Position; newPosition: Position }>) => {
      const { oldPosition, newPosition } = action.payload;
      const piece = state.board[oldPosition];
      delete state.board[oldPosition];
      state.board[newPosition] = piece;
      state.selectedPiece = null;
      state.currentTurn = state.currentTurn === "White" ? "Black" : "White";
      state.isCheck = isKingInCheck(piece?.split("-")[1] === "White" ? "Black" : "White", state.board);

      /////////////

      // Check for checkmate inline
      //MOVE THIS LOGIC TO SEPARATE FUNCTION
      const nextColor = state.currentTurn;

      if (state.isCheck) {
        let hasEscape = false;
        for (const pos in state.board) {
          const currPiece = state.board[pos as Position];
          if (!currPiece) continue;
          const [type, color] = currPiece.split("-");
          if (color !== nextColor) continue;

          let moves: Position[] = [];
          switch (type) {
            case "Pawn":
              moves = getPawnMoves(pos as Position, color as PieceColor, state.board);
              break;
            case "Knight":
              moves = getKnightMoves(pos as Position, color as PieceColor, state.board);
              break;
            case "Bishop":
              moves = getBishopMoves(pos as Position, color as PieceColor, state.board);
              break;
            case "Rook":
              moves = getRookMoves(pos as Position, color as PieceColor, state.board);
              break;
            case "Queen":
              moves = getQueenMoves(pos as Position, color as PieceColor, state.board);
              break;
            case "King":
              moves = getKingMoves(pos as Position, color as PieceColor, state.board);
              break;
            default:
              break;
          }

          for (const move of moves) {
            const newBoard = { ...state.board, [move]: currPiece };
            delete newBoard[pos as Position];
            if (!isKingInCheck(nextColor, newBoard)) {
              hasEscape = true;
              break;
            }
          }
          if (hasEscape) break;
        }
        state.status = hasEscape ? "check" : "checkmate";
      } else {
        state.status = "inProgress";
      }

      /////////////
    },
    select: (state, action: PayloadAction<{ position: Position; availableMoves: Position[] }>) => {
      const { position, availableMoves } = action.payload;

      // Check if the position has a piece
      if (state.status === "checkmate") return state;

      if (!state.board[position]) return state;

      // Check if it's the player's turn
      const color = state.board[position].split("-")[1] as PieceColor;
      if (color !== state.currentTurn) {
        state.selectedPiece = null;
        return state; // Not the player's turn
      }

      // If a piece is already selected, deselect it
      if (state.selectedPiece && state.selectedPiece.position === position) {
        state.selectedPiece = null;
        return state;
      }

      state.selectedPiece = {
        piece: state.board[position],
        position: position,
        availableMoves: availableMoves,
      };
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { move, select, reset } = chessboardSlice.actions;
