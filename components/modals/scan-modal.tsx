"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

type AnalysisState = "input" | "analyzing" | "result"

export function ScanModal() {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState<AnalysisState>("input")
  const [text, setText] = React.useState("")
  const [aiScore, setAiScore] = React.useState(0)

  const handleAnalyze = () => {
    if (!text.trim()) return

    setState("analyzing")

    // Mock analysis delay
    setTimeout(() => {
      // Generate random AI score between 70-95%
      const score = Math.floor(Math.random() * (95 - 70 + 1)) + 70
      setAiScore(score)
      setState("result")
    }, 3000)
  }

  const handleReset = () => {
    setState("input")
    setText("")
    setAiScore(0)
  }

  const handleClose = () => {
    setOpen(false)
    // Reset after close animation
    setTimeout(handleReset, 300)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-500"
    if (score >= 60) return "text-yellow-500"
    return "text-green-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "High AI probability"
    if (score >= 60) return "Moderate AI probability"
    return "Low AI probability"
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="h-12 px-8 text-base">
          Try Free Scan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>AI Content Detector</DialogTitle>
          <DialogDescription>
            Paste your text below to analyze it for AI-generated content
          </DialogDescription>
        </DialogHeader>

        {/* Input State */}
        {state === "input" && (
          <div className="flex flex-col gap-4 mt-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here... (minimum 50 characters)"
              className="min-h-[200px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {text.length} characters
              </span>
              <Button
                onClick={handleAnalyze}
                disabled={text.length < 50}
                className="w-32"
              >
                Analyze
              </Button>
            </div>
          </div>
        )}

        {/* Analyzing State */}
        {state === "analyzing" && (
          <div className="flex flex-col items-center justify-center gap-6 py-12">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              <Loader2 className="size-12 animate-spin text-primary" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-lg font-semibold">Analyzing text...</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                Our AI detection models are scanning your content for patterns,
                sentence structure, and linguistic markers.
              </p>
            </div>
          </div>
        )}

        {/* Result State */}
        {state === "result" && (
          <div className="flex flex-col gap-6 mt-4">
            {/* Score Display */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-muted/30">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  AI Detection Score
                </span>
                <span className={`text-6xl font-bold ${getScoreColor(aiScore)}`}>
                  {aiScore}%
                </span>
                <span className={`text-sm font-medium ${getScoreColor(aiScore)}`}>
                  {getScoreLabel(aiScore)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    aiScore >= 80
                      ? "bg-red-500"
                      : aiScore >= 60
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${aiScore}%` }}
                />
              </div>
            </div>

            {/* Analysis Details */}
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold">Analysis Summary</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>
                    Detected patterns consistent with AI-generated text
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>
                    Sentence structure shows low natural variation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>
                    Vocabulary complexity is consistent with GPT-4 patterns
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="rounded-lg border bg-primary/5 p-4">
              <p className="text-sm text-center mb-3">
                Want detailed analysis with highlighted sections and PDF export?
              </p>
              <Button className="w-full" variant="default">
                Upgrade to Pro
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="group relative overflow-hidden inline-flex items-center justify-center h-9 px-4 text-sm rounded-md transition-all duration-300 hover:text-white flex-1 border border-input"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Analyze Another</span>
              </button>
              <button
                onClick={handleClose}
                className="group relative overflow-hidden inline-flex items-center justify-center h-9 px-4 text-sm rounded-md transition-all duration-300 hover:text-white flex-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Close</span>
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
