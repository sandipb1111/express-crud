/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client"
import Boom from "@hapi/boom"
import { randomBytes, scryptSync } from "crypto"
const salt = randomBytes(16).toString("hex")

const prisma = new PrismaClient()

export const display = async () => {
    try {
        const users = await prisma.user.findMany()
        return users
    } catch (err: any) {
        if (err.code === "P2025") {
            throw Boom.notFound("Post not found")
        } else {
            throw err
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postUser = async (user: any) => {
    const { name, email, address, password } = user
    const users = await prisma.user.create({
        data: {
            email,
            id: Math.ceil(Math.random() * 100),
            name,
            address,
            password: await scryptSync(password, salt, 32).toString("hex"),
        },
    })
    console.log(users)
    return users
}

export const deleteUser = async (id: string) => {
    try {
        return await prisma.user.delete({
            where: {
                id: Number(id),
            },
        })
    } catch (error: any) {
        if (error.code === "P2025") {
            throw Boom.notFound("Record not found")
        } else {
            throw error
        }
    }
}

export const updateUser = async (id: string, user: any) => {
    try {
        const { name, address, email, password } = user
        const users = await prisma.user.upsert({
            create: {
                name,
                address,
                email,
                password: await scryptSync(password, salt, 32).toString("hex"),
            },
            where: {
                id: Number(id),
            },
            update: {
                name,
                address,
                email,
                password: await scryptSync(password, salt, 32).toString("hex"),
            },
        })
        return users
    } catch (err: any) {
        if (err.code == "P2025") {
            throw Boom.notFound("Record not found")
        } else {
            throw Error
        }
    }
}
