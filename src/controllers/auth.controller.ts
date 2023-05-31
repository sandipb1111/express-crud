import { Request, Response, NextFunction } from "express"
import * as authService from "../services/auth.service"

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body
        const { token } = await authService.login(email, password)
        res.status(200).send(token)
    } catch (err) {
        next(err)
    }
}
