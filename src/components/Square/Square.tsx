import { useAppSelector } from "../../store";
import ChessPiece from "../ChessPiece/ChessPiece";
import type { ChessPieceColored, Position } from "../types/types";

type SquareProps = {
  color: string;
  position: Position;
  chessPiece?: ChessPieceColored;
};

const Square = ({ color, position, chessPiece }: SquareProps) => {
  const { position: selectedPosition, availableMoves } = useAppSelector((state) => state.chessboard.selectedPiece) || {};

  const selecteBaxkgroundColor = color === "#739552" ? "#b9ca43" : "#f5f682";
  const backgroundColor = selectedPosition && selectedPosition === position ? selecteBaxkgroundColor : color;

  const availableSquare = availableMoves?.includes(position);

  const finalBgColor = availableSquare ? "lightblue" : backgroundColor;

  return (
    <div style={{ backgroundColor: finalBgColor }}>
      <ChessPiece coloredChessPiece={chessPiece} position={position} />
    </div>
  );
};

export default Square;
