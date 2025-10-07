import dotenv from "dotenv/config"
import {app} from "./app.js"
import { connectDB } from "./config/db.js"

const PORT = process.env.PORT || 8000

app.get('/test',(req,res)=>{
 res.send("This is our first API");
})

connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`Server started at port http://127.0.0.1:${PORT}`)
})
}).catch(()=>{
    console.log("MongoDB connection failed ");
    
})

