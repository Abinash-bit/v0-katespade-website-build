import { NextResponse } from "next/server"
import { headers } from "next/headers"

// Mock database for the preview environment
const users = new Map()
const profiles = new Map()

export async function GET(request: Request) {
  try {
    // Get authorization header
    const headersList = headers()
    const authorization = headersList.get("authorization")

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authorization.split(" ")[1]

    // In a real app, you would verify the token
    // For this mock, we'll extract the email from the request
    // This is just for demonstration purposes
    const email = headersList.get("x-user-email") || "user@example.com"

    // Get profile data
    const profile = profiles.get(email) || {
      email,
      dob: "",
      gender: "",
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Get authorization header
    const headersList = headers()
    const authorization = headersList.get("authorization")

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authorization.split(" ")[1]

    // In a real app, you would verify the token and get the user
    // For this mock, we'll extract the email from the request or use a default
    const email = headersList.get("x-user-email") || "user@example.com"

    // Get profile data from request
    const body = await request.json()
    const { dob, gender } = body

    // Update profile
    profiles.set(email, {
      email,
      dob,
      gender,
    })

    return NextResponse.json({
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
