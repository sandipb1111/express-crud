import { Router } from "express"
import {
    readUser,
    postUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller"

import { authenticateToken, isAdmin } from "../middlewares/auth.middleware"
import { createPostDto } from "../valdator/user.validate"
import { validate } from "../utils/validate"

const router = Router()

router.get("/", authenticateToken, readUser) // need to login and generate valid token
router.post("/", validate(createPostDto), postUser) // does not need to login
router.patch("/:id", authenticateToken, updateUser) // need to login and generate valid token
router.delete("/:id", authenticateToken, isAdmin, deleteUser) // need to login as well as be admin and generate valid token

export default router
