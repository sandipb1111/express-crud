import { Request, Response, NextFunction } from "express"
import * as authService from "../services/auth.service"

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = authService.login(req.body)
    res.send(data)
    console.log(data)
    res.sendStatus(200)
}
