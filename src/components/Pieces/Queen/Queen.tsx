import BlackQueen from "../../../assets/Bqueen.svg";
import WhiteQueen from "../../../assets/Wqueen.svg";
import { useAppDispatch, useAppSelector } from "../../../store";
import { select } from "../../../store/slices/chessboardSlice";
import type { ChessPieceProps } from "../../types/types";
import { getQueenMoves } from "../../logic/getQueenMoves";

const Queen = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.chessboard.board);
  const [, color] = coloredChessPiece!.split("-") || [];

  const Queen = color === "White" ? WhiteQueen : BlackQueen;
  const onClick = () => {
    dispatch(select({ position, availableMoves: getQueenMoves(position, color as "White" | "Black", board) }));
  };

  return <img src={Queen} alt="Black Pawn" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default Queen;
