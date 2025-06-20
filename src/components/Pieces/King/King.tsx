import BlackKing from "../../../assets/Bking.svg";
import WhiteKing from "../../../assets/Wking.svg";
import type { PieceColor } from "../../ChessPiece/ChessPiece";

type PawnProps = {
  color: PieceColor;
};

const King = ({ color }: PawnProps) => {
  const King = color === "White" ? WhiteKing : BlackKing;
  return <img src={King} alt="Black Bishop" style={{ width: "100%", height: "100%" }} />;
};

export default King;
