import Square from "../Square/Square";
import type { BoardState, Color, Position } from "../types/types";

type ChessboardProps = {
  board: BoardState;
  orientation: Color;
  squareSize?: string; //in css units, e.g., "25px"

  boardSize?: number;
};

const Chessboard = ({ board, orientation, squareSize = "50px", boardSize = 8 }: ChessboardProps) => {
  const squares = [];
  for (let i = 0; i < boardSize * boardSize; i++) {
    // Calculate row and col based on orientation
    let row = Math.floor(i / boardSize);
    let col = i % boardSize;

    if (orientation === "Black") {
      row = boardSize - 1 - row;
      col = boardSize - 1 - col;
    }

    const isBlack = (row + col) % 2 === 1;
    const position = `${String.fromCharCode(97 + col)}${boardSize - row}` as Position;
    squares.push(<Square key={i} color={isBlack ? "#739552" : "#ebecd0"} position={position} chessPiece={board[position]} />);
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${boardSize}, ${squareSize})`,
        gridTemplateRows: `repeat(${boardSize}, ${squareSize})`,
      }}
    >
      {squares}
    </div>
  );
};

export default Chessboard;
