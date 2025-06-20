import BlackPawn from "../../../assets/Bpawn.svg";
import WhitePawn from "../../../assets/Wpawn.svg";
import type { PieceColor } from "../../ChessPiece/ChessPiece";

type PawnProps = {
  color: PieceColor;
};

const Pawn = ({ color }: PawnProps) => {
  const Pawn = color === "White" ? WhitePawn : BlackPawn;
  return <img src={Pawn} alt="Black Pawn" style={{ width: "100%", height: "100%" }} />;
};

export default Pawn;
