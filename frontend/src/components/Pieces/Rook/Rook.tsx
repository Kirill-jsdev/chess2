import BlacRook from "../../../assets/Brook.svg";
import WhiteRook from "../../../assets/Wrook.svg";
import { useAppDispatch, useAppSelector } from "../../../store";
import { select } from "../../../store/slices/chessboardSlice";
import type { ChessPieceProps } from "../../types/types";
import { getRookMoves } from "../../logic/getRookMoves";

const Rook = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.chessboard.board);
  const [, color] = coloredChessPiece!.split("-") || [];

  const Rook = color === "White" ? WhiteRook : BlacRook;
  const onClick = () => {
    dispatch(select({ position, availableMoves: getRookMoves(position, color as "White" | "Black", board) }));
  };
  return <img src={Rook} alt="Black Bishop" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default Rook;
