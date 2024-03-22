import { Router } from "express";
import {
  createProducto,
  deleteProducto,
  getProducto,
  getProductos,
  updateProducto,
  getProductosByUser,
  getPublicProductos, 
  getPrivateProductos,
  getTopRatedProductos,
  commentOnProducto,
  likeProducto,
} from "../controllers/producto.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProductoSchema } from "../schemas/producto.schema.js";

const router = Router();

router.get("/productos", auth, getProductos);
router.post("/productos", auth, validateSchema(createProductoSchema), createProducto);
router.get("/productos/:id", auth, getProducto);
router.put("/productos/:id", auth, updateProducto);
router.delete("/productos/:id", auth, deleteProducto);
router.get("/productos/user/:userId", auth, getProductosByUser);
router.get("/productos/public", getPublicProductos);
router.get("/productos/private", auth, getPrivateProductos);
router.get("/productos/top-rated", getTopRatedProductos);
router.post("/productos/:id/comment", auth, commentOnProducto);
router.post("/productos/:id/like", auth, likeProducto);

export default router;
