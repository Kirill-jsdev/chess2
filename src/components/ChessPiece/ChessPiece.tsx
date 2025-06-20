import Bishop from "../Pieces/Bishop/Bishop";
import King from "../Pieces/King/King";
import Knight from "../Pieces/Knight/Knight";
import Pawn from "../Pieces/Pawn/Pawn";
import Queen from "../Pieces/Queen/Queen";

export type PieceColor = "White" | "Black";
export type ChessPieceName = "King" | "Queen" | "Rook" | "Bishop" | "Knight" | "Pawn";
export type ChessPieceColored = `${ChessPieceName}-${"White" | "Black"}`;

type ChessPieceProps = {
  coloredChessPiece?: ChessPieceColored;
};

const ChessPiece = ({ coloredChessPiece }: ChessPieceProps) => {
  const [pieceType, color] = coloredChessPiece?.split("-") || [];
  switch (pieceType) {
    case "Pawn":
      return <Pawn color={color as PieceColor} />;
    case "Queen":
      return <Queen color={color as PieceColor} />;
    case "Knight":
      return <Knight color={color as PieceColor} />;
    case "Bishop":
      return <Bishop color={color as PieceColor} />;
    case "King":
      return <King color={color as PieceColor} />;
    default:
      return <></>;
  }
};

export default ChessPiece;
