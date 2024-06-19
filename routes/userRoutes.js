import express from "express"
import {deleteUser, login, register, updateUser } from "../controllers/userController.js"


const router=express.Router()

router.post("/",register)
router.post("/login",login)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)

export default router