import ChessPiece, { type ChessPieceType } from "../ChessPiece/ChessPiece";

export type Position = `${"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;

type SquareProps = {
  color: string;
  position?: Position;
  chessPiece?: ChessPieceType;
};

const Square = ({ color, position, chessPiece }: SquareProps) => {
  const onSquareClick = () => {
    alert(`Square clicked: ${position}`);
  };

  return (
    <div style={{ backgroundColor: color }} onClick={onSquareClick}>
      <ChessPiece chessPiece={chessPiece} />
    </div>
  );
};

export default Square;
