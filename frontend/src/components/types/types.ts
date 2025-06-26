export type BoardState = Record<Position, ChessPieceColored | undefined>;

export type GameStatus = "inProgress" | "check" | "checkmate";

export type Color = "White" | "Black";
export type ChessPieceName = "King" | "Queen" | "Rook" | "Bishop" | "Knight" | "Pawn";
export type ChessPieceColored = `${ChessPieceName}-${Color}`;

export type File = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Position = `${File}${Rank}`;

export type ChessPieceProps = {
  coloredChessPiece?: ChessPieceColored;
  position: Position;
};
