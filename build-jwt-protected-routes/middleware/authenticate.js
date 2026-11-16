import { verifyToken } from "../utils/jwt.js"
import { isBlacklisted } from "../utils/token-blacklist.js"

export default function authenticate(req,res,next){
    const header=req.headers.authorization
    if(!header||header.split(" ")[0]!=="Bearer"){
        return res.status(401).json({message:"No token provided"})
    }
    else{
        const token=header.split(" ")[1]
        const decoded=verifyToken(token)
        const isBlacklist=isBlacklisted(token)
        if(isBlacklist){
            return res.status(401).json({message:"Token has been invalidated. Log in again"})
        }
        if(!decoded){
            return res.status(401).json({message:"Invalid or expired token"})
        }
        else{
            req.user=decoded
            next()
        }
    }
}