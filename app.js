import express from "express";
import mongoose from "mongoose";
import router from "./Router/users.js";
import taskRouter from "./Router/task.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { errorMiddlware } from "./middlewares/error.js";
import cors from "cors"

export const app = express()
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

config({
    path: "./data/config.env"
})

// miidleware used to read the json data  while creating the user from post route of users/new we send the information in json format so we need it to read so that we can create the user by fetching the information from body.
app.use(express.json())
app.use(cookieParser())
app.use("/api/vi",router)
app.use("/api/vi/task",taskRouter)

app.get("/", (req,res)=>{
    res.send("Nice working")
})
app.use(errorMiddlware)