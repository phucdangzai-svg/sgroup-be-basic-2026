import pool from "../configs/db.config.js";

export const getAllUsersFromDB = async () => {
  const [rows] = await pool.query(
    `
    SELECT * FROM users
    ORDER BY id ASC
    `,
  );

  return rows;
};

export const getUserByIdFromDB = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT * FROM users
    WHERE id = ?
    `,
    [id],
  );

  return rows[0] ?? null;
};
export const getUserByEmailFromDB = async (email) => {
  const [rows] = await pool.query(
    `
    SELECT * FROM users
    WHERE email = ?
    `,
    [email],
  );

  return rows[0] ?? null;
};
export const createUserInDB = async ({ fullName, email, password, role }) => {
  const [result] = await pool.query(
    `
    INSERT INTO users (full_name, email, password_hash, role)
    VALUES (?, ?, ?, ?)
    `,
    [fullName, email, password, role],
  );

  const [rows] = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id = ?
    `,
    [result.insertId],
  );

  return rows[0];
};
