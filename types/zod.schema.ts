import { z } from "zod"

// Common validation rules
const commonValidation = {
    age: z.number(),
    confirmation: z.boolean(),
    fullName: z.string(),
    username: z.string().min(4).max(32),
    email: z.string().email(),
    password: z.string().min(8).max(64),
}

// Common validation rules for username
const usernameSchema = z
    .string()
    .min(4, "Username must contain at least 4 characters")
    .max(32, "Username cannot exceed 32 characters")
    .regex(/^[a-z0-9_]+$/, "Username can only contain letters and numbers")

// Common validation rules for email
const emailSchema = z
    .string()
    .max(255)
    .email("Invalid email address")
    .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
        message: "Invalid email format",
    })

// Common validation rules for password
const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(64, "Password cannot exceed 64 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])$/,
        "Password must contain at least one uppercase letter, one digit, and one special character"
    )

export const signupFormSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
})

export const signinFormSchema = z.object({
    email: commonValidation.email,
    password: commonValidation.password,
})

export const contactFormSchema = z.object({
    name: commonValidation.fullName.optional(),
    email: emailSchema,
    subject: z.string().min(1).max(100),
    message: z.string().min(10).max(1000),
})

export const verificatioinSchema = z.object({
    code: commonValidation.confirmation,
})

export const userDeletionSchema = z.object({
    deleteAccount: commonValidation.confirmation,
})

// Schema for resetting password data validation
export const resetPasswordSchema = z
    .object({
        password: commonValidation.password,
        newPassword: passwordSchema,
        confirmPassword: commonValidation.password,
        logoutFromOtherDevices: commonValidation.confirmation,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match. Please re-enter your password",
        path: ["confirmPassword"],
    })
    .refine((data) => data.newPassword !== data.password, {
        message: "New password must differ from the current password",
        path: ["newPassword"],
    })
