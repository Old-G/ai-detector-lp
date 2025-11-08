"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="size-9"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {/* Mobile menu with smooth animation */}
      <div
        className={`absolute top-16 inset-x-0 border-b bg-background/95 backdrop-blur-lg transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-4 p-4">
          <Link
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
          <div className="flex flex-col gap-2 pt-2 border-t">
            <button className="group relative overflow-hidden inline-flex items-center justify-center h-9 px-4 text-sm rounded-md transition-all duration-300 hover:text-white w-full">
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Log in</span>
            </button>
            <Button size="sm" className="w-full">
              Try Free
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}
