import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface ChannelApiInfoProps {
  channelId: string
}

export function ChannelApiInfo({ channelId }: ChannelApiInfoProps) {
  const baseUrl = "https://metaspeak.vercel.app/api/v1"

  return (
    <Tabs defaultValue="read" className="space-y-4">
      <TabsList>
        <TabsTrigger value="read">Read Data</TabsTrigger>
        <TabsTrigger value="write">Write Data</TabsTrigger>
        <TabsTrigger value="update">Update Channel</TabsTrigger>
      </TabsList>

      <TabsContent value="read" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Get Channel Data</CardTitle>
            <CardDescription>Retrieve data from this channel using the following endpoint.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-start justify-between">
                <code className="text-sm font-mono break-all">
                  GET {baseUrl}/channels/{channelId}/data
                </code>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Query Parameters</h4>
              <ul className="text-sm space-y-1">
                <li>
                  <code className="text-xs bg-muted px-1 rounded">results</code> - Number of results to return (default:
                  100)
                </li>
                <li>
                  <code className="text-xs bg-muted px-1 rounded">days</code> - Number of days of data to return
                  (default: 1)
                </li>
                <li>
                  <code className="text-xs bg-muted px-1 rounded">start</code> - Start date in ISO format
                </li>
                <li>
                  <code className="text-xs bg-muted px-1 rounded">end</code> - End date in ISO format
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Example Request</h4>
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm font-mono break-all">
                  curl -H "X-API-Key: YOUR_API_KEY" {baseUrl}/channels/{channelId}/data?results=10
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="write" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Write Data to Channel</CardTitle>
            <CardDescription>Send data to this channel using the following endpoint.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-start justify-between">
                <code className="text-sm font-mono break-all">
                  POST {baseUrl}/channels/{channelId}/data
                </code>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Request Body</h4>
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm font-mono">
                  {`{
  "field1": 23.5,
  "field2": 45,
  "latitude": 37.7749,
  "longitude": -122.4194,
  "elevation": 0,
  "status": "OK"
}`}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Example Request</h4>
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm font-mono break-all">
                  {`curl -X POST -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"field1": 23.5, "field2": 45}' ${baseUrl}/channels/${channelId}/data`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="update" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Update Channel</CardTitle>
            <CardDescription>Update this channel's information using the following endpoint.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-start justify-between">
                <code className="text-sm font-mono break-all">
                  PUT {baseUrl}/channels/{channelId}
                </code>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Request Body</h4>
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm font-mono">
                  {`{
  "name": "Updated Channel Name",
  "description": "Updated channel description",
  "metadata": {
    "location": "Living Room",
    "device_id": "temp-sensor-01"
  }
}`}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Example Request</h4>
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm font-mono break-all">
                  {`curl -X PUT -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"name": "Updated Channel Name"}' ${baseUrl}/channels/${channelId}`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

