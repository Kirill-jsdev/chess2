import Chessboard from "./components/Chessboard/Chessboard";
import { useAppSelector } from "./store";

function App() {
  const board = useAppSelector((store) => store.chessboard.board);

  return <Chessboard board={board} squareSize="30px" />;
}

export default App;
