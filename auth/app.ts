import express from "express";
import { signupRouter } from "./routes/signup.ts";
import { signinRouter } from "./routes/signin.ts";

const app = express();
const PORT = 3005;

app.use(express.json());

app.use("/signup", signupRouter);
app.use("/signin", signinRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
