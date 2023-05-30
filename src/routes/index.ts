import { Router } from "express"
import userRouter from "../routes/user.router"
const routers = Router()

routers.use("/users", userRouter)

export default routers
