import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/auth"

export async function GET(request: NextRequest) {
  // Validate API key
  const apiKey = request.headers.get("x-api-key")
  const isValid = await validateApiKey(apiKey)

  if (!isValid) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  // In a real app, fetch channels from database
  const channels = [
    {
      id: "1",
      name: "Temperature Monitor",
      description: "Monitors temperature in the living room",
      fields: ["temperature", "humidity"],
      created: "2023-01-15T12:00:00Z",
      lastUpdate: "2023-04-05T08:30:00Z",
    },
    {
      id: "2",
      name: "Smart Garden",
      description: "Monitors soil moisture and light levels",
      fields: ["moisture", "light", "temperature"],
      created: "2023-02-20T15:45:00Z",
      lastUpdate: "2023-04-04T19:15:00Z",
    },
  ]

  return NextResponse.json({ channels })
}

export async function POST(request: NextRequest) {
  // Validate API key
  const apiKey = request.headers.get("x-api-key")
  const isValid = await validateApiKey(apiKey)

  if (!isValid) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: "Channel name is required" }, { status: 400 })
    }

    // In a real app, create channel in database
    const channel = {
      id: Math.random().toString(36).substring(2, 10),
      name: body.name,
      description: body.description || "",
      fields: body.fields || [],
      created: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
    }

    return NextResponse.json({ channel }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

