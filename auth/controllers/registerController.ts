import fsPromises from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import users from "../users.json" with { type: 'json' };

import { fileURLToPath } from "node:url";
// ...existing code...

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDB = {
  users: users,
  setUsers: function (users: any) {
    this.users = users;
  },
};

export const handleNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
  }

  //check if user already exists
  const alreadyExists = usersDB.users.find((user: any) => user.username === username);

  if (alreadyExists) {
    res.status(409).json({ error: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //store new user
    const newUser = { username, password: hashedPassword };

    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(path.join(__dirname, "..", "users.json"), JSON.stringify(usersDB.users, null, 2));

    console.log(usersDB.users);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
