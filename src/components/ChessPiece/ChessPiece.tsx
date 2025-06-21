import { useAppDispatch } from "../../store";
import { select } from "../../store/slices/chessboardSlice";
import Bishop from "../Pieces/Bishop/Bishop";
import King from "../Pieces/King/King";
import Knight from "../Pieces/Knight/Knight";
import Pawn from "../Pieces/Pawn/Pawn";
import Queen from "../Pieces/Queen/Queen";
import Rook from "../Pieces/Rook/Rook";
import type { ChessPieceProps } from "../types/types";

const ChessPiece = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();

  const [pieceType] = coloredChessPiece?.split("-") || [];

  let piece = <></>;

  const onClick = () => {
    dispatch(select(position));
  };
  switch (pieceType) {
    case "Pawn":
      piece = <Pawn coloredChessPiece={coloredChessPiece} position={position} />;
      break;
    case "Queen":
      piece = <Queen coloredChessPiece={coloredChessPiece} position={position} />;
      break;
    case "Knight":
      piece = <Knight coloredChessPiece={coloredChessPiece} position={position} />;
      break;
    case "Bishop":
      piece = <Bishop coloredChessPiece={coloredChessPiece} position={position} />;
      break;
    case "King":
      piece = <King coloredChessPiece={coloredChessPiece} position={position} />;
      break;
    case "Rook":
      piece = <Rook coloredChessPiece={coloredChessPiece} position={position} />;
      break;
    default:
      piece = <></>;
  }

  return <div onClick={onClick}>{piece}</div>;
};

export default ChessPiece;
