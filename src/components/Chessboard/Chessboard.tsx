import Square from "../Square/Square";

const Chessboard = () => {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const isBlack = (row + col) % 2 === 1;
    squares.push(<Square key={i} color={isBlack ? "black" : "white"} />);
  }
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 25px)", gridTemplateRows: "repeat(8, 25px)" }}>{squares}</div>;
};

export default Chessboard;
