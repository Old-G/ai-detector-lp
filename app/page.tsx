import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Canvas } from "@/components/ui/canvas"
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Pricing } from "@/components/sections/pricing"
import { FAQSection } from "@/components/sections/faq"
import { CTA } from "@/components/sections/cta"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Canvas Background */}
      <Canvas />

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
