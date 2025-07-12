import { Router } from "express";
import { signIn } from "../controllers/signinController.ts";

export const signinRouter = Router();

signinRouter.post("/", signIn);
