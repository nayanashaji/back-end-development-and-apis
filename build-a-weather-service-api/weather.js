import express from "express"

const router=express.Router()

let SUPPORTED_CITIES=["London","Tokyo","Paris","Texas"]

router.get("/",(req,res)=>{
    res.status(200)
    res.json({cities:SUPPORTED_CITIES})
})

router.get("/:city",async (req,res)=>{
    const {city}=req.params
    try{
        const response=await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`)
        const data=await response.json()
        res.json({
            city:data.name,
            temperature:data.main.temp,
            description:data.weather[0].description
        })
    }
    catch(error){
        res.status(404).json({error:"Invalid city"})
    }
})
export default router