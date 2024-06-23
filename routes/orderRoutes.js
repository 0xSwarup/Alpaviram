import { verify } from "jsonwebtoken";
import router from "../routes/cartRoutes";


const Order = require("../modles/Order");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,

} = require("./verifyToken");
const router = require("express").Router();

