import {
  getAllUsersFromDB,
  getUserByIdFromDB,
  getUserByEmailFromDB,
  createUserInDB,
} from "../repositories/user.repository.js";

import { formatUsers, formatUser } from "../utils/user.utils.js";

export const getUsers = async () => {
  const users = await getAllUsersFromDB();

  return formatUsers(users);
};

export const getUserById = async (id) => {
  const numericId = parseInt(id);

  if (isNaN(numericId)) {
    const error = new Error("ID người dùng không hợp lệ!");
    error.statusCode = 400;
    throw error;
  }

  const user = await getUserByIdFromDB(numericId);

  if (!user) {
    const error = new Error(`Không tìm thấy người dùng với ID: ${id}`);
    error.statusCode = 404;
    throw error;
  }

  return formatUser(user);
};

export const createUser = async ({
  fullName,
  email,
  role = "user",
  password,
}) => {
  console.log("FULL NAME NHẬN ĐƯỢC:", fullName);
  if (!fullName || fullName.trim().length < 2) {
    const error = new Error("Họ và tên phải có ít nhất 2 ký tự!");
    error.statusCode = 400;
    throw error;
  }

  if (!email || !email.includes("@")) {
    const error = new Error("Email không hợp lệ!");
    error.statusCode = 400;
    throw error;
  }

  if (!password || password.length < 6) {
    const error = new Error("Mật khẩu phải có tối thiểu 6 ký tự!");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await getUserByEmailFromDB(email.trim().toLowerCase());

  if (existingUser) {
    const error = new Error("Email này đã được sử dụng trong hệ thống!");
    error.statusCode = 409;
    throw error;
  }

  const createdUser = await createUserInDB({
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    role,
    password,
  });

  return formatUser(createdUser);
};
