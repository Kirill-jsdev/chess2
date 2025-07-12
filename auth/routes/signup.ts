import { Router } from "express";
import { signUp } from "../controllers/signupController.ts";

export const signupRouter = Router();

signupRouter.post("/", signUp);
