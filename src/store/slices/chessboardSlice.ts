import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STARTING_POSITION } from "../../utils/startingPosition";
import type { ChessPieceColored, Position } from "../../components/types/types";

type ChessboardSlice = {
  startingPosition: Record<Position, ChessPieceColored>;
};

const initialState: ChessboardSlice = {
  startingPosition: STARTING_POSITION,
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
  },
});

export const { move } = chessboardSlice.actions;
