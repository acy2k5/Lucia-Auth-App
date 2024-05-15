import { z } from "zod"

// Common validation rules
const commonValidation = {
    fullName: z.string().optional(),
    username: z.string().min(4).max(32),
    email: z.string().max(255).email(),
    password: z.string().min(8).max(64),
}

// Common validation rules for username
const usernameSchema = z
    .string()
    .min(4, "Username must contain at least 4 characters")
    .max(32, "Username cannot exceed 32 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers")

// Common validation rules for email
const emailSchema = z
    .string()
    .max(255)
    .email("Please enter a valid email address")
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

export const signupSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
})

export const signinSchema = z.object({
    email: commonValidation.email,
    password: commonValidation.password,
})

export const contactSchema = z.object({
    name: commonValidation.fullName,
    email: emailSchema,
    subject: z.string(),
    message: z.string(),
})

export const userDeletionSchema = z.object({
    confirmation: z.boolean(),
})

// Schema for resetting password data validation
export const resetPasswordSchema = z
    .object({
        password: commonValidation.password,
        newPassword: passwordSchema,
        confirmPassword: commonValidation.password,
        logoutFromOtherDevices: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match. Please re-enter your password",
        path: ["confirmPassword"],
    })
    .refine((data) => data.newPassword !== data.password, {
        message: "New password must differ from the current password",
        path: ["newPassword"],
    })
