import Chessboard from "./components/Chessboard/Chessboard";
import { STARTING_POSITION } from "./utils/startingPosition";

function App() {
  return <Chessboard startingPosition={STARTING_POSITION} squareSize="30px" />;
}

export default App;
