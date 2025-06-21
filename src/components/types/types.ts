export type PieceColor = "White" | "Black";
export type ChessPieceName = "King" | "Queen" | "Rook" | "Bishop" | "Knight" | "Pawn";
export type ChessPieceColored = `${ChessPieceName}-${PieceColor}`;
export type Position = `${"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;

export type ChessPieceProps = {
  coloredChessPiece?: ChessPieceColored;
  position: Position;
};
