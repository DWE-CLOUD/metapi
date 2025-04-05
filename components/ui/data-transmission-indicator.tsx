"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown } from "lucide-react"

interface DataTransmissionIndicatorProps {
  className?: string
}

export function DataTransmissionIndicator({ className = "" }: DataTransmissionIndicatorProps) {
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [direction, setDirection] = useState<"up" | "down">("up")
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Simulate random data transmission
    const interval = setInterval(() => {
      const shouldTransmit = Math.random() > 0.5
      setIsTransmitting(shouldTransmit)

      if (shouldTransmit) {
        setDirection(Math.random() > 0.5 ? "up" : "down")
        setCount((prev) => prev + 1)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge
        variant={isTransmitting ? "default" : "outline"}
        className={`gap-1 transition-colors ${isTransmitting ? "animate-pulse" : ""}`}
      >
        {direction === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
        <span className="text-xs">{isTransmitting ? "Transmitting" : "Idle"}</span>
      </Badge>
      <span className="text-xs text-muted-foreground">{count} transmissions today</span>
    </div>
  )
}

