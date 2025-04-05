"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createUser, getUserByEmail, verifyPassword, createSession } from "@/lib/auth"
import { z } from "zod"

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate input
  const result = loginSchema.safeParse({ email, password })
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  try {
    // Get user from database
    const user = await getUserByEmail(email)

    if (!user) {
      return { error: { email: ["Invalid email or password"] } }
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return { error: { email: ["Invalid email or password"] } }
    }

    // Create session
    await createSession(user.id)

    // Redirect to dashboard
    redirect("/dashboard")
  } catch (error) {
    console.error("Login error:", error)
    return { error: { _form: ["An unexpected error occurred"] } }
  }
}

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate input
  const result = registerSchema.safeParse({ name, email, password })
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return { error: { email: ["Email already in use"] } }
    }

    // Create user
    const user = await createUser(name, email, password)

    // Create session
    await createSession(user.id)

    // Redirect to dashboard
    redirect("/dashboard")
  } catch (error) {
    console.error("Registration error:", error)
    return { error: { _form: ["An unexpected error occurred"] } }
  }
}

export async function logoutUser() {
  cookies().delete("auth-token")
  revalidatePath("/")
  redirect("/")
}

