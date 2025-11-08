import { Card, CardContent } from "@/components/ui/card"
import { FEATURES } from "@/lib/constants"
import { FadeInSection } from "@/components/ui/fade-in-section"

export function Features() {
  return (
    <FadeInSection>
    <section id="features" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Why Choose Our AI Detector?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Powerful features designed for accuracy, speed, and ease of use
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="relative overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  {/* Icon */}
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
    </FadeInSection>
  )
}
