import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import users from "../users.json" with { type: 'json' };
import jwt from "jsonwebtoken";
import fsPromises from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config();

const usersDB = {
  users: users,
  setUsers: function (users: any) {
    this.users = users;
  },
};

export const signIn = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
    }

    const foundUser = usersDB.users.find((user: any) => user.username === username);

    if (!foundUser) {
        res.status(401).json({ error: "Unauthorized" });
    }

    //evaluate password
    const match = await bcrypt.compare(password, foundUser!.password);

    if (match) {

        const accessToken = jwt.sign({ username: foundUser!.username }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ username: foundUser!.username }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '1d' });

        //saving refresh token with current user
        const otherUsers = usersDB.users.filter((user: any) => user.username !== foundUser!.username);
        const currentUser  = {...foundUser,  refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(path.join(__dirname, "..", "users.json"), JSON.stringify(usersDB.users, null, 2));
        //!saving refresh token with current user

        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //1 day
        res.status(200).json({ message: "Login successful", accessToken }); //on the frontend store this token in memory (not localStorage) 
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }



}