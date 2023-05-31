/* eslint-disable @typescript-eslint/no-unsafe-argument */
import HttpStatus from "http-status-codes"

import { Response, Request, NextFunction } from "express"
import buildError from "../utils/build-error"

export function methodNotAllowed(req: Request, res: Response) {
    res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
        error: {
            code: HttpStatus.METHOD_NOT_ALLOWED,
            message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
        },
    })
}

export const genericErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error = buildError(err)

    res.status(error.code).json({ error })
}
