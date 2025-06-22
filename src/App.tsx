import Chessboard from "./components/Chessboard/Chessboard";
import { useAppSelector } from "./store";

function App() {
  const board = useAppSelector((store) => store.chessboard.board);
  const isCheck = useAppSelector((store) => store.chessboard.isCheck);

  return (
    <div style={{ display: "flex" }}>
      <Chessboard board={board} squareSize="30px" />
      {isCheck && <div>CHECK!!!</div>}
    </div>
  );
}

export default App;
