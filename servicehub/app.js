import express from "express";
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan";
import { globalErrorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet())
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/health', (req, res)=> {
    res.json({message: "API Running"})
})
app.use(globalErrorHandler)

export default app