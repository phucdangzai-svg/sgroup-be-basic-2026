import pool from "../configs/db.config.js";

export const getAllCategoriesFromDB = async () => {
  const [rows] = await pool.query(`
    SELECT id,name,description
    FROM categories

    
    `);
  return rows;
};

export const getCategoriesByIdFromDB = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT id,name,description
    FROM categories
    WHERE id=?

    `,
    [id],
  );
  return rows[0] ?? null;
};
