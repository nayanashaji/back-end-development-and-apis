import { verifyToken } from "../utils/jwt.js"

export function authenticate(req,res,next){
    const header=req.headers.authorization
    if(!header||header.split(" ")[0]!=="Bearer"){
        return res.status(401).json({error:"No token provided."})
    }
    const token=header.split(" ")[1]
    const decoded=verifyToken(token)
    if(!decoded){
        return res.status(401).json({error:"Invalid or expired token."})
    }
    req.user=decoded
    
    return next()

}