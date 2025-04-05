import { db } from "./db"
import { users, apiKeys } from "./schema"
import { eq } from "drizzle-orm"
import { compare, hash } from "bcrypt"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const secretKey = process.env.JWT_SECRET_KEY || "default-secret-key-for-development"
const key = new TextEncoder().encode(secretKey)

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword)
}

export async function createUser(name: string, email: string, password: string) {
  const hashedPassword = await hashPassword(password)

  try {
    const result = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ id: users.id })

    return result[0]
  } catch (error) {
    console.error("Error creating user:", error)
    throw new Error("Failed to create user")
  }
}

export async function getUserByEmail(email: string) {
  try {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0]
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

export async function createSession(userId: number) {
  // Create a JWT token
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key)

  // Set the token in a cookie
  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "strict",
  })

  return token
}

export async function getSession() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, key)
    return verified.payload as { userId: number }
  } catch (error) {
    return null
  }
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!session) {
    return null
  }

  try {
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, session.userId))

    return result[0]
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

export async function validateApiKey(apiKey: string | null): Promise<boolean> {
  if (!apiKey) {
    return false
  }

  try {
    const result = await db.select().from(apiKeys).where(eq(apiKeys.key, apiKey))

    if (result.length === 0) {
      return false
    }

    // Update last used timestamp
    await db.update(apiKeys).set({ lastUsed: new Date() }).where(eq(apiKeys.key, apiKey))

    return true
  } catch (error) {
    console.error("Error validating API key:", error)
    return false
  }
}

