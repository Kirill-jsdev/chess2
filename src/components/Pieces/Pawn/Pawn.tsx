import BlackPawn from "../../../assets/Bpawn.svg";
import WhitePawn from "../../../assets/Wpawn.svg";
import { useAppDispatch } from "../../../store";
import { move } from "../../../store/slices/chessboardSlice";
import type { ChessPieceProps } from "../../types/types";

const Pawn = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();
  const [, color] = coloredChessPiece!.split("-") || [];

  const Pawn = color === "White" ? WhitePawn : BlackPawn;

  const onClick = () => {
    dispatch(move({ oldPosition: position, newPosition: "e4" }));
  };

  return <img src={Pawn} alt="Black Pawn" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default Pawn;
