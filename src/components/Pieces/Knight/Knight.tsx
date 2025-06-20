import BlackKnight from "../../../assets/Bknight.svg";
import WhiteKnight from "../../../assets/Wknight.svg";
import type { PieceColor } from "../../ChessPiece/ChessPiece";

type PawnProps = {
  color: PieceColor;
};

const Knight = ({ color }: PawnProps) => {
  const Knight = color === "White" ? WhiteKnight : BlackKnight;
  return <img src={Knight} alt="Black Pawn" style={{ width: "100%", height: "100%" }} />;
};

export default Knight;
