"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { LoginResponse } from "@/lib/api"

interface User {
  email?: string
  token: string
}

interface AuthContextType {
  user: User | null
  login: (response: LoginResponse, email: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  // Check for existing token on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("token")
      const email = localStorage.getItem("email")

      if (token) {
        setUser({
          email: email || undefined,
          token,
        })
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      // Continue without setting user - will be treated as not logged in
    }
  }, [])

  // Login function
  const login = (response: LoginResponse, email: string) => {
    const { access_token } = response

    // Save to state
    setUser({
      email,
      token: access_token,
    })

    // Save to localStorage
    localStorage.setItem("token", access_token)
    localStorage.setItem("email", email)
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
