import Square, { type Position } from "../Square/Square";

type ChessboardProps = {
  squareSize?: string; //in css units, e.g., "25px"
};

const Chessboard = ({ squareSize = "25px" }: ChessboardProps) => {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const isBlack = (row + col) % 2 === 1;
    const position = `${String.fromCharCode(97 + col)}${8 - row}` as Position;
    squares.push(<Square key={i} color={isBlack ? "#739552" : "#ebecd0"} position={position} chessPiece="Rook-White" />);
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(8, ${squareSize})`, gridTemplateRows: `repeat(8, ${squareSize})` }}>
      {squares}
    </div>
  );
};

export default Chessboard;
