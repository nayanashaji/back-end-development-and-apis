import express from "express"
import weatherRouter from "./weather.js"
import path from "path"
import { fileURLToPath } from "url"

const app=express()

const PORT=3000

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

app.listen(PORT,()=>{})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

app.get("/api/info",(req,res)=>{
    res.status(200)
    res.json({
        name:"This is my api",
        endpoints:["/api/weather", "/api/greet/:name", "/api/data"]
    })
})

app.get("/api/status",(req,res)=>{
    res.status(200).json({status:200})
})

app.get("/docs",(req,res)=>{
    res.redirect("/api/info")
})

app.get("/api/greet/:name",(req,res)=>{
    res.status(200)
    const name=req.params
    res.json({name})
})

app.route("/api/data").get((req,res)=>{
    res.json({})
    }).post((req,res)=>{
        res.status(201)
        res.json()
})

app.use("/api/weather",weatherRouter)

app.use(express.static(path.join(__dirname,"public")))