"use client"

import { useEffect, useState, useRef } from "react"
import {
  BarChart2,
  Activity,
  Database,
  Bell,
  Settings,
  User,
  Search,
  ChevronDown,
  ArrowRight,
  Download,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview")
  const [chartData, setChartData] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState(3)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Animation ref for the data flow
  const dataFlowRef = useRef<HTMLDivElement>(null)

  // Generate random chart data
  useEffect(() => {
    // Initial data
    const initialData = Array.from({ length: 12 }, () => Math.floor(20 + Math.random() * 60))
    setChartData(initialData)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Simulate real-time data updates
    const dataInterval = setInterval(() => {
      setChartData((prev) => {
        const newData = [...prev]
        // Update a random bar
        const randomIndex = Math.floor(Math.random() * newData.length)
        newData[randomIndex] = Math.floor(20 + Math.random() * 60)
        return newData
      })

      // Randomly add or remove a notification
      if (Math.random() > 0.8) {
        setNotifications((prev) => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)))
      }
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(dataInterval)
      clearInterval(timeInterval)
    }
  }, [])

  // Sample data for the dashboard
  const stats = [
    { label: "Active Devices", value: "24", change: "+3", icon: Database },
    { label: "Data Points", value: "1.2K", change: "+8%", icon: Activity },
    { label: "API Calls", value: "843", change: "+12%", icon: BarChart2 },
  ]

  const recentData = [
    { id: 1, device: "Temperature Sensor", value: "23.5°C", time: "2 min ago", status: "normal" },
    { id: 2, device: "Humidity Sensor", value: "68%", time: "5 min ago", status: "warning" },
    { id: 3, device: "Motion Detector", value: "Active", time: "12 min ago", status: "alert" },
    { id: 4, device: "Light Sensor", value: "840 lux", time: "18 min ago", status: "normal" },
  ]

  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-background to-accent/10 rounded-lg border border-border/50 shadow-xl overflow-hidden flex flex-col relative group">
      {/* Animated data flow in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary animate-pulse-subtle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`,
            }}
          />
        ))}
        <div ref={dataFlowRef} className="absolute inset-0 opacity-30">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-primary animate-data-flow"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: 0,
                width: "100%",
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative">
              <BarChart2 className="h-12 w-12 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10"></div>
            </div>
            <div className="mt-4 text-lg font-medium">Loading Dashboard...</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-background/90 backdrop-blur-sm border-b border-border/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <BarChart2 className="h-4 w-4 text-primary" />
          </div>
          <div className="font-bold">MetaSpeak Dashboard</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>
          <div className="relative group/user">
            <button className="flex items-center gap-2 hover:bg-muted/50 rounded-full px-2 py-1 transition-colors">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm font-medium">Admin</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-card shadow-md rounded-md border border-border hidden group-hover/user:block z-10">
              <div className="p-2 text-xs text-muted-foreground border-b border-border">
                Signed in as <span className="font-medium text-foreground">admin@metaspeak.io</span>
              </div>
              <div className="p-1">
                <button className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors">
                  Profile Settings
                </button>
                <button className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors">
                  API Keys
                </button>
                <button className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 grid grid-cols-4 gap-4 overflow-hidden">
        {/* Sidebar */}
        <div className="col-span-1 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 p-4 flex flex-col">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 rounded-md border border-input bg-background px-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-1 flex-1">
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === "overview" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              onClick={() => setActiveTab("overview")}
            >
              <BarChart2 className="h-4 w-4" />
              <span>Overview</span>
            </button>
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === "devices" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              onClick={() => setActiveTab("devices")}
            >
              <Database className="h-4 w-4" />
              <span>Devices</span>
            </button>
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === "analytics" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              onClick={() => setActiveTab("analytics")}
            >
              <Activity className="h-4 w-4" />
              <span>Analytics</span>
            </button>
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>

          <div className="mt-auto pt-4 border-t border-border/50">
            <div className="text-xs text-muted-foreground mb-2">Current Time</div>
            <div className="text-sm font-medium">{currentTime.toLocaleTimeString()}</div>
          </div>
        </div>

        {/* Main area */}
        <div className="col-span-3 space-y-4 overflow-auto">
          {/* Welcome banner */}
          <div className="bg-primary/10 rounded-lg border border-primary/20 p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">Welcome to MetaSpeak</h2>
              <p className="text-sm text-muted-foreground">Your IoT analytics dashboard is ready</p>
            </div>
            <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm flex items-center gap-1 hover:bg-primary/90 transition-colors">
              <span>View Guide</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 p-4 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group/stat"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-emerald-500 mt-1">{stat.change}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/stat:bg-primary/20 transition-colors">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 p-4 h-64">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium">Data Activity</h3>
                <div className="text-xs text-muted-foreground">Real-time data points over time</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-muted hover:bg-muted/80 transition-colors px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>Export</span>
                </button>
                <select className="bg-muted text-xs rounded px-2 py-1 border-none focus:ring-1 focus:ring-primary">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
            </div>
            <div className="h-[calc(100%-2rem)] flex items-end justify-between gap-1 pt-4 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-muted-foreground">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>

              {/* Chart grid */}
              <div className="absolute left-8 right-0 top-0 bottom-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-border/30 w-full h-0"></div>
                ))}
              </div>

              {/* Bars */}
              {chartData.map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 relative z-10 group/bar">
                  <div
                    className="w-full bg-primary/60 hover:bg-primary transition-all rounded-t-sm group-hover/bar:shadow-glow cursor-pointer"
                    style={{
                      height: `${value}%`,
                      maxWidth: "80%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  ></div>
                  <div className="text-xs text-muted-foreground">{i + 1}h</div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 bg-popover text-popover-foreground text-xs rounded px-2 py-1 shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none">
                    {value} data points
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent data */}
          <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Recent Data</h3>
              <button className="text-xs text-primary hover:underline">View all</button>
            </div>
            <div className="space-y-2">
              {recentData.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 border-b border-border/50 hover:bg-muted/50 transition-colors rounded-sm cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === "normal"
                          ? "bg-emerald-500"
                          : item.status === "warning"
                            ? "bg-amber-500"
                            : "bg-rose-500"
                      }`}
                    ></div>
                    <div className="font-medium">{item.device}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                    <Badge
                      variant={
                        item.status === "normal" ? "outline" : item.status === "warning" ? "secondary" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

