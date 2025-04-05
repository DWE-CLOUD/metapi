"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data - in a real app, this would come from an API
const generateData = (days: number) => {
  const data = []
  const now = new Date()

  for (let i = 0; i < days * 24; i++) {
    const time = new Date(now.getTime() - i * 3600000)
    data.push({
      timestamp: time.toISOString(),
      temperature: Math.round(20 + Math.random() * 5),
      humidity: Math.round(40 + Math.random() * 20),
    })
  }

  return data.reverse()
}

export function ChannelChart() {
  const [timeRange, setTimeRange] = useState("1")
  const [data, setData] = useState(() => generateData(1))

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    setData(generateData(Number.parseInt(value)))
  }

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem)
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === "1" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange("1")}
          >
            1D
          </Button>
          <Button
            variant={timeRange === "7" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange("7")}
          >
            7D
          </Button>
          <Button
            variant={timeRange === "30" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange("30")}
          >
            30D
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="temperature">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="temperature">Temperature</SelectItem>
              <SelectItem value="humidity">Humidity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}°C`}
          />
          <Tooltip
            formatter={(value) => [`${value}°C`, "Temperature"]}
            labelFormatter={(label) => new Date(label).toLocaleString()}
          />
          <Line type="monotone" dataKey="temperature" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

