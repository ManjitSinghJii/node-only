import { Router } from "express";
import { login } from "../controller/auth.controller.js";

const AuthRouter = Router()

AuthRouter.post('/login', login)

export default AuthRouter