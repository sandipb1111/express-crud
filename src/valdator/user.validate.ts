import { z } from "zod"

export const createPostDto = z.object({
    body: z.object({
        // id: z.string({
        //     required_error: 'id is required',
        // }),
        name: z.string({
            required_error: "name is required",
        }),
        address: z.string({
            required_error: "address is required",
        }),
        password: z.string({
            required_error: "password is required",
        }),
        email: z
            .string({
                required_error: "email is required",
            })
            .email("not a valid email"),
    }),
})
