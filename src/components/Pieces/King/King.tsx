import BlackKing from "../../../assets/Bking.svg";
import WhiteKing from "../../../assets/Wking.svg";
import { useAppDispatch, useAppSelector } from "../../../store";
import { select } from "../../../store/slices/chessboardSlice";
import type { ChessPieceProps } from "../../types/types";
import { getKingMoves } from "../../logic/getKingMoves";

const King = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.chessboard.board);
  const [, color] = coloredChessPiece!.split("-") || [];

  const King = color === "White" ? WhiteKing : BlackKing;
  const onClick = () => {
    dispatch(select({ position, availableMoves: getKingMoves(position, color as "White" | "Black", board) }));
  };
  return <img src={King} alt="Black Bishop" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default King;
