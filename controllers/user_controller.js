import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendcookie } from "../utils/feature.js"
import Errrorhandler from "../middlewares/error.js"

export const login = async(req,res,next)=>{
    try {
        const {email , password} = req.body

        let user = await User.findOne({email}).select("+password")

        if(!user){
            return next(new Errrorhandler("please register first",400))
        }
        const isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched){
            return next(new Errrorhandler("Invalid email or password",400))
        }
        sendcookie(user,res,"Logged in succesfully",201)
        
    } catch (error) {
        next(error)
    }

}
export const register =  async(req,res,next)=>{
    try {
        const {name , email , password} = req.body

        let user = await User.findOne({email})
        if(user){
            return next(new Errrorhandler("User already exists login your account",400))
        }
    
        const hashedPassword = await bcrypt.hash(password,10)
        user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        sendcookie(user,res,"User created succesfully",201)
        
    } catch (error) {
        next(error)
    }

}
export const logout = async (req,res)=>{
    res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
}

export const getMyDetail = async (req,res)=>{

    res.status(200).json({
        succes: true,
        user: req.user
    })
}