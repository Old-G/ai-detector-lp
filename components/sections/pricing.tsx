"use client"

import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PRICING } from "@/lib/constants"
import { FadeInSection } from "@/components/ui/fade-in-section"

export function Pricing() {
  return (
    <FadeInSection>
    <section id="pricing" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="container px-4 md:px-6 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {PRICING.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {PRICING.subtitle}
          </p>
        </div>

        {/* Pricing Tabs */}
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="monthly" className="w-full">
            {/* Tab Switcher */}
            <div className="flex justify-center mb-8">
              <TabsList className="rounded-full p-1">
                <TabsTrigger value="monthly" className="rounded-full px-6">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="annually" className="rounded-full px-6">
                  Annually (Save 20%)
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Monthly Pricing */}
            <TabsContent value="monthly">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                {PRICING.plans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                      plan.popular
                        ? "border-primary shadow-lg"
                        : "border-border/40 shadow-md"
                    } bg-gradient-to-b from-background to-muted/10 backdrop-blur`}
                  >
                    {plan.badge && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                        {plan.badge}
                      </div>
                    )}
                    <CardContent className="p-6 flex flex-col h-full">
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <div className="flex items-baseline mt-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">
                          /{plan.billing === "Forever Free" ? "forever" : "month"}
                        </span>
                      </div>
                      <div className="h-5 mt-1" />
                      <p className="text-muted-foreground mt-2">
                        {plan.description}
                      </p>
                      <ul className="space-y-3 my-6 flex-grow">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-start">
                            <Check className="mr-2 size-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full mt-auto rounded-full"
                        variant={plan.variant}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Annual Pricing */}
            <TabsContent value="annually">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                {PRICING.plans.map((plan, index) => {
                  // Calculate annual price (20% discount)
                  const monthlyPrice = parseInt(plan.price.replace("$", ""))
                  const annualPrice = monthlyPrice > 0 ? Math.round(monthlyPrice * 0.8) : 0

                  return (
                    <Card
                      key={index}
                      className={`relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                        plan.popular
                          ? "border-primary shadow-lg"
                          : "border-border/40 shadow-md"
                      } bg-gradient-to-b from-background to-muted/10 backdrop-blur`}
                    >
                      {plan.badge && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                          {plan.badge}
                        </div>
                      )}
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="flex items-baseline mt-4">
                          <span className="text-4xl font-bold">
                            ${annualPrice === 0 ? "0" : annualPrice}
                          </span>
                          <span className="text-muted-foreground ml-1">
                            /{plan.billing === "Forever Free" ? "forever" : "month"}
                          </span>
                        </div>
                        <div className="h-5 mt-1">
                          {annualPrice > 0 && (
                            <p className="text-sm text-muted-foreground transition-opacity duration-300">
                              Billed annually (${annualPrice * 12}/year)
                            </p>
                          )}
                        </div>
                        <p className="text-muted-foreground mt-2">
                          {plan.description}
                        </p>
                        <ul className="space-y-3 my-6 flex-grow">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-start">
                              <Check className="mr-2 size-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className="w-full mt-auto rounded-full"
                          variant={plan.variant}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Additional Note */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            All plans include regular updates and improvements. Cancel anytime, no
            questions asked.
          </p>
        </div>
      </div>
    </section>
    </FadeInSection>
  )
}
