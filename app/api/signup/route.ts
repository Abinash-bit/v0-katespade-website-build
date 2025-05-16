import { NextResponse } from "next/server"

// Mock database for the preview environment
const users = new Map()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Store user
    users.set(email, {
      email,
      password, // In a real app, you would hash this
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
