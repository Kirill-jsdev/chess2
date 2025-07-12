import express from "express";
import { registerRouter } from "./routes/register.ts";

const app = express();
const PORT = 3005;

app.use(express.json());

app.use("/", registerRouter);

// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
