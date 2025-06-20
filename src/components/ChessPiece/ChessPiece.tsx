import Pawn from "../Pieces/Pawn/Pawn";

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
    default:
      return <></>;
  }
};

export default ChessPiece;
