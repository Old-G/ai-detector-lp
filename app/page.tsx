import dynamic from "next/dynamic"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Pricing } from "@/components/sections/pricing"
import { FAQSection } from "@/components/sections/faq"
import { CTA } from "@/components/sections/cta"

// Lazy load Canvas - декоративный фон, не критичен для FCP, только desktop
const Canvas = dynamic(() => import("@/components/ui/canvas").then(mod => ({ default: mod.Canvas })))

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Canvas Background - только на desktop */}
      <div className="hidden md:block">
        <Canvas />
      </div>

      {/* Header */}
      <Header />

      {/* Sections */}
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQSection />
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  )
}
