import { Router } from "express";
import { handleNewUser } from "../controllers/registerController.ts";

export const registerRouter = Router();

registerRouter.post("/register", handleNewUser);
