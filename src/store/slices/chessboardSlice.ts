import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STARTING_POSITION } from "../../utils/startingPosition";
import type { ChessPieceColored, PieceColor, Position } from "../../components/types/types";

type PieceOnBoard = {
  piece: ChessPieceColored;
  position: Position;
};

type ChessboardSlice = {
  startingPosition: Record<Position, ChessPieceColored>;
  currentTurn: PieceColor;
  selectedPiece: PieceOnBoard | null;
  availableMoves: Position[];
};

const initialState: ChessboardSlice = {
  startingPosition: STARTING_POSITION,
  currentTurn: "White",
  selectedPiece: null,
  availableMoves: [],
};

export const chessboardSlice = createSlice({
  name: "chessboard",
  initialState,
  reducers: {
    move: (state, action: PayloadAction<{ oldPosition: Position; newPosition: Position }>) => {
      const { oldPosition, newPosition } = action.payload;
      const piece = state.startingPosition[oldPosition];
      delete state.startingPosition[oldPosition];
      state.startingPosition[newPosition] = piece;
    },
    select: (state, action: PayloadAction<Position>) => {
      const position = action.payload;

      // Check if the position has a piece
      if (!state.startingPosition[position]) {
        return state;
      }

      // Check if it's the player's turn
      const color = state.startingPosition[position].split("-")[1] as PieceColor;
      if (color !== state.currentTurn) {
        return state; // Not the player's turn
      }

      // If a piece is already selected, deselect it
      if (state.selectedPiece && state.selectedPiece.position === position) {
        state.selectedPiece = null;
        return state;
      }

      state.selectedPiece = {
        piece: state.startingPosition[position],
        position: position,
      };
    },
  },
});

export const { move, select } = chessboardSlice.actions;
