import BlacRook from "../../../assets/Brook.svg";
import WhiteRook from "../../../assets/Wrook.svg";
import type { ChessPieceProps } from "../../types/types";

const Rook = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const [, color] = coloredChessPiece!.split("-") || [];

  const Rook = color === "White" ? WhiteRook : BlacRook;
  const onClick = () => {
    alert(`Pawn clicked at position: ${position}`);
  };

  return <img src={Rook} alt="Black Bishop" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default Rook;
