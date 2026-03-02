import { z } from 'zod';

export const createUserSchema = z.object({ 
    body: z.object({
        name: z
            .string({ message: "O nome precisa ser um texto"})
            .min(3, { message: "O nome precisa conter no mínimo 3 caracteres" }),
        email: z
            .email({ message: "Precisa ser um email válido" }),
        password: z
            .string({ message: "A senha é obrigatória" })
            .min(6, { message: "A senha precisa conter no mínimo 6 caracteres" }),
    }),
});

export const authUserSchema = z.object({
    body: z.object({
        email: z.email({ message: "Precisa ser um email válido" }),
        password: z.string({ message: "A senha é obrigatória" }).min(1, { message: "A senha precisa conter no mínimo 6 caracteres" }),
    }),
});

