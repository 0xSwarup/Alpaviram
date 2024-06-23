import express from "express"
import { createProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { addRating } from "../controllers/ratingControllers.js";
const router = express.Router()


router.post("/", isAuthenticated, createProduct)
router.put("/:id", isAuthenticated, updateProduct)
router.get("/:id", isAuthenticated, getSingleProduct)
router.get("/", isAuthenticated, getAllProduct)
router.delete("/:id", isAuthenticated, deleteProduct)
router.post("/:productId/:rating", isAuthenticated, addRating)
export default router;