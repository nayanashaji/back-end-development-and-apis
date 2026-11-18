import express from  "express"
import { authenticate } from "../middleware/authenticate.js"
import { addMovie, deleteMovie, findById, getWatchlist, updateMovie } from "../utils/db.js"
import { authorizeModification } from "../middleware/authorize.js"

const router=express.Router()

router.get("/:userId",authenticate,(req,res)=>{
    const user=getWatchlist(parseInt(req.params.userId))
    return res.status(200).json({user})
})

router.post("/:userId/movies",authenticate,authorizeModification,(req,res)=>{
    const userId=parseInt(req.params.userId)
    const movie=addMovie(userId,req.body)
    if(movie){
        return res.status(201).json(movie)
    }
    else{
        return res.status(403).json({error:"User not found"})
    }
})

router.put("/:userId/movies/:movieId",authenticate,authorizeModification, (req,res)=>{
    const userId=parseInt(req.params.userId)
    const movieId=parseInt(req.params.movieId)
    const updates=req.body
    const update_movie=updateMovie(userId,movieId,updates)
    if(update_movie){
        return res.status(200).json(update_movie)
    }
    else{
        return res.status(403).json({error:"User or movie not found"})
    }
})

router.delete("/:userId/movies/:movieId",authenticate, authorizeModification,(req,res)=>{
    const userId=parseInt(req.params.userId)
    const movieId=parseInt(req.params.movieId)
    const delete_movie=deleteMovie(userId,movieId)
    if(delete_movie){
        return res.status(200).json(delete_movie)
    }
    else{
        return res.status(403).json({error:"User or movie not found"})
    }
})

export default router