import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STARTING_POSITION } from "../../utils/startingPosition";
import type { BoardState, ChessPieceColored, PieceColor, Position } from "../../components/types/types";
import { isKingInCheck } from "../../components/logic/isKingInCheck";

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
  isMate: boolean;
};

const initialState: ChessboardSlice = {
  board: STARTING_POSITION,
  currentTurn: "White",
  selectedPiece: null,
  isCheck: false,
  isMate: false,
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
    },
    select: (state, action: PayloadAction<{ position: Position; availableMoves: Position[] }>) => {
      const { position, availableMoves } = action.payload;

      // Check if the position has a piece
      if (!state.board[position]) {
        return state;
      }

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
  },
});

export const { move, select } = chessboardSlice.actions;
