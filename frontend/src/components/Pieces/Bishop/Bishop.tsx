import BlackBishop from "../../../assets/Bbishop.svg";
import WhiteBishop from "../../../assets/Wbishop.svg";
import { useAppDispatch, useAppSelector } from "../../../store";
import { select } from "../../../store/slices/chessboardSlice";
import type { ChessPieceProps } from "../../types/types";
import { getBishopMoves } from "../../logic/getBishopMoves";

const Bishop = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.chessboard.board);
  const [, color] = coloredChessPiece!.split("-") || [];
  const Bishop = color === "White" ? WhiteBishop : BlackBishop;

  const onClick = () => {
    dispatch(select({ position, availableMoves: getBishopMoves(position, color as "White" | "Black", board) }));
  };
  return <img src={Bishop} alt="Black Bishop" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default Bishop;
