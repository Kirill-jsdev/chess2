import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STARTING_POSITION } from "../../utils/startingPosition";
import type { BoardState, ChessPieceColored, GameStatus, PieceColor, Position } from "../../components/types/types";

import { getGameStatus } from "../../components/logic/getGameStatus";
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
  status: GameStatus;
};

const initialState: ChessboardSlice = {
  board: STARTING_POSITION,
  currentTurn: "White",
  selectedPiece: null,
  status: "inProgress",
};

export const chessboardSlice = createSlice({
  name: "chessboard",
  initialState,
  reducers: {
    move: (state, action: PayloadAction<{ oldPosition: Position; newPosition: Position }>) => {
      const { oldPosition, newPosition } = action.payload;
      const piece = state.board[oldPosition];
      if (!piece) return; // No piece to move

      const color = piece.split("-")[1] as PieceColor;

      // Simulate the move
      const simulatedBoard = { ...state.board };
      delete simulatedBoard[oldPosition];
      simulatedBoard[newPosition] = piece;

      // Check if own king is in check after the move
      // (do NOT switch turn yet, check for the moving color)
      if (getGameStatus(color, simulatedBoard) === "check") {
        state.selectedPiece = null;
        return;
      }

      // Apply the move
      delete state.board[oldPosition];
      state.board[newPosition] = piece;
      state.selectedPiece = null;
      state.currentTurn = color === "White" ? "Black" : "White";
      state.status = getGameStatus(state.currentTurn, state.board);
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
