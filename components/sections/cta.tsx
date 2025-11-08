import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FadeInSection } from "@/components/ui/fade-in-section"

export function CTA() {
  return (
    <FadeInSection>
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-purple-500/20 to-cyan-500/20" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to Detect AI Content?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Join thousands of educators, content creators, and businesses using our
            AI detection platform. Start your free trial today—no credit card
            required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-12 px-8 text-base">
              Start Free Trial
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <button className="group relative overflow-hidden inline-flex items-center justify-center h-12 px-8 text-base rounded-md border border-input bg-background transition-all duration-300 hover:bg-transparent hover:text-white hover:border-transparent">
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Contact Sales</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    </FadeInSection>
  )
}
