import dotenv from "dotenv/config"
import {app} from "./app.js"
import { connectDB } from "./config/db.js"

const PORT = process.env.PORT || 8000

app.get('/test',(req,res)=>{
 res.send("This is our first API");
})

connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`Server started at port http://192.168.18.10:${PORT}`)
})
}).catch(()=>{
    console.log("MongoDB connection failed ");
    
})

