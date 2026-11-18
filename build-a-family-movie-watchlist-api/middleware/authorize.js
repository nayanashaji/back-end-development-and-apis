export function authorizeModification(req,res,next){
    const role=req.user.role
    if((role!=="parent")&& !((role==="child")&&req.params.userId===String(req.user.id))){
        return res.status(403).json({error:"Access denied"})
    }
    return next()
}