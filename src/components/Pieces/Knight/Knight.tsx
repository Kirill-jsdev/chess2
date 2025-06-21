import BlackKnight from "../../../assets/Bknight.svg";
import WhiteKnight from "../../../assets/Wknight.svg";
import type { ChessPieceProps } from "../../types/types";

const Knight = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const [, color] = coloredChessPiece!.split("-") || [];

  const Knight = color === "White" ? WhiteKnight : BlackKnight;
  const onClick = () => {
    alert(`Pawn clicked at position: ${position}`);
  };

  return <img src={Knight} alt="Black Pawn" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default Knight;
