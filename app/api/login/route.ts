import { NextResponse } from "next/server"

// Mock database for the preview environment
const users = new Map()

export async function POST(request: Request) {
  try {
    // Handle both form data and JSON
    const contentType = request.headers.get("content-type") || ""
    let username, password

    if (contentType.includes("application/json")) {
      const body = await request.json()
      username = body.username
      password = body.password
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData()
      username = formData.get("username") as string
      password = formData.get("password") as string
    } else {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 415 })
    }

    // Basic validation
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Check if user exists and password matches
    const user = users.get(username)
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate a mock JWT token
    const token = `mock-jwt-token-${Date.now()}`

    return NextResponse.json({
      access_token: token,
      token_type: "bearer",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
