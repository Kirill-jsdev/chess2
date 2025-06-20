import BlacRook from "../../../assets/Brook.svg";
import WhiteRook from "../../../assets/Wrook.svg";
import type { PieceColor } from "../../ChessPiece/ChessPiece";

type PawnProps = {
  color: PieceColor;
};

const Rook = ({ color }: PawnProps) => {
  const Rook = color === "White" ? WhiteRook : BlacRook;
  return <img src={Rook} alt="Black Bishop" style={{ width: "100%", height: "100%" }} />;
};

export default Rook;
