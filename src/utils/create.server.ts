import { config } from "dotenv"
import express, { urlencoded } from "express"
import cors from "cors"
import router from "../routes/index"
import * as ErrorMiddlewares from "../middlewares/error.middleware"

config()
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(cors())

app.use("/api", router)

app.use(ErrorMiddlewares.methodNotAllowed)
app.use(ErrorMiddlewares.genericErrorHandler)

export default app
