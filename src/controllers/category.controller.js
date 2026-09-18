import * as categoryService from "../services/category.service.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const category = await categoryService.getAllCategories();
    return res.status(200).json({
      success: true,
      message: "getAllCategories success",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

export const getCategoriesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categories = await categoryService.getCategoriesById(id);
    return res.status(200).json({
      success: true,
      message: "getCategoriesByid success",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};
