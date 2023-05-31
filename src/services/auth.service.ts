import * as Boom from "@hapi/boom"
import { PrismaClient } from "@prisma/client"
import * as crypto from "crypto"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()

export const login = async (user: any) => {
    try {
        const { email, password } = user
        const users = await prisma.user.findFirstOrThrow({
            where: {
                email,
            },
        })
        const passwordMatch = (password: string, hashedPassword: string) => {
            const salt = hashedPassword.slice(0, 16)
            const hash = crypto.scryptSync(password, salt, 32)
            return hash.toString("hex") === hashedPassword
        }
        if (!passwordMatch) {
            throw Error("Password does not match")
        }
        const token = jwt.sign({ userId: users.id }, "random-secret", {
            expiresIn: "1h",
        })
        return { success: true, token }
    } catch (err: any) {
        throw Error
    }
}
