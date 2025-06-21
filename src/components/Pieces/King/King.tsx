import BlackKing from "../../../assets/Bking.svg";
import WhiteKing from "../../../assets/Wking.svg";
import { useAppDispatch, useAppSelector } from "../../../store";
import { select } from "../../../store/slices/chessboardSlice";
import type { BoardState, ChessPieceProps, Position } from "../../types/types";

const King = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.chessboard.board);
  const [, color] = coloredChessPiece!.split("-") || [];

  const King = color === "White" ? WhiteKing : BlackKing;
  const onClick = () => {
    dispatch(select({ position, availableMoves: getKingMoves(position, color as "White" | "Black", board) }));
  };
  return <img src={King} alt="Black Bishop" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default King;

//Helper functions

function getKingMoves(position: Position, color: "White" | "Black", board: BoardState): Position[] {
  const file = position[0]; // 'a' to 'h'
  const rank = parseInt(position[1]); // 1 to 8

  const moves: Position[] = [];
  const directions = [
    [1, 0], // right
    [-1, 0], // left
    [0, 1], // up
    [0, -1], // down
    [1, 1], // up-right
    [1, -1], // down-right
    [-1, 1], // up-left
    [-1, -1], // down-left
  ];

  for (const [df, dr] of directions) {
    const newFileCode = file.charCodeAt(0) + df;
    const newRank = rank + dr;
    if (newFileCode >= 97 && newFileCode <= 104 && newRank >= 1 && newRank <= 8) {
      const newPos = `${String.fromCharCode(newFileCode)}${newRank}` as Position;
      const target = board[newPos];
      if (!target || target.split("-")[1] !== color) {
        moves.push(newPos);
      }
    }
  }

  return moves;
}
