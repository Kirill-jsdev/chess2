import Chessboard from "./components/Chessboard/Chessboard";
import { useAppSelector } from "./store";

function App() {
  const startingPosition = useAppSelector((store) => store.chessboard.startingPosition);

  return <Chessboard startingPosition={startingPosition} squareSize="30px" />;
}

export default App;
