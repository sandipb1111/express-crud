/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"

import * as userService from "../services/user.service"

export const readUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await userService.display()
    res.send(data)
}

export const postUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await userService.postUser(req.body)
    res.send(data)
}

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await userService.deleteUser(req.params.id)
}

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await userService.updateUser(req.params.id, req.body)
}
