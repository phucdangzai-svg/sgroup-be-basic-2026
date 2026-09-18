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
};

// Get product by id
export const findProductByIdFromDB = async (id) => {
  const [rows] = await pool.query(
    `
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
  `,
    [id],
  );
  return rows[0] ?? null;
};
// tao san pham
export const createProductFromDB = async (name, price, stock, category_id) => {
  const [result] = await pool.query(
    `
    INSERT INTO products (name,price,stock,category_id) VALUES (? ,?, ?, ?)
    `,
    [name, price, stock, category_id],
  );
  const newproduct = await findProductByIdFromDB(result.insertId);
  return newproduct;
};
// cap nhat san pham
export const updateProductFromDB = async (
  name,
  price,
  stock,
  category_id,
  id,
) => {
  const [result] = await pool.query(
    `
    UPDATE products
    SET name=?,price=?,stock=?,category_id=?
    WHERE id=?

    `,
    [name, price, stock, category_id, id],
  );
  const updateproduct = await findProductByIdFromDB(id);
  return updateproduct;
};
// xoa san pham
export const deleteProductFromDB = async (id) => {
  const [result] = await pool.query(
    `
    DELETE FROM products
    WHERE id = ?
    `,
    [id],
  );

  return result;
};
