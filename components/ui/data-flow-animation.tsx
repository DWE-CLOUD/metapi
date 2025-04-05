"use client"

import { useEffect, useState } from "react"

interface DataFlowAnimationProps {
  className?: string
  active?: boolean
}

export function DataFlowAnimation({ className = "", active = true }: DataFlowAnimationProps) {
  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([])

  useEffect(() => {
    if (!active) return

    // Create initial dots
    const initialDots = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
    }))

    setDots(initialDots)

    // Animation loop
    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          y: dot.y - dot.speed,
          // Reset position when dot goes off screen
          ...(dot.y < 0 ? { y: 100, x: Math.random() * 100 } : {}),
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [active])

  if (!active) return null

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg width="100%" height="100%" className="opacity-50">
        <defs>
          <linearGradient id="dot-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {dots.map((dot) => (
          <circle
            key={dot.id}
            cx={`${dot.x}%`}
            cy={`${dot.y}%`}
            r={dot.size}
            fill="url(#dot-gradient)"
            className="animate-pulse-subtle"
          />
        ))}
      </svg>
    </div>
  )
}

