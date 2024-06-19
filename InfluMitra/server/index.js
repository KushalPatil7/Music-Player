import express from "express";
import connectToMongo from "./config/db.js";
const app=express();
const PORT=3000;
connectToMongo();

app.get("/",(req,res)=>{
    res.send(`API is running on ${PORT}`);
})


app.listen(PORT,()=>{
    console.log("API is running on ")
})