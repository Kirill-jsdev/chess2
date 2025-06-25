import io from "socket.io-client";
import type { MoveEvent } from "./types";
import { store } from "../../store";
import { move } from "../../store/slices/chessboardSlice";

export const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("AAA", socket.id);
  socket.emit("custom-event", "Wooow!!!");
});

socket.on("receive-move", (receivedMove: MoveEvent) => {
  const { from, to } = receivedMove;
  store.dispatch(move({ oldPosition: from, newPosition: to }));
});
