"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { channels, channelFields } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { requireAuth, getCurrentUser } from "@/lib/auth"
import { z } from "zod"

// Validation schema
const channelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
})

const fieldSchema = z.object({
  name: z.string().min(1, "Field name is required"),
  type: z.enum(["number", "string", "boolean", "location", "status"], {
    invalid_type_error: "Invalid field type",
  }),
})

export async function createChannel(formData: FormData) {
  const user = await requireAuth()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const isPublic = formData.get("public") === "on"

  // Validate input
  const result = channelSchema.safeParse({ name, description, isPublic })
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  try {
    // Create channel
    const [channel] = await db
      .insert(channels)
      .values({
        userId: user.id,
        name,
        description,
        isPublic,
      })
      .returning({ id: channels.id })

    // Process field data
    const fieldsToCreate = []
    for (let i = 1; i <= 8; i++) {
      const fieldName = formData.get(`field${i}`) as string
      const fieldType = formData.get(`field${i}Type`) as string

      if (fieldName && fieldType) {
        // Validate field
        const fieldResult = fieldSchema.safeParse({ name: fieldName, type: fieldType })
        if (fieldResult.success) {
          fieldsToCreate.push({
            channelId: channel.id,
            name: fieldName,
            type: fieldType,
          })
        }
      }
    }

    // Create fields if any
    if (fieldsToCreate.length > 0) {
      await db.insert(channelFields).values(fieldsToCreate)
    }

    // Revalidate path
    revalidatePath("/dashboard/channels")

    // Redirect to the new channel page
    redirect(`/dashboard/channels/${channel.id}`)
  } catch (error) {
    console.error("Error creating channel:", error)
    return { error: { _form: ["An unexpected error occurred"] } }
  }
}

export async function updateChannel(channelId: string, formData: FormData) {
  await requireAuth()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const isPublic = formData.get("public") === "on"

  // Validate input
  const result = channelSchema.safeParse({ name, description, isPublic })
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  try {
    // Update channel
    await db
      .update(channels)
      .set({ name, description, isPublic, updatedAt: new Date() })
      .where(eq(channels.id, Number.parseInt(channelId)))

    // Process field updates (more complex, would need to handle additions, removals, and updates)

    // Revalidate paths
    revalidatePath(`/dashboard/channels/${channelId}`)
    revalidatePath("/dashboard/channels")

    return { success: true }
  } catch (error) {
    console.error("Error updating channel:", error)
    return { error: { _form: ["An unexpected error occurred"] } }
  }
}

export async function deleteChannel(channelId: string) {
  await requireAuth()

  try {
    await db.delete(channels).where(eq(channels.id, Number.parseInt(channelId)))

    // Revalidate path
    revalidatePath("/dashboard/channels")

    redirect("/dashboard/channels")
  } catch (error) {
    console.error("Error deleting channel:", error)
    return { error: "Failed to delete channel" }
  }
}

export async function getUserChannels() {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  try {
    const userChannels = await db.select().from(channels).where(eq(channels.userId, user.id))
    return userChannels
  } catch (error) {
    console.error("Error getting user channels:", error)
    return []
  }
}

export async function getChannelById(id: string) {
  try {
    const [channel] = await db
      .select()
      .from(channels)
      .where(eq(channels.id, Number.parseInt(id)))

    if (!channel) {
      return null
    }

    // Get channel fields
    const fields = await db.select().from(channelFields).where(eq(channelFields.channelId, channel.id))

    return { ...channel, fields }
  } catch (error) {
    console.error("Error getting channel by ID:", error)
    return null
  }
}

