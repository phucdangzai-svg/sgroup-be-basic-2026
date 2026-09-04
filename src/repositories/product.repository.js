import pool from "../configs/db.config.js";

// Get all products
export const findProductsFromDB = async () => {
  const [rows] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.stock,
        p.created_at,
        c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id ASC
  `);
  return rows;
}

// Get product by id
export const findProductByIdFromDB = async (id) => {
  const [rows] = await pool.query(`
    SELECT 
      p.id,
      p.name,
      p.price,
      p.stock,
      p.created_at,
      c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `, [id]);
  return rows[0] ?? null;
}