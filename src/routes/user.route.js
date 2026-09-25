import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware,authorizeAdmin} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware,authorizeAdmin, userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);

export default router;
