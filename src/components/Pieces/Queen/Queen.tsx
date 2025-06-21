import BlackQueen from "../../../assets/Bqueen.svg";
import WhiteQueen from "../../../assets/Wqueen.svg";
import type { ChessPieceProps } from "../../types/types";

const Queen = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const [, color] = coloredChessPiece!.split("-") || [];

  const Queen = color === "White" ? WhiteQueen : BlackQueen;
  console.log(position);

  return <img src={Queen} alt="Black Pawn" style={{ width: "100%", height: "100%" }} />;
};

export default Queen;
