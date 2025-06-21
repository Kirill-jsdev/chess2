import BlackPawn from "../../../assets/Bpawn.svg";
import WhitePawn from "../../../assets/Wpawn.svg";
import type { ChessPieceProps } from "../../types/types";

const Pawn = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const [, color] = coloredChessPiece!.split("-") || [];

  const Pawn = color === "White" ? WhitePawn : BlackPawn;
  console.log(position);

  return <img src={Pawn} alt="Black Pawn" style={{ width: "100%", height: "100%" }} />;
};

export default Pawn;
