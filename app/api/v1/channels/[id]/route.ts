import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Validate API key
  const apiKey = request.headers.get("x-api-key")
  const isValid = await validateApiKey(apiKey)

  if (!isValid) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  // In a real app, fetch channel from database
  const channel = {
    id: params.id,
    name: "Temperature Monitor",
    description: "Monitors temperature in the living room",
    fields: ["temperature", "humidity"],
    created: "2023-01-15T12:00:00Z",
    lastUpdate: "2023-04-05T08:30:00Z",
  }

  return NextResponse.json({ channel })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Validate API key
  const apiKey = request.headers.get("x-api-key")
  const isValid = await validateApiKey(apiKey)

  if (!isValid) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // In a real app, update channel in database
    const channel = {
      id: params.id,
      name: body.name || "Temperature Monitor",
      description: body.description || "Monitors temperature in the living room",
      fields: body.fields || ["temperature", "humidity"],
      created: "2023-01-15T12:00:00Z",
      lastUpdate: new Date().toISOString(),
    }

    return NextResponse.json({ channel })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Validate API key
  const apiKey = request.headers.get("x-api-key")
  const isValid = await validateApiKey(apiKey)

  if (!isValid) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  // In a real app, delete channel from database

  return NextResponse.json({ success: true, message: `Channel ${params.id} deleted successfully` })
}

