import * as categoryController from "../controllers/category.controller.js";
import express from "express";
const route = express.Router();
route.get("/", categoryController.getAllCategories);
route.get("/:id", categoryController.getCategoriesById);
export default route;
