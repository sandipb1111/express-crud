/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Boom from "@hapi/boom"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import * as crypto from "crypto"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()

export const login = async (email: string, password: string) => {
    let user: any
    try {
        user = await prisma.user.findFirstOrThrow({
            where: {
                email,
            },
        })
    } catch (err: any) {
        if (err.code === "P2025") {
            throw Boom.notFound("Record does not exist")
        }
    }
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw Boom.unauthorized("Password Does not match")
    }
    const token = jwt.sign({ userId: user.id }, "random-secret", {
        expiresIn: "1h",
    })
    return { success: true, token }
}
