import express from "express"
import { findByEmail,readUsers,writeUsers } from "../utils/db.js"
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"
import {signToken } from "../utils/jwt.js"
import authenticate from "../middleware/authenticate.js"
import { blacklistToken } from "../utils/token-blacklist.js"

const router=express.Router()

router.post("/register",async (req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400)
        .json({message:"Email and password are required"})
    }
    const user=findByEmail(email)
    if(user){
        return res.status(409)
        .json({message:"Email already in use"})
    }
    const passwordHash=await bcrypt.hash(password,10)
    const userOb={
        id:randomUUID(),
        email,
        passwordHash,
        role:"user"
    }
    const users=readUsers()
    users.push(userOb)
    writeUsers(users)

    const token=signToken({
        id:userOb.id,
        email:userOb.email,
        role:userOb.role
    })
    res.status(201)
    res.json({message:"User registered successfully",token})
})

router.post("/login",async (req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({message:"Email and password are required"})
    }
    const user=findByEmail(email)
    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }
    const match=await bcrypt.compare(password,user.passwordHash)
    if(!match){
        return res.status(401)
    }
    else{
        const token=signToken({id:user.id,email:user.email,role:user.role})
        res.json({message:"Login Successful",token})
    }
})

router.get("/profile",authenticate,(req,res)=>{
    res.json({user:req.user})
})

router.post("/logout",authenticate,(req,res)=>{
    const header=req.headers.authorization
    const token=header.split(" ")[1]
    blacklistToken(token)
    res.json({message:"Logged out successfully"})
})

export default router