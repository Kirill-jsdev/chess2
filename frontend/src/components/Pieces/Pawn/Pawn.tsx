import BlackPawn from "../../../assets/Bpawn.svg";
import WhitePawn from "../../../assets/Wpawn.svg";
import { useAppDispatch, useAppSelector } from "../../../store";
import { select } from "../../../store/slices/chessboardSlice";
import type { ChessPieceProps } from "../../types/types";
import { getPawnMoves } from "../../logic/getPawnMoves";

const Pawn = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.chessboard.board);
  const [, color] = coloredChessPiece!.split("-") || [];

  const Pawn = color === "White" ? WhitePawn : BlackPawn;

  const onClick = () => {
    dispatch(select({ position, availableMoves: getPawnMoves(position, color as "White" | "Black", board) }));
  };

  return <img src={Pawn} alt="Black Pawn" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default Pawn;
