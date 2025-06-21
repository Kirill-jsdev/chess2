import BlackBishop from "../../../assets/Bbishop.svg";
import WhiteBishop from "../../../assets/Wbishop.svg";
import type { ChessPieceProps } from "../../types/types";

const Bishop = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const [, color] = coloredChessPiece!.split("-") || [];
  const Bishop = color === "White" ? WhiteBishop : BlackBishop;

  console.log(`Bishop clicked at position: ${position}`);
  return <img src={Bishop} alt="Black Bishop" style={{ width: "100%", height: "100%" }} />;
};

export default Bishop;
