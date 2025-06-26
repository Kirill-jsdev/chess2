import Square from "../Square/Square";
import type { BoardState, Color, Position } from "../types/types";

type ChessboardProps = {
  board: BoardState;
  orientation: Color;
  squareSize?: string; //in css units, e.g., "25px"
};

const Chessboard = ({ board, orientation, squareSize = "50px" }: ChessboardProps) => {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    // Calculate row and col based on orientation
    let row = Math.floor(i / 8);
    let col = i % 8;

    if (orientation === "Black") {
      row = 7 - row;
      col = 7 - col;
    }

    const isBlack = (row + col) % 2 === 1;
    const position = `${String.fromCharCode(97 + col)}${8 - row}` as Position;
    squares.push(<Square key={i} color={isBlack ? "#739552" : "#ebecd0"} position={position} chessPiece={board[position]} />);
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(8, ${squareSize})`, gridTemplateRows: `repeat(8, ${squareSize})` }}>
      {squares}
    </div>
  );
};

export default Chessboard;
