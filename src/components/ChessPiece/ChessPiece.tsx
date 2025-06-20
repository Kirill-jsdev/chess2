export type ChessPieceType = "King" | "Queen" | "Rook" | "Bishop" | "Knight" | "Pawn";

type ChessPieceProps = {
  chessPiece?: ChessPieceType;
};

const ChessPiece = ({ chessPiece }: ChessPieceProps) => {
  return <div>{chessPiece}</div>;
};

export default ChessPiece;
