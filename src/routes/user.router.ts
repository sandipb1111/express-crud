import { Router } from "express"
import {
    readUser,
    postUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller"

const router = Router()

router.get("/", readUser)
router.post("/", postUser)
router.patch("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router
