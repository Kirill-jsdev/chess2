import BlackKing from "../../../assets/Bking.svg";
import WhiteKing from "../../../assets/Wking.svg";
import type { ChessPieceProps } from "../../types/types";

const King = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const [, color] = coloredChessPiece!.split("-") || [];

  const King = color === "White" ? WhiteKing : BlackKing;
  console.log(`King clicked at position: ${position}`);
  return <img src={King} alt="Black Bishop" style={{ width: "100%", height: "100%" }} />;
};

export default King;
