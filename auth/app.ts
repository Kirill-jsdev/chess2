import express from "express";
import { type Request, type Response } from "express";
import { signupRouter } from "./routes/signup.ts";
import { signinRouter } from "./routes/signin.ts";
import { verifyJWT } from "./middleware/verifyJWT.ts";

const app = express();
const PORT = 3005;

app.use(express.json());

app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.get("/testauth", verifyJWT, (req: Request, res: Response) => {
  res.status(200).json({ message: "You are authenticated" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
