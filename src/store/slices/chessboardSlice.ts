import { createSlice } from "@reduxjs/toolkit";
import type { Position } from "../../components/Square/Square";
import type { ChessPieceColored } from "../../components/ChessPiece/ChessPiece";
import { STARTING_POSITION } from "../../utils/startingPosition";

type ChessboardSlice = {
  startingPosition: Record<Position, ChessPieceColored>;
};

const initialState: ChessboardSlice = {
  startingPosition: STARTING_POSITION,
};

export const chessboardSlice = createSlice({
  name: "chessboard",
  initialState,
  reducers: {},
});
