import io from "socket.io-client";
import type { MoveEvent } from "./types";

export const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("AAA", socket.id);
  socket.emit("custom-event", "Wooow!!!");
});

socket.on("receive-move", (move: MoveEvent) => {
  console.log("BBB", move);
});
