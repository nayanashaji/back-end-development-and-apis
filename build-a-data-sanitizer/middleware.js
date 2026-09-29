function inputCleaner(req,res,next){
    req.body.username=req.body.username.toLowerCase() || ""
    req.body.comment=req.body.comment.replace(/<[^>]*>/g,"") || ""
    next()
}

function inputValidator(req,res,next){
    if(req.body.username.length>=3){
        next()
    }
    else{
        res.redirect("/form?error=Username must be at least 3 characters.");
    }
}

export{
    inputCleaner,
    inputValidator
}