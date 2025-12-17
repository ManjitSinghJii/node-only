import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB)
.then(()=> console.log("Connected"))
.catch(()=> console.log("Failed"))

import express from "express"
import morgan from "morgan"
import cors from "cors"

import AuthRouter from "./router/auth.router.js"
import AdminRouter from "./router/admin.router.js"
import LabourRouter from "./router/labour.router.js"

const app = express()
app.listen(process.env.PORT, ()=> console.log(`Server Run on Port ${process.env.PORT}`))

app.use(morgan('dev'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', AuthRouter)
app.use('/api/admins', AdminRouter)
app.use('/api/labours', LabourRouter)