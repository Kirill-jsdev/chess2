import BlackKnight from "../../../assets/Bknight.svg";
import WhiteKnight from "../../../assets/Wknight.svg";
import { useAppDispatch, useAppSelector } from "../../../store";
import { select } from "../../../store/slices/chessboardSlice";
import type { ChessPieceProps } from "../../types/types";
import { getKnightMoves } from "../../logic/getKnightMoves";

const Knight = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.chessboard.board);

  const [, color] = coloredChessPiece!.split("-") || [];

  const Knight = color === "White" ? WhiteKnight : BlackKnight;
  const onClick = () => {
    dispatch(select({ position, availableMoves: getKnightMoves(position, color as "White" | "Black", board) }));
  };

  return <img src={Knight} alt="Black Pawn" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default Knight;
