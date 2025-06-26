import { socket } from "../../api/socket/socket";
import { useAppDispatch, useAppSelector } from "../../store";
import { move } from "../../store/slices/chessboardSlice";
import ChessPiece from "../ChessPiece/ChessPiece";
import type { ChessPieceColored, Position } from "../types/types";

type SquareProps = {
  color: string;
  position: Position;
  chessPiece?: ChessPieceColored;
};

const Square = ({ color, position, chessPiece }: SquareProps) => {
  const dispatch = useAppDispatch();
  const { position: selectedPosition, availableMoves } = useAppSelector((state) => state.chessboard.selectedPiece) || {};
  const board = useAppSelector((store) => store.chessboard.board);

  const selecteBaxkgroundColor = color === "#739552" ? "#b9ca43" : "#f5f682";
  const backgroundColor = selectedPosition && selectedPosition === position ? selecteBaxkgroundColor : color;

  const availableSquare = availableMoves?.includes(position);

  const isCaptureSquare = availableMoves?.includes(position) && board[position];

  const onClick = () => {
    console.log(position);
    if (!availableSquare) return;
    dispatch(move({ oldPosition: selectedPosition!, newPosition: position }));
    socket.emit("move", { from: selectedPosition!, to: position });
  };

  return (
    <div style={{ backgroundColor: backgroundColor, display: "grid", placeItems: "center", position: "relative" }} onClick={onClick}>
      <ChessPiece coloredChessPiece={chessPiece} position={position} />
      {availableSquare && !isCaptureSquare && (
        <div style={{ width: "33%", height: "33%", borderRadius: "50%", backgroundColor: "#000", opacity: ".2" }}></div>
      )}
      {isCaptureSquare && (
        <div
          style={{ width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "#000", position: "absolute", opacity: ".3" }}
        ></div>
      )}
    </div>
  );
};

export default Square;
