import express from "express";
import {getMyDetail, login, logout, register} from "../controllers/user_controller.js";
import { isAuthenticated } from "../middlewares/authenticated.js";

const router = express.Router()

router.post("/users/new",register)
router.post("/users/login",login)
router.get("/users/logout",logout)
router.get("/me",isAuthenticated,getMyDetail)

export default router