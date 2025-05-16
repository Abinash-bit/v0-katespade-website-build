"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Calendar, Heart, ShoppingBag, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProfile } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

interface ProfileData {
  email: string
  dob: string
  gender: string
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const { user, isAuthenticated, logout } = useAuth()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Fetch profile data
    const fetchProfile = async () => {
      if (!user?.token) return

      try {
        const data = await getProfile(user.token)
        setProfileData(data)
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [isAuthenticated, router, toast, user])

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-medium">{profileData?.email || user?.email}</h2>
              <p className="text-sm text-muted-foreground">Customer</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>View and manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">{profileData?.email || user?.email}</div>
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <div className="font-medium">Date of Birth</div>
                    <div className="text-sm text-muted-foreground">
                      {profileData?.dob ? new Date(profileData.dob).toLocaleDateString() : "Not provided"}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <div className="font-medium">Gender</div>
                    <div className="text-sm text-muted-foreground">
                      {profileData?.gender
                        ? profileData.gender.charAt(0).toUpperCase() + profileData.gender.slice(1)
                        : "Not provided"}
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button onClick={() => router.push("/complete-profile")}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Update Profile
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
