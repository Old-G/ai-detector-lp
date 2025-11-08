# 🚀 Финальный План Реализации: AI Content Detector Landing Page

## 📊 ОБЗОР ПРОЕКТА

**Что имеем:**
- ✅ Next.js 16 + App Router
- ✅ TypeScript + Tailwind CSS v4
- ✅ shadcn/ui (Button уже есть)
- ✅ Framer Motion (как `motion`)
- ✅ lucide-react (иконки)
- ✅ Готовый контент в lp-content.md

**Что делаем:**
- 🎯 Landing page с 6 секциями
- 🎨 AI-тематика (синие/фиолетовые градиенты)
- 🌓 Dark/Light mode с toggle
- ⚡ Canvas анимация (волны)
- 📱 Полный responsive
- 🔧 Server Components максимально
- 🎭 Mock scan modal

---

## 🏗️ АРХИТЕКТУРА

### Server vs Client Components

**SERVER COMPONENTS (статичные):**
```
✅ app/page.tsx
✅ components/sections/hero.tsx (обертка)
✅ components/sections/features.tsx
✅ components/sections/how-it-works.tsx
✅ components/sections/cta.tsx
✅ components/layout/header.tsx (обертка)
✅ components/layout/footer.tsx
```

**CLIENT COMPONENTS (интерактивные):**
```
"use client"
✅ components/ui/canvas.tsx
✅ components/modals/scan-modal.tsx
✅ components/layout/mobile-menu.tsx
✅ components/layout/theme-toggle.tsx
✅ components/sections/pricing.tsx (tabs)
✅ components/sections/faq.tsx (accordion)
```

### Финальная Структура Папок

```
landing/
├── app/
│   ├── layout.tsx          # Обновим: metadata + ThemeProvider
│   ├── page.tsx            # Главная: импорт всех секций
│   └── globals.css         # Обновим: AI-палитра
│
├── components/
│   ├── ui/                 # shadcn компоненты
│   │   ├── button.tsx      # ✅ Есть
│   │   ├── card.tsx        # 🆕 Установим
│   │   ├── badge.tsx       # 🆕 Установим
│   │   ├── accordion.tsx   # 🆕 Установим
│   │   ├── dialog.tsx      # 🆕 Установим
│   │   ├── tabs.tsx        # 🆕 Установим
│   │   └── canvas.tsx      # 🆕 Создадим (волны)
│   │
│   ├── sections/           # 🆕 Секции лендинга
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── how-it-works.tsx
│   │   ├── pricing.tsx
│   │   ├── faq.tsx
│   │   └── cta.tsx
│   │
│   ├── layout/             # 🆕 Layout компоненты
│   │   ├── header.tsx
│   │   ├── mobile-menu.tsx
│   │   ├── theme-toggle.tsx
│   │   └── footer.tsx
│   │
│   └── modals/             # 🆕 Модальные окна
│       └── scan-modal.tsx
│
├── lib/
│   ├── utils.ts            # ✅ Есть
│   └── constants.ts        # 🆕 Контент из lp-content.md
│
├── providers/              # 🆕 Провайдеры
│   └── theme-provider.tsx  # Dark mode
│
└── public/
    └── images/             # 🆕 (опционально)
```

---

## 🎨 ДИЗАЙН СИСТЕМА

### Цветовая Палитра (AI-тематика)

**Вдохновение:** OpenAI + Claude + Reference landing

```css
/* globals.css - AI Color Palette */

/* Light Mode */
:root {
  --primary: 210 100% 50%;           /* #0080ff - синий */
  --secondary: 250 80% 65%;          /* #7c6ef7 - фиолетовый */
  --accent: 190 95% 60%;             /* #1de9ff - голубой */

  --ai-gradient-from: 220 100% 55%; /* синий */
  --ai-gradient-via: 260 85% 65%;   /* фиолетовый */
  --ai-gradient-to: 190 95% 55%;    /* голубой */

  --canvas-hue-start: 220;          /* синий для волн */
  --canvas-hue-range: 60;           /* диапазон до голубого */
}

/* Dark Mode */
.dark {
  --primary: 210 100% 55%;
  --secondary: 250 80% 70%;
  --accent: 190 95% 65%;

  --canvas-hue-start: 230;
  --canvas-hue-range: 50;
}
```

### Градиенты

```css
/* Utility classes for AI gradients */
.gradient-ai {
  background: linear-gradient(
    135deg,
    hsl(var(--ai-gradient-from)),
    hsl(var(--ai-gradient-via)),
    hsl(var(--ai-gradient-to))
  );
}

.gradient-ai-radial {
  background: radial-gradient(
    circle at top left,
    hsl(var(--ai-gradient-from) / 0.2),
    transparent 60%
  );
}

.text-gradient-ai {
  background: linear-gradient(
    135deg,
    hsl(var(--ai-gradient-from)),
    hsl(var(--ai-gradient-via))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 📦 УСТАНОВКА ЗАВИСИМОСТЕЙ

### Этап 1: shadcn/ui компоненты

```bash
cd /Users/glebzavalov/Desktop/Projects/test/landing

# Установка shadcn компонентов
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add accordion
npx shadcn@latest add dialog
npx shadcn@latest add tabs
```

### Этап 2: Theme Provider

```bash
# Для dark mode
pnpm add next-themes
```

---

## 🔨 РЕАЛИЗАЦИЯ КОМПОНЕНТОВ

### 1. Theme Provider

**Файл:** `providers/theme-provider.tsx`

```typescript
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

---

### 2. Constants (Контент)

**Файл:** `lib/constants.ts`

```typescript
import { Target, Zap, Shield } from "lucide-react"

export const HERO_CONTENT = {
  badge: "AI-Powered Detection",
  headline: "Detect AI-Generated Content in Seconds",
  subheadline:
    "Advanced AI detection technology that identifies ChatGPT, GPT-4, Claude, and other AI-generated text with 98% accuracy. Trusted by educators, content creators, and businesses worldwide.",
  primaryCTA: "Try Free Scan",
  secondaryCTA: "View Pricing",
  trustIndicators: [
    "No credit card",
    "14-day trial",
    "Cancel anytime",
  ],
}

export const FEATURES = [
  {
    icon: Target,
    title: "98% Accuracy Rate",
    description:
      "Our advanced machine learning models analyze text patterns, sentence structures, and linguistic markers to provide the most accurate AI detection results in the industry. Continuously trained on the latest AI models including GPT-4, Claude, and Gemini.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get comprehensive analysis in under 3 seconds. Our real-time processing engine scans up to 50,000 characters instantly, providing detailed reports with highlighted AI-generated sections and confidence scores for each paragraph.",
  },
  {
    icon: Shield,
    title: "Complete Privacy",
    description:
      "Your content never leaves our secure servers and is deleted immediately after analysis. We don't store, share, or train our models on your submissions. GDPR compliant with enterprise-grade encryption for all data transmissions.",
  },
]

export const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Paste Your Text",
    description:
      "Copy and paste the content you want to analyze into our detection tool. Supports plain text, documents, and URLs. No registration required for the first scan.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Our advanced algorithms scan the text using multiple detection models simultaneously. We analyze syntax patterns, vocabulary complexity, sentence flow, and AI-specific linguistic markers.",
  },
  {
    number: "03",
    title: "Get Detailed Report",
    description:
      "Receive a comprehensive breakdown showing AI probability percentages, highlighted suspicious sections, and confidence scores. Export results as PDF for documentation.",
  },
  {
    number: "04",
    title: "Take Action",
    description:
      "Make informed decisions with clear, actionable insights. Use our detailed report to verify content authenticity, maintain academic integrity, or ensure original writing.",
  },
]

export const PRICING = {
  title: "Simple, Transparent Pricing",
  subtitle: "Choose the plan that fits your needs. No hidden fees.",
  plans: [
    {
      name: "FREE",
      badge: "Most Popular",
      price: "$0",
      billing: "Forever Free",
      description: "Perfect for occasional checks and personal use",
      features: [
        "5 scans per day",
        "Up to 5,000 characters per scan",
        "Basic AI detection report",
        "95% accuracy rate",
        "Email support",
        "No credit card required",
      ],
      cta: "Start Free",
      variant: "outline" as const,
    },
    {
      name: "PRO",
      badge: "Best Value",
      price: "$29",
      billing: "per month",
      description: "For professionals, educators, and content teams",
      features: [
        "Unlimited scans",
        "Up to 50,000 characters per scan",
        "Advanced detection with highlights",
        "98% accuracy rate",
        "Multiple AI model detection (GPT-4, Claude, Gemini)",
        "PDF export & API access",
        "Batch processing",
        "Priority support",
        "Team collaboration tools",
      ],
      cta: "Start 7-Day Trial",
      variant: "default" as const,
      popular: true,
    },
  ],
}

export const FAQ = [
  {
    question: "How accurate is the AI detection?",
    answer:
      "Our AI detector maintains a 98% accuracy rate for Pro users and 95% for Free users. We continuously train our models on the latest AI-generated content from GPT-4, Claude, Gemini, and other leading AI systems. The detector analyzes over 50 linguistic parameters including sentence structure, word choice patterns, and stylistic consistency.",
  },
  {
    question: "Which AI writing tools can you detect?",
    answer:
      "We can detect content generated by ChatGPT (GPT-3.5, GPT-4, GPT-4 Turbo), Claude (all versions), Google Gemini, Jasper, Copy.ai, and most other AI writing assistants. Our detection models are updated weekly to identify new AI tools and writing patterns.",
  },
  {
    question: "Is my content stored or used for training?",
    answer:
      "Absolutely not. We prioritize your privacy. All submitted content is analyzed in real-time and immediately deleted from our servers after processing. We never store your text, use it for model training, or share it with third parties. Our service is fully GDPR compliant.",
  },
  {
    question: "Can I use this for academic purposes?",
    answer:
      "Yes! Our AI detector is widely used by educators, universities, and students to verify content authenticity. We provide detailed PDF reports suitable for academic documentation. However, we recommend using our tool as part of a comprehensive assessment approach, not as the sole determinant.",
  },
  {
    question: "What if I disagree with the detection results?",
    answer:
      "Our system provides probability scores rather than absolute judgments. If you believe results are inaccurate, you can submit the content for manual review (Pro plan only). We also show which specific sections triggered detection, allowing you to understand and verify our analysis.",
  },
]

export const FOOTER = {
  tagline: "Trusted AI detection for the modern world",
  description:
    "Leading AI content detection platform helping educators, businesses, and content creators maintain authenticity and originality.",
  quickLinks: [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "API Documentation", href: "#" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "FAQ", href: "#faq" },
    { label: "System Status", href: "#" },
  ],
  social: [
    { label: "Twitter", href: "#", icon: "Twitter" },
    { label: "LinkedIn", href: "#", icon: "Linkedin" },
    { label: "GitHub", href: "#", icon: "Github" },
  ],
  copyright: "© 2025 AI Content Detector. All rights reserved.",
}
```

---

### 3. Canvas Animation (адаптированный под AI)

**Файл:** `components/ui/canvas.tsx`

```typescript
"use client"

import { useEffect, useRef } from "react"

// Oscillator для волнообразного движения
class Oscillator {
  phase: number
  offset: number
  frequency: number
  amplitude: number
  value: number

  constructor(options: any = {}) {
    this.phase = options.phase || 0
    this.offset = options.offset || 0
    this.frequency = options.frequency || 0.001
    this.amplitude = options.amplitude || 1
    this.value = 0
  }

  update() {
    this.phase += this.frequency
    this.value = this.offset + Math.sin(this.phase) * this.amplitude
    return this.value
  }
}

// Node в линии
class Node {
  x: number = 0
  y: number = 0
  vx: number = 0
  vy: number = 0
}

// Линия с физикой
class Line {
  spring: number
  friction: number
  nodes: Node[]

  constructor(options: { spring: number }) {
    this.spring = options.spring + 0.1 * Math.random() - 0.05
    this.friction = 0.5 + 0.01 * Math.random() - 0.005
    this.nodes = []

    for (let i = 0; i < 50; i++) {
      const node = new Node()
      this.nodes.push(node)
    }
  }

  update(pos: { x: number; y: number }) {
    let spring = this.spring
    let node = this.nodes[0]

    node.vx += (pos.x - node.x) * spring
    node.vy += (pos.y - node.y) * spring

    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i]

      if (i > 0) {
        const prev = this.nodes[i - 1]
        node.vx += (prev.x - node.x) * spring
        node.vy += (prev.y - node.y) * spring
        node.vx += prev.vx * 0.025
        node.vy += prev.vy * 0.025
      }

      node.vx *= this.friction
      node.vy *= this.friction
      node.x += node.vx
      node.y += node.vy
      spring *= 0.99
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let x = this.nodes[0].x
    let y = this.nodes[0].y

    ctx.beginPath()
    ctx.moveTo(x, y)

    for (let i = 1; i < this.nodes.length - 2; i++) {
      const node = this.nodes[i]
      const next = this.nodes[i + 1]
      x = (node.x + next.x) * 0.5
      y = (node.y + next.y) * 0.5
      ctx.quadraticCurveTo(node.x, node.y, x, y)
    }

    const last = this.nodes[this.nodes.length - 2]
    const lastNext = this.nodes[this.nodes.length - 1]
    ctx.quadraticCurveTo(last.x, last.y, lastNext.x, lastNext.y)
    ctx.stroke()
    ctx.closePath()
  }
}

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let isRunning = true
    const pos = { x: 0, y: 0 }
    let lines: Line[] = []

    // Oscillator для цвета (AI-тематика: синий → голубой)
    const colorOscillator = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 30, // Диапазон hue (220-250 = синий-голубой)
      frequency: 0.002,
      offset: 220, // Начинаем с синего
    })

    // Инициализация линий
    function initLines() {
      lines = []
      const trailCount = window.innerWidth < 768 ? 40 : 60 // Меньше на mobile
      for (let i = 0; i < trailCount; i++) {
        lines.push(
          new Line({
            spring: 0.45 + (i / trailCount) * 0.025,
          })
        )
      }
    }

    // Resize canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Mouse/Touch move handler
    function handleMove(e: MouseEvent | TouchEvent) {
      if (e instanceof MouseEvent) {
        pos.x = e.clientX
        pos.y = e.clientY
      } else if (e.touches && e.touches[0]) {
        pos.x = e.touches[0].pageX
        pos.y = e.touches[0].pageY
      }
    }

    // Render loop
    function render() {
      if (!isRunning) return

      ctx.globalCompositeOperation = "source-over"
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.globalCompositeOperation = "lighter"

      // AI-тематика: синие/голубые оттенки с низкой прозрачностью
      const hue = Math.round(colorOscillator.update())
      ctx.strokeStyle = `hsla(${hue}, 90%, 60%, 0.03)` // Очень прозрачные линии
      ctx.lineWidth = 1

      lines.forEach((line) => {
        line.update(pos)
        line.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(render)
    }

    // Setup
    resizeCanvas()
    initLines()

    // Set initial position to center
    pos.x = canvas.width / 2
    pos.y = canvas.height / 2

    // Event listeners
    window.addEventListener("resize", () => {
      resizeCanvas()
      initLines()
    })
    window.addEventListener("mousemove", handleMove)
    window.addEventListener("touchmove", handleMove)
    window.addEventListener("touchstart", handleMove)

    // Start animation
    render()

    // Cleanup
    return () => {
      isRunning = false
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("touchstart", handleMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: "transparent" }}
    />
  )
}
```

---

### 4. Theme Toggle

**Файл:** `components/layout/theme-toggle.tsx`

```typescript
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="size-9" />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="size-[18px]" />
      ) : (
        <Moon className="size-[18px]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

---

### 5. Header

**Файл:** `components/layout/header.tsx`

```typescript
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { MobileMenu } from "./mobile-menu"

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
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm">Try Free</Button>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
```

---

### 6. Mobile Menu

**Файл:** `components/layout/mobile-menu.tsx`

```typescript
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

      {open && (
        <div className="absolute top-16 inset-x-0 border-b bg-background/95 backdrop-blur-lg p-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Button variant="ghost" size="sm" className="w-full">
                Log in
              </Button>
              <Button size="sm" className="w-full">
                Try Free
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
```

---

## 📄 ПРОДОЛЖЕНИЕ В СЛЕДУЮЩИХ РАЗДЕЛАХ

Это первая часть плана. Продолжение с остальными компонентами (Hero, Features, How It Works, Pricing, FAQ, Footer, Scan Modal) и финальными шагами (deployment) будет в продолжении.

**ТЕКУЩИЙ ПРОГРЕСС:**
- ✅ Архитектура определена
- ✅ Дизайн система создана
- ✅ Constants с контентом
- ✅ Canvas анимация (AI-адаптированная)
- ✅ Theme Provider
- ✅ Header + Mobile Menu + Theme Toggle
- 🔜 Hero Section
- 🔜 Features Section
- 🔜 How It Works Section
- 🔜 Pricing Section
- 🔜 FAQ Section
- 🔜 Footer
- 🔜 Scan Modal
- 🔜 App Layout + Page
- 🔜 Deployment

---

**СЛЕДУЮЩИЕ ШАГИ:**
1. Установить зависимости
2. Создать структуру папок
3. Реализовать все компоненты
4. Интегрировать в app/page.tsx
5. Тестирование
6. Deployment на Vercel
