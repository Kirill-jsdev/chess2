import BlackQueen from "../../../assets/Bqueen.svg";
import WhiteQueen from "../../../assets/Wqueen.svg";
import { useAppDispatch } from "../../../store";
import { select } from "../../../store/slices/chessboardSlice";
import type { ChessPieceProps } from "../../types/types";

const Queen = ({ coloredChessPiece, position }: ChessPieceProps) => {
  const dispatch = useAppDispatch();
  const [, color] = coloredChessPiece!.split("-") || [];

  const Queen = color === "White" ? WhiteQueen : BlackQueen;
  const onClick = () => {
    dispatch(select(position));
  };

  return <img src={Queen} alt="Black Pawn" style={{ width: "100%", height: "100%" }} onClick={onClick} />;
};

export default Queen;
