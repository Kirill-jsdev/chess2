import Chessboard from "./components/Chessboard/Chessboard";
import { useAppSelector } from "./store";

function App() {
  const board = useAppSelector((store) => store.chessboard.board);
  const isCheck = useAppSelector((store) => store.chessboard.isCheck);
  const status = useAppSelector((store) => store.chessboard.status);

  return (
    <div style={{ display: "flex" }}>
      <Chessboard board={board} squareSize="30px" />
      {isCheck && <div>CHECK!!!</div>}
      {status === "checkmate" && <div>CHECKMATE!!!</div>}
    </div>
  );
}

export default App;
