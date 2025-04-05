import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChannelApiInfo } from "@/components/channels/channel-api-info"
import { ArrowLeft, Settings, Share2, Download, Activity, Database, Zap } from "lucide-react"
import Link from "next/link"
import { getChannelById } from "@/app/actions/channel-actions"
import { DataVisualization } from "@/components/ui/data-visualization"
import { DataTransmissionIndicator } from "@/components/ui/data-transmission-indicator"
import { ApiEndpointCard } from "@/components/ui/api-endpoint-card"
import { DataTable } from "@/components/channels/data-table"

// Generate sample data for visualization
const generateSampleData = (days = 7) => {
  const data = []
  const now = new Date()

  for (let i = 0; i < days * 24; i += 2) {
    const time = new Date(now.getTime() - i * 3600000)
    data.unshift({
      name: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temperature: Math.round((20 + Math.sin(i / 5) * 5 + Math.random() * 2) * 10) / 10,
      humidity: Math.round((50 + Math.cos(i / 10) * 20 + Math.random() * 5) * 10) / 10,
    })
  }

  return data
}

export default async function ChannelPage({ params }: { params: { id: string } }) {
  // Get channel data
  const channel = await getChannelById(params.id)

  if (!channel) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h1 className="text-2xl font-bold mb-2">Channel not found</h1>
        <p className="text-muted-foreground mb-6">
          The channel you're looking for doesn't exist or you don't have access to it.
        </p>
        <Link href="/dashboard/channels">
          <Button>Back to Channels</Button>
        </Link>
      </div>
    )
  }

  // Sample data for visualization
  const sampleData = generateSampleData()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/channels">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{channel.name}</h1>
          <Badge variant={channel.isPublic ? "default" : "outline"} className="ml-2">
            {channel.isPublic ? "Public" : "Private"}
          </Badge>
          <DataTransmissionIndicator className="ml-2" />
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Link href={`/dashboard/channels/${params.id}/settings`}>
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-4 w-4" /> Settings
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="visualization" className="space-y-6">
        <TabsList className="bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Channel Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Database className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{channel.description || "No description"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-sm text-muted-foreground">{new Date(channel.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Data Points</p>
                      <p className="text-sm text-muted-foreground">1,245 total points</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Stats</CardTitle>
                <CardDescription>Last 24 hours of activity</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <span className="text-3xl font-bold text-primary">24</span>
                  <span className="text-xs text-muted-foreground mt-1">API Calls</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <span className="text-3xl font-bold text-primary">128</span>
                  <span className="text-xs text-muted-foreground mt-1">Data Points</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <span className="text-3xl font-bold text-primary">3</span>
                  <span className="text-xs text-muted-foreground mt-1">Devices</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <DataVisualization
            title="Temperature & Humidity Data"
            description="Real-time readings from your IoT devices"
            data={sampleData}
            dataKeys={["temperature", "humidity"]}
          />
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Channel Data</CardTitle>
              <CardDescription>View and manage the data points in this channel.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={sampleData.slice(0, 10)} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ApiEndpointCard
              title="Get Channel Data"
              description="Retrieve data from this channel"
              method="GET"
              endpoint={`https://metaspeak.vercel.app/api/v1/channels/${params.id}/data`}
              exampleCode={`curl -H "X-API-Key: YOUR_API_KEY" https://metaspeak.vercel.app/api/v1/channels/${params.id}/data?results=10`}
            />

            <ApiEndpointCard
              title="Send Data to Channel"
              description="Send new data points to this channel"
              method="POST"
              endpoint={`https://metaspeak.vercel.app/api/v1/channels/${params.id}/data`}
              exampleCode={`curl -X POST -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"field1": 23.5, "field2": 45}' https://metaspeak.vercel.app/api/v1/channels/${params.id}/data`}
            />

            <ApiEndpointCard
              title="Update Channel"
              description="Update this channel's information"
              method="PUT"
              endpoint={`https://metaspeak.vercel.app/api/v1/channels/${params.id}`}
              exampleCode={`curl -X PUT -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"name": "Updated Channel Name"}' https://metaspeak.vercel.app/api/v1/channels/${params.id}`}
            />

            <ApiEndpointCard
              title="Delete Channel"
              description="Permanently delete this channel"
              method="DELETE"
              endpoint={`https://metaspeak.vercel.app/api/v1/channels/${params.id}`}
              exampleCode={`curl -X DELETE -H "X-API-Key: YOUR_API_KEY" https://metaspeak.vercel.app/api/v1/channels/${params.id}`}
            />
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>API Information</CardTitle>
              <CardDescription>Use these endpoints to interact with your channel data.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChannelApiInfo channelId={params.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

