import ChessPiece from "../ChessPiece/ChessPiece";
import type { ChessPieceColored, Position } from "../types/types";

type SquareProps = {
  color: string;
  position: Position;
  chessPiece?: ChessPieceColored;
};

const Square = ({ color, position, chessPiece }: SquareProps) => {
  return (
    <div style={{ backgroundColor: color }}>
      <ChessPiece coloredChessPiece={chessPiece} position={position} />
    </div>
  );
};

export default Square;
