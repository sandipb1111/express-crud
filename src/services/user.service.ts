/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client"
import * as Boom from "@hapi/boom"
import bcrypt from "bcryptjs"

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
    try {
        const { name, email, address, password } = user
        const users = await prisma.user.create({
            data: {
                email,
                id: Math.ceil(Math.random() * 100),
                name,
                address,
                password: await bcrypt.hash(password as string, 10),
            },
        })
        return users
    } catch (err: any) {
        if (err.code === "P2002") {
            throw Boom.badRequest("Email already exist")
        } else {
            throw err
        }
    }
}

export const deleteUser = async (id: number) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id,
            },
        })
        return user
    } catch (error: any) {
        if (error.code === "P2025") {
            throw Boom.notAcceptable("Record not found")
        } else {
            throw error
        }
    }
}

export const updateUser = async (id: string, user: any) => {
    try {
        const { name, address, email, password } = user
        const users = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                address,
                email,
                password: await bcrypt.hash(password as string, 10),
            },
        })
        return users
    } catch (err: any) {
        if (err.code == "P2025") {
            throw Boom.notFound("Record not found")
        }
        if (err.code === "P2002") {
            throw Boom.notAcceptable("Email already is in use")
        } else {
            throw Error
        }
    }
}
