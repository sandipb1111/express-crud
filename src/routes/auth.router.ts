import { Router } from "express"
import { userLogin } from "../controllers/auth.controller"
const router = Router()

router.post("/login", userLogin)

export default router
