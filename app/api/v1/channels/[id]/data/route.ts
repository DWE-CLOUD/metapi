import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Validate API key
  const apiKey = request.headers.get("x-api-key")
  const isValid = await validateApiKey(apiKey)

  if (!isValid) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  // Parse query parameters
  const searchParams = request.nextUrl.searchParams
  const results = searchParams.get("results") || "10"
  const days = searchParams.get("days") || "1"

  // In a real app, fetch data from database
  const now = new Date()
  const data = Array.from({ length: Number.parseInt(results) }, (_, i) => {
    const timestamp = new Date(now.getTime() - i * 3600000)
    return {
      id: Math.random().toString(36).substring(2, 10),
      timestamp: timestamp.toISOString(),
      field1: Math.round(20 + Math.random() * 5), // temperature
      field2: Math.round(40 + Math.random() * 20), // humidity
      created_at: timestamp.toISOString(),
    }
  }).reverse()

  return NextResponse.json({
    channel_id: params.id,
    feeds: data,
  })
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  // Validate API key
  const apiKey = request.headers.get("x-api-key")
  const isValid = await validateApiKey(apiKey)

  if (!isValid) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Validate data
    if (
      !body.field1 &&
      !body.field2 &&
      !body.field3 &&
      !body.field4 &&
      !body.field5 &&
      !body.field6 &&
      !body.field7 &&
      !body.field8
    ) {
      return NextResponse.json({ error: "At least one field value is required" }, { status: 400 })
    }

    // In a real app, save data to database
    const entry = {
      id: Math.random().toString(36).substring(2, 10),
      channel_id: params.id,
      ...body,
      created_at: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        success: true,
        entry_id: entry.id,
        channel_id: params.id,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

