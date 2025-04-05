import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Settings, BarChart2, Trash2, Activity } from "lucide-react"
import Link from "next/link"
import { deleteChannel } from "@/app/actions/channel-actions"

interface Channel {
  id: number
  name: string
  description: string | null
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

interface ChannelsListProps {
  channels: Channel[]
}

export function ChannelsList({ channels }: ChannelsListProps) {
  if (channels.length === 0) {
    return (
      <Card className="shadow-sm border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <BarChart2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">No channels yet</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Create your first channel to start collecting and visualizing data from your IoT devices.
          </p>
          <Link href="/dashboard/channels/new">
            <Button>Create Your First Channel</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {channels.map((channel) => (
        <Card key={channel.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow card-hover">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{channel.name}</CardTitle>
              <Badge variant={channel.isPublic ? "default" : "outline"}>
                {channel.isPublic ? "Public" : "Private"}
              </Badge>
            </div>
            <CardDescription>{channel.description || "No description"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[120px] w-full bg-muted rounded-md overflow-hidden">
              <div className="h-full w-full flex items-center justify-center">
                <Activity className="h-10 w-10 text-muted-foreground/50" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Last Update</p>
                <p className="font-medium">{new Date(channel.updatedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-medium">{new Date(channel.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/dashboard/channels/${channel.id}`}>
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="h-4 w-4" /> View
              </Button>
            </Link>
            <div className="flex gap-2">
              <Link href={`/dashboard/channels/${channel.id}/settings`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings className="h-4 w-4" /> Settings
                </Button>
              </Link>
              <form action={deleteChannel.bind(null, channel.id.toString())}>
                <Button variant="outline" size="sm" className="gap-1 text-destructive">
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </form>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

