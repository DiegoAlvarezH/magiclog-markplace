import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
  console.log(req.headers);
  try {
    const { token } = req.cookies;

    if (!token) {
      console.error("No token provided");
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    console.log("Authorization header:", req.headers.authorization);

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: error.message });
  }
};
