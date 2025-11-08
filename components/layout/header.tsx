import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Lazy load client components - не критичны для FCP
const ThemeToggle = dynamic(() => import("./theme-toggle").then(mod => ({ default: mod.ThemeToggle })))
const MobileMenu = dynamic(() => import("./mobile-menu").then(mod => ({ default: mod.MobileMenu })))

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            AI
          </div>
          <span className="hidden sm:inline">AI Detector</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            <button className="group relative overflow-hidden inline-flex items-center justify-center h-9 px-4 text-sm rounded-md transition-all duration-300 hover:text-white">
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Log in</span>
            </button>
            <Button size="sm">Try Free</Button>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
