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
}

export const postUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await userService.postUser(req.body)
        res.sendStatus(StatusCodes.CREATED)
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await userService.deleteUser(parseInt(req.params.id))
        const sanitizedUser = { ...data }
        console.log(sanitizedUser)
        res.status(200).send(sanitizedUser)
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await userService.updateUser(req.params.id, req.body)
        res.sendStatus(StatusCodes.OK)
    } catch (err) {
        next(err)
    }
}
