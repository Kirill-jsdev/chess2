import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import users from "../users.json" with { type: 'json' };

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
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }



}