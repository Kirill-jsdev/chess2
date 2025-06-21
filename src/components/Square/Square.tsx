import { useAppSelector } from "../../store";
import ChessPiece from "../ChessPiece/ChessPiece";
import type { ChessPieceColored, Position } from "../types/types";

type SquareProps = {
  color: string;
  position: Position;
  chessPiece?: ChessPieceColored;
};

const Square = ({ color, position, chessPiece }: SquareProps) => {
  const selectedPiece = useAppSelector((state) => state.chessboard.selectedPiece);

  const selecteBaxkgroundColor = color === "#739552" ? "#b9ca43" : "#f5f682";
  const backgroundColor = selectedPiece && selectedPiece.position === position ? selecteBaxkgroundColor : color;

  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <ChessPiece coloredChessPiece={chessPiece} position={position} />
    </div>
  );
};

export default Square;
