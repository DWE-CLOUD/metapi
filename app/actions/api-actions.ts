"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { apiKeys } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser, requireAuth } from "@/lib/auth"
import { z } from "zod"
import crypto from "crypto"

// Validation schema
const apiKeySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["read", "write", "full"], {
    invalid_type_error: "Type must be read, write, or full",
  }),
})

export async function createApiKey(formData: FormData) {
  const user = await requireAuth()

  const name = (formData.get("name") as string) || "API Key"
  const type = (formData.get("type") as string) || "read"

  // Validate input
  const result = apiKeySchema.safeParse({ name, type })
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  try {
    // Generate a random API key
    const prefix = "ms_"
    const typePrefix = type.charAt(0) // r for read, w for write, f for full
    const key = crypto.randomBytes(20).toString("hex")

    const apiKey = `${prefix}${typePrefix}_${key}`

    // Save to database
    await db.insert(apiKeys).values({
      userId: user.id,
      name,
      key: apiKey,
      type,
    })

    // Revalidate path
    revalidatePath("/dashboard/api-keys")

    return { success: true, apiKey }
  } catch (error) {
    console.error("Error creating API key:", error)
    return { error: { _form: ["An unexpected error occurred"] } }
  }
}

export async function deleteApiKey(id: string) {
  await requireAuth()

  try {
    await db.delete(apiKeys).where(eq(apiKeys.id, Number.parseInt(id)))

    // Revalidate path
    revalidatePath("/dashboard/api-keys")

    return { success: true }
  } catch (error) {
    console.error("Error deleting API key:", error)
    return { error: "Failed to delete API key" }
  }
}

export async function getUserApiKeys() {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  try {
    const keys = await db.select().from(apiKeys).where(eq(apiKeys.userId, user.id))
    return keys
  } catch (error) {
    console.error("Error getting API keys:", error)
    return []
  }
}

