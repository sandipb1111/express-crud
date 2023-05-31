/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as Boom from "@hapi/boom"
import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Extract the token from the request headers

    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1]
    console.log(token)

    if (!token) {
        throw Boom.notFound("Missing Token Authentication")
    }

    try {
        // Verify and decode the token
        const decodedToken = jwt.verify(token, "random-secret")
        // Attach the decoded token to the request object
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req.user = decodedToken

        next() // Proceed to the next middleware or route handler
    } catch (error) {
        throw Boom.notAcceptable("Invalid token authentication ")
    }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { user }: { user: any } = req

    if (user && user.isAdmin) {
        next() // Proceed to the next middleware or route handler
    } else {
        throw Boom.unauthorized("User is not an Admin")
    }
}
