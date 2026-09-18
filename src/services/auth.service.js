import bcrypt from "bcrypt";

import { revokeToken } from "../repositories/token.repository.js";

import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";
import {
  getUserByEmailFromDB,
  createUserInDB,
} from "../repositories/user.repository.js";
export const register = async ({
  fullName,
  email,
  password,
  role = "user",
}) => {
  if (!fullName || fullName.trim().length < 2) {
    const error = new Error("Họ và tên phải có ít nhất 2 ký tự");
    error.statusCode = 400;
    throw error;
  }

  if (!email || !email.includes("@")) {
    const error = new Error("Email không hợp lệ");
    error.statusCode = 400;
    throw error;
  }

  if (!password || password.length < 6) {
    const error = new Error("Mật khẩu phải có ít nhất 6 ký tự");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await getUserByEmailFromDB(normalizedEmail);

  if (existingUser) {
    const error = new Error("Email đã được sử dụng");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUserInDB({
    fullName: fullName.trim(),
    email: normalizedEmail,
    password: passwordHash,
    role,
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email và password là bắt buộc");
    error.statusCode = 400;
    throw error;
  }
  const normalizedEmail = email.trim().toLowerCase();
  const user = await getUserByEmailFromDB(normalizedEmail);

  if (!user) {
    const error = new Error("Email hoặc password không đúng");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordCorrect) {
    const error = new Error("Email hoặc password không đúng");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};
// logout
export const logout = async (token) => {
  revokeToken(token);

  return true;
};
//cấp Access Token
export const refreshAccessToken = (refreshToken) => {
  const payload = verifyRefreshToken(refreshToken);

  const newAccessToken = generateAccessToken({
    id: payload.id,
    email: payload.email,
    role: payload.role,
  });

  return newAccessToken;
};
