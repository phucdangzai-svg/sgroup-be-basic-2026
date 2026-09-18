// mport { getAllCategoriesFromDB } from "../repositories/category.repository";
import * as categoryRepository from "../repositories/category.repository.js";
export const getAllCategories = async () => {
  return await categoryRepository.getAllCategoriesFromDB();
};
export const getCategoriesById = async (id) => {
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    const error = new Error("id khong hop le");
    error.statusCode = 400;
    throw error;
  }
  const categories =
    await categoryRepository.getCategoriesByIdFromDB(numericId);
  if (!categories) {
    const error = new Error("id khong ton tai");
    error.statusCode = 404;
    throw error;
  }

  return categories;
};
