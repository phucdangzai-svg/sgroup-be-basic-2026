import {
  findProductsFromDB,
  findProductByIdFromDB,
  createProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
} from "../repositories/product.repository.js";

export const getAllProducts = async () => {
  return await findProductsFromDB();
};

export const getProductById = async (id) => {
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    const error = new Error("Product ID is not valid");
    error.statusCode = 400;
    throw error;
  }

  const product = await findProductByIdFromDB(numericId);
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};
export const createProduct = async (name, price, stock, category_id) => {
  if (!name || name.trim().length < 2) {
    const error = new Error("name not validation");
    error.statusCode = 400;
    throw error;
  }
  if (typeof price !== "number" || price <= 0) {
    const error = new Error("price not validation");
    error.statusCode = 400;
    throw error;
  }
  if (stock !== undefined && stock < 0) {
    const error = new Error("stock not validation");
    error.statusCode = 400;
    throw error;
  }
  const newproduct = await createProductFromDB(name, price, stock, category_id);
  return newproduct;
};
export const updateProduct = async (name, price, stock, category_id, id) => {
  const product = await findProductByIdFromDB(id);
  if (!product) {
    const error = new Error("update false");
    error.statusCode = 404;
    throw error;
  }
  const updateproduct = await updateProductFromDB(
    name,
    price,
    stock,
    category_id,
    id,
  );
  return updateproduct;
};
export const deleteProduct = async (id) => {
  const product = await findProductByIdFromDB(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  await deleteProductFromDB(id);

  return true;
};
