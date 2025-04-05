"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface ApiEndpointCardProps {
  title: string
  description: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  endpoint: string
  exampleCode?: string
  className?: string
}

export function ApiEndpointCard({
  title,
  description,
  method,
  endpoint,
  exampleCode,
  className = "",
}: ApiEndpointCardProps) {
  const [copied, setCopied] = useState(false)

  const methodColors = {
    GET: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    POST: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    PUT: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(endpoint)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className={`overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={`font-mono ${methodColors[method]}`}>{method}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="bg-muted rounded-md p-3 pr-12 font-mono text-sm overflow-x-auto whitespace-nowrap">
            {endpoint}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        {exampleCode && (
          <div className="bg-muted rounded-md p-3 font-mono text-sm overflow-x-auto">
            <pre className="text-xs">{exampleCode}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

