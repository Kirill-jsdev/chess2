import BlackQueen from "../../../assets/Bqueen.svg";
import WhiteQueen from "../../../assets/Wqueen.svg";
import type { PieceColor } from "../../ChessPiece/ChessPiece";

type PawnProps = {
  color: PieceColor;
};

const Queen = ({ color }: PawnProps) => {
  const Queen = color === "White" ? WhiteQueen : BlackQueen;
  return <img src={Queen} alt="Black Pawn" style={{ width: "100%", height: "100%" }} />;
};

export default Queen;
