import express from "express";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  likeProduct,
  getLikedProducts
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  addProduct
);

router.get(
  "/",
  protect,
  getProducts
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  deleteProduct
);

router.post(
  "/like/:id",
  protect,
  likeProduct
);

router.get(
  "/liked/all",
  protect,
  getLikedProducts
);

export default router;