import Bishop from "../Pieces/Bishop/Bishop";
import King from "../Pieces/King/King";
import Knight from "../Pieces/Knight/Knight";
import Pawn from "../Pieces/Pawn/Pawn";
import Queen from "../Pieces/Queen/Queen";
import Rook from "../Pieces/Rook/Rook";
import type { ChessPieceProps } from "../types/types";

const ChessPiece = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const [pieceType] = coloredChessPiece?.split("-") || [];
  switch (pieceType) {
    case "Pawn":
      return <Pawn coloredChessPiece={coloredChessPiece} position={position} />;
    case "Queen":
      return <Queen coloredChessPiece={coloredChessPiece} position={position} />;
    case "Knight":
      return <Knight coloredChessPiece={coloredChessPiece} position={position} />;
    case "Bishop":
      return <Bishop coloredChessPiece={coloredChessPiece} position={position} />;
    case "King":
      return <King coloredChessPiece={coloredChessPiece} position={position} />;
    case "Rook":
      return <Rook coloredChessPiece={coloredChessPiece} position={position} />;
    default:
      return <></>;
  }
};

export default ChessPiece;
