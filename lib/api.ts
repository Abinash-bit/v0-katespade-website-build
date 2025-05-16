// API service for handling authentication and profile requests

// Types
export interface SignupData {
  email: string
  password: string
}

export interface LoginData {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface ProfileData {
  dob: string
  gender: string
}

export interface ProfileResponse {
  email: string
  dob: string
  gender: string
}

// Check if we're in a preview environment
const isPreview = typeof window !== "undefined" && window.location.hostname.includes("vercel.app")

// API base URL - use mock API in preview
const API_BASE_URL = isPreview ? "/api" : "http://localhost:8000"

// Mock data for preview environment
const MOCK_USERS = new Map()
let MOCK_CURRENT_USER = null

// Signup API
export async function signup(data: SignupData): Promise<Response> {
  try {
    if (isPreview) {
      // Mock implementation for preview
      console.log("Using mock signup API")

      // Check if user already exists
      if (MOCK_USERS.has(data.email)) {
        return new Response(JSON.stringify({ error: "User already exists" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      }

      // Store user
      MOCK_USERS.set(data.email, {
        email: data.email,
        password: data.password,
        dob: "",
        gender: "",
      })

      return new Response(JSON.stringify({ message: "User created successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Signup failed with status: ${response.status}`)
    }

    return response
  } catch (error) {
    console.error("Signup error details:", error)
    throw error
  }
}

// Login API
export async function login(data: LoginData): Promise<LoginResponse> {
  try {
    if (isPreview) {
      // Mock implementation for preview
      console.log("Using mock login API")

      // Check if user exists and password matches
      const user = MOCK_USERS.get(data.username)
      if (!user || user.password !== data.password) {
        throw new Error("Invalid credentials")
      }

      // Set current user
      MOCK_CURRENT_USER = data.username

      return {
        access_token: "mock-jwt-token-" + Date.now(),
        token_type: "bearer",
      }
    }

    // Real API call
    const formData = new URLSearchParams()
    formData.append("username", data.username)
    formData.append("password", data.password)

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Login failed with status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Login error details:", error)
    throw error
  }
}

// Update profile API
export async function updateProfile(data: ProfileData, token: string): Promise<Response> {
  try {
    if (isPreview) {
      // Mock implementation for preview
      console.log("Using mock update profile API")

      if (!MOCK_CURRENT_USER) {
        throw new Error("Not authenticated")
      }

      // Update user profile
      const user = MOCK_USERS.get(MOCK_CURRENT_USER)
      if (user) {
        user.dob = data.dob
        user.gender = data.gender
        MOCK_USERS.set(MOCK_CURRENT_USER, user)
      }

      return new Response(JSON.stringify({ message: "Profile updated successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Profile update failed with status: ${response.status}`)
    }

    return response
  } catch (error) {
    console.error("Update profile error details:", error)
    throw error
  }
}

// Get profile API
export async function getProfile(token: string): Promise<ProfileResponse> {
  try {
    if (isPreview) {
      // Mock implementation for preview
      console.log("Using mock get profile API")

      if (!MOCK_CURRENT_USER) {
        throw new Error("Not authenticated")
      }

      // Get user profile
      const user = MOCK_USERS.get(MOCK_CURRENT_USER)
      if (!user) {
        throw new Error("User not found")
      }

      return {
        email: user.email,
        dob: user.dob,
        gender: user.gender,
      }
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to fetch profile with status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Get profile error details:", error)
    throw error
  }
}
