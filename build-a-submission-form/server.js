import express from "express"
import apiRouter from "./routes/api.routes.js"
import { notFoundHandler,finalErrorHandler } from "./middleware/error.middleware.js"

const port=3000

const app=express()

app.listen(port,(req,res)=>{
    console.log("http://localhost:3000")
})

app.use((req,res,next)=>{
    console.log(req,"http://localhost:3000")
    next()
})

app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))

app.use("/api",apiRouter)

app.use(notFoundHandler)

app.use(finalErrorHandler)