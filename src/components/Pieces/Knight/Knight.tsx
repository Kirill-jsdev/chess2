import BlackKnight from "../../../assets/Bknight.svg";
import WhiteKnight from "../../../assets/Wknight.svg";
import { useAppDispatch, useAppSelector } from "../../../store";
import { select } from "../../../store/slices/chessboardSlice";
import type { BoardState, ChessPieceProps, Position } from "../../types/types";

const Knight = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.chessboard.board);

  const [, color] = coloredChessPiece!.split("-") || [];

  const Knight = color === "White" ? WhiteKnight : BlackKnight;
  const onClick = () => {
    dispatch(select({ position, availableMoves: getKnightMoves(position, color as "White" | "Black", board) }));
  };

  return <img src={Knight} alt="Black Pawn" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default Knight;

//helper function
function getKnightMoves(position: Position, color: "White" | "Black", board: BoardState): Position[] {
  const file = position[0]; // 'a' to 'h'
  const rank = parseInt(position[1]); // 1 to 8

  const moves: Position[] = [];
  const knightMoves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  for (const [df, dr] of knightMoves) {
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
