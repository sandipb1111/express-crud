import { Router } from "express"
import userRouter from "../routes/user.router"
import authRouter from "../routes/auth.router"
const routers = Router()

routers.use("/users", userRouter)
routers.use("/auth", authRouter)

export default routers
