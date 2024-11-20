import z from "zod"




export const signInSchema = z.object({
    username: z.string().min(1, "Enter the username"),
    password: z.string().min(1, "Enter the password")
});


export type signInSchemaType = z.infer<typeof signInSchema>;


export const signUpSchema = z.object({
    username: z.string().regex(/^[a-zA-Z0-9_@]+$/, {
        message: "Username can only contain letters, numbers, underscores (_), and the at symbol (@)",
    }),
    password: z.string().min(6, "Password must atleast have 8 characters.").max(16, "Password can atmost have 16 characaters").regex(/^(?=.*[a-z]).*$/, "Password must contain atleat one lowercase letter").regex(/^(?=.*[A-Z]).*$/, "Password must contain atleat one uppercase letter").regex(/^(?=.*\d).*$/, "Password must contain atleat one number").regex(/^(?=.*[_,@)(*&^%$#!]).*$/, "Password must have atleast one special character."),
    firstname: z.string().min(1, "Enter Firstname.").max(50, "Firstname cannot be more than 50 characters"),
    lastname: z.string().max(50, "Lastname cannot be more than 50 characters"),
    role: z.string().default("User")
})


export type signUpSchemaType = z.infer<typeof signUpSchema>; 