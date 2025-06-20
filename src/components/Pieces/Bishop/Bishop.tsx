import BlackBishop from "../../../assets/Bbishop.svg";
import WhiteBishop from "../../../assets/Wbishop.svg";
import type { PieceColor } from "../../ChessPiece/ChessPiece";

type PawnProps = {
  color: PieceColor;
};

const Bishop = ({ color }: PawnProps) => {
  const Bishop = color === "White" ? WhiteBishop : BlackBishop;
  return <img src={Bishop} alt="Black Bishop" style={{ width: "100%", height: "100%" }} />;
};

export default Bishop;
