import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({origin: 'http://localhost:5173',credentials:true}))
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({limit:"20kb"}))
app.use(express.static("public"))

// Import Routes
import userRouter from './routes/user.routes.js';
// Import Routes
import blogRouter from './routes/blog.routes.js';
app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)
export {app}