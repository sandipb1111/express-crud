/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"

import * as userService from "../services/user.service"
import { StatusCodes } from "http-status-codes"

export const readUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await userService.display()
    res.send(data)
    res.sendStatus(StatusCodes.OK)
}

export const postUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await userService.postUser(req.body)
    res.sendStatus(StatusCodes.CREATED)
}

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await userService.deleteUser(req.params.id)
    res.sendStatus(StatusCodes.OK)
}

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await userService.updateUser(req.params.id, req.body)
    res.sendStatus(StatusCodes.OK)
}
