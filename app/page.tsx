import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tight">
              kate spade new york
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="#" className="text-sm font-medium hover:underline">
                Handbags
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Wallets
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Jewelry
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Watches
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Clothing
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
            <Button variant="outline" size="icon">
              <ShoppingBag className="h-4 w-4" />
              <span className="sr-only">Shopping cart</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f1f4]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover the new Spring Collection
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Elegance meets functionality in our latest designs. Explore our new arrivals and find your perfect
                  match.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#featured">
                    <Button size="lg" className="bg-black hover:bg-gray-800">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=700"
                alt="Kate Spade Spring Collection"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width={550}
                height={310}
              />
            </div>
          </div>
        </section>

        <section id="featured" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Categories</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our most popular collections and find your new favorite piece.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src="/placeholder.svg?height=400&width=300"
                      alt="Handbags"
                      className="aspect-[3/4] object-cover w-full"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <h3 className="text-xl font-bold text-white">Handbags</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src="/placeholder.svg?height=400&width=300"
                      alt="Jewelry"
                      className="aspect-[3/4] object-cover w-full"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <h3 className="text-xl font-bold text-white">Jewelry</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src="/placeholder.svg?height=400&width=300"
                      alt="Clothing"
                      className="aspect-[3/4] object-cover w-full"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <h3 className="text-xl font-bold text-white">Clothing</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f1f4]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">New Arrivals</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The latest additions to our collection.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src="/placeholder.svg?height=300&width=250"
                        alt={`Product ${i + 1}`}
                        className="aspect-[3/4] object-cover w-full"
                        width={250}
                        height={300}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Product Name</h3>
                      <p className="text-sm text-muted-foreground">$199.00</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-white py-6 md:py-12">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Kate Spade New York. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
