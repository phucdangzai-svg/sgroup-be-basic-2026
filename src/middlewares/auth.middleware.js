import { verifyAccessToken } from "../utils/jwt.js";
import { isTokenRevoked } from "../repositories/token.repository.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const error = new Error("Access Token is required");
      error.statusCode = 401;
      throw error;
    }
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      const error = new Error("Invalid Authorization header");
      error.statusCode = 401;
      throw error;
    }
    if (isTokenRevoked(token)) {
      const error = new Error("Token has been revoked");
      error.statusCode = 401;
      throw error;
    }
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
