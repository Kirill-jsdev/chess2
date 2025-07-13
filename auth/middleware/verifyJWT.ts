import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, decodedInfoFromJWT: any) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = decodedInfoFromJWT.username; // Attach the username to the request object
    next();
  });
};
