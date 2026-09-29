import express from "express"
import { inputCleaner,inputValidator } from "./middleware.js"

const port=3000

const app=express()

app.use(express.urlencoded({ extended: true }));

app.listen(port,(req,res)=>{
    console.log("http://localhost:3000")
})

app.get("/",(req,res)=>{
    res.redirect("/form")
})

app.get("/form",(req,res)=>{
    res.sendFile("index.html", { root: "./public" });
})

app.post("/submit",
    inputCleaner,
    inputValidator,
    (req,res)=>{
        res.send(`
            Username: ${req.body.username}
            Comment: ${req.body.comment}
        `);
})