import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createChannel } from "@/app/actions/channel-actions"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Trash2, Database, Settings, Info } from "lucide-react"
import Link from "next/link"
import { DataFlowAnimation } from "@/components/ui/data-flow-animation"

export default function NewChannelPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/channels">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Channel</h1>
      </div>

      <form action={createChannel}>
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <Card className="shadow-sm relative overflow-hidden">
            <DataFlowAnimation className="opacity-10" />
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Channel Information</CardTitle>
                  <CardDescription>
                    Create a new channel to collect and visualize data from your IoT devices.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Channel Name</Label>
                <Input id="name" name="name" placeholder="My IoT Channel" required className="bg-background/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe what this channel will be used for..."
                  rows={3}
                  className="bg-background/50"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-medium">Field Configuration</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Configure up to 8 fields to store different types of data from your devices.
                </p>

                {[1, 2, 3, 4].map((fieldNum) => (
                  <div
                    key={fieldNum}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 border border-dashed rounded-lg bg-background/50 relative group"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <div className="space-y-2">
                      <Label htmlFor={`field${fieldNum}`}>Field {fieldNum} Name</Label>
                      <Input
                        id={`field${fieldNum}`}
                        name={`field${fieldNum}`}
                        placeholder={`Field ${fieldNum}`}
                        className="bg-background/80"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`field${fieldNum}Type`}>Field Type</Label>
                      <Select name={`field${fieldNum}Type`}>
                        <SelectTrigger className="bg-background/80">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="string">String</SelectItem>
                          <SelectItem value="boolean">Boolean</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                          <SelectItem value="status">Status</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}

                <Button variant="outline" type="button" className="mt-2 gap-2">
                  <Plus className="h-4 w-4" /> Add More Fields
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t bg-muted/20 backdrop-blur-sm">
              <Link href="/dashboard/channels">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" className="gap-2">
                <Database className="h-4 w-4" /> Create Channel
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Channel Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public">Public Channel</Label>
                    <p className="text-sm text-muted-foreground">
                      Make this channel publicly accessible to anyone with the link.
                    </p>
                  </div>
                  <Switch id="public" name="public" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="metadata">Enable Metadata</Label>
                    <p className="text-sm text-muted-foreground">Store additional metadata with each data point.</p>
                  </div>
                  <Switch id="metadata" name="metadata" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="location">Track Location</Label>
                    <p className="text-sm text-muted-foreground">Automatically track location data with each entry.</p>
                  </div>
                  <Switch id="location" name="location" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>About Channels</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Channels are the core of MetaSpeak. They store and organize your IoT data, making it easy to visualize
                  and analyze.
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Features:</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>Store up to 8 different data fields</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>Real-time data visualization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>Public or private access control</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>Simple HTTP API for data transmission</span>
                    </li>
                  </ul>
                </div>

                <Link href="/docs/channels" className="text-sm text-primary hover:underline block">
                  Learn more about channels →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

