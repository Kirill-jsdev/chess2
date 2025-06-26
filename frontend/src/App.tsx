import Chessboard from "./components/Chessboard/Chessboard";
import { useAppDispatch, useAppSelector } from "./store";
import { reset } from "./store/slices/chessboardSlice";

function App() {
  const board = useAppSelector((store) => store.chessboard.board);
  const status = useAppSelector((store) => store.chessboard.status);
  const dispatch = useAppDispatch();

  const resetBoard = () => {
    dispatch(reset());
  };

  return (
    <div style={{ display: "flex" }}>
      <Chessboard board={board} squareSize="30px" />
      <button type="button" onClick={resetBoard}>
        Reset
      </button>
      {status === "check" && <div>CHECK!!!</div>}
      {status === "checkmate" && <div>CHECKMATE!!!</div>}
    </div>
  );
}

export default App;
