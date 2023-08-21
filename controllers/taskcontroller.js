import Errrorhandler from "../middlewares/error.js"
import { Task } from "../models/task.js"

export const newTask = async (req,res,next)=>{
   try {
        const {title , description} = req.body
        const task = await Task.create({
            title,
            description,
            user:req.user
        })

        res.status(200).json({
            success: true,
            message : `Hello ${req.user} your task has been added succesfully`
        })
    
   } catch (error) {
        next(error)
   }
}

export const myTask = async (req,res,next) => {
    try {
        const user_id = req.user._id

        const tasks = await Task.find({user: user_id})

        res.status(200).json({
            success: true,
            message: tasks
        })
    } catch (error) {
        next(error)
    }

}

export const updateTask = async(req,res,next) => {
    try{
        const task = await Task.findById(req.params.id)
    if(!task){
        return next(new Errrorhandler("Invalid id",404))
    }
    task.isCompleted = !task.isCompleted
    await task.save()
    res.status(200).json({
        success: true,
        message: "updated succesfully"
    })
    } catch(error){
        next(error)
    }
}

export const deleteTask = async(req,res,next) => {
    try {
        const task = await Task.findById(req.params.id)
    if(!task){
        return next(new Errrorhandler("invalid id",404))
    }
    await Task.deleteOne()
    res.status(200).json({
        success: true,
        message: "task deleted succesfully"
    })
        
    } catch (error) {
        next(error)
    }
}