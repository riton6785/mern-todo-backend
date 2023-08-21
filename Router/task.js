import express from "express"
import { deleteTask, myTask, newTask, updateTask } from "../controllers/taskcontroller.js"
import { isAuthenticated } from "../middlewares/authenticated.js"

const router = express.Router()

router.post("/new",isAuthenticated,newTask)
router.get("/mytask",isAuthenticated,myTask)
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)

export default router