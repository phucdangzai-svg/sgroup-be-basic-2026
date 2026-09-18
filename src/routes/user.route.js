import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);

export default router;
