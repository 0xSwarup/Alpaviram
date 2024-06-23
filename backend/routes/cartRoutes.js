import express from "express"
import { isAuthenticated } from "../middlewares/auth.js"
import { createCart, deleteCart, getAllCart, getSingleCart, updateCart } from "../controllers/cartControllers.js"


const router = express.Router()

router.post("/", isAuthenticated, createCart)
router.get("/:id", isAuthenticated, getSingleCart)
router.get("/", isAuthenticated, getAllCart)
router.put("/:id", isAuthenticated, updateCart)
router.delete("/:id", isAuthenticated, deleteCart)

export default router