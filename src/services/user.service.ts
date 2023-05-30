import { PrismaClient } from "@prisma/client"
import Boom from "@hapi/boom"

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

export const postUser = async (user: any) => {
    const { name, email, address } = user
    const users = await prisma.user.create({
        data: {
            email,
            id: Math.ceil(Math.random() * 100),
            name,
            address,
        },
    })
    return users
}

export const deleteUser = async (id: string) => {
    return await prisma.user.delete({
        where: {
            id: Number(id),
        },
    })
}

export const updateUser = async (id: string, user: any) => {
    const { name, address, email } = user
    const users = await prisma.user.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
            address,
            email,
        },
    })
    return users
}
