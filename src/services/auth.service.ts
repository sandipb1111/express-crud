import * as Boom from "@hapi/boom"
import { PrismaClient } from "@prisma/client"
import * as crypto from "crypto"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()
const passwordMatch = (password: string, hashedPassword: string) => {
    const salt = hashedPassword.slice(0, 16)
    const hash = crypto.scryptSync(password, salt, 32)
    return hash.toString("hex") === hashedPassword
}

export const login = async (user: any) => {
    try {
        const { email, password } = user
        const users = await prisma.user.findFirstOrThrow({
            where: {
                email,
            },
        })

        const passwordCheck = passwordMatch(password, users.password)

        if (passwordCheck === false) {
            throw Boom.notFound("Password Does not match")
        } else {
            console.log("in true block")
            const token = jwt.sign({ userId: users.id }, "random-secret", {
                expiresIn: "1h",
            })
            return { success: true, token }
        }
    } catch (err: any) {
        throw Error
    }
}
