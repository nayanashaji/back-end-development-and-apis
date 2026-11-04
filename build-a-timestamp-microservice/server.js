import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

app.get("/api{/:date}",(req,res)=>{
  const dateString=req.params.date
  const date=/^\d+$/.test(dateString)? new Date(Number(dateString)):new Date(dateString)
  if(!isNaN(date)){
    const valid_date=new Date(date)
    res.json({
      unix:valid_date.getTime(),
      utc:valid_date.toUTCString()
    })
  }
  else{
    res.json({error:"Invalid Date"})
  }
})

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
