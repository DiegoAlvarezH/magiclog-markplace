import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
  updateUser,
  deleteUser,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema, updateUserSchema } from "../schemas/auth.schema.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);
router.put("/update-user", auth, validateSchema(updateUserSchema), updateUser);
router.delete("/delete-user", auth, deleteUser);

export default router;
