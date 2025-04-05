import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUpRight, TrendingUp, Users, Activity, Database } from "lucide-react"
import Link from "next/link"
import { getUserChannels } from "@/app/actions/channel-actions"
import { requireAuth } from "@/lib/auth"
import { StatsCard } from "@/components/dashboard/stats-card"
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"

export default async function DashboardPage() {
  // Ensure user is authenticated
  const user = await requireAuth()

  // Get user's channels
  const channels = await getUserChannels()

  return (
    <div className="flex flex-col gap-6">
      <WelcomeBanner user={user} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Channels"
          value={channels.length.toString()}
          description={channels.length === 0 ? "Create your first channel" : "Across all your projects"}
          icon={Database}
          trend={channels.length > 0 ? "+1 this week" : undefined}
          trendUp={true}
        />
        <StatsCard
          title="Data Points"
          value="0"
          description="No data points yet"
          icon={Activity}
          trend={undefined}
          trendUp={false}
        />
        <StatsCard
          title="API Calls"
          value="0"
          description="In the last 24 hours"
          icon={ArrowUpRight}
          trend={undefined}
          trendUp={false}
        />
        <StatsCard
          title="Active Devices"
          value="0"
          description="Connected to your channels"
          icon={Users}
          trend={undefined}
          trendUp={false}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Your data activity over time</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest platform activity</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Your Channels</h2>
            <Link href="/dashboard/channels/new">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> New Channel
              </Button>
            </Link>
          </div>

          {channels.length === 0 ? (
            <Card className="shadow-sm border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No channels yet</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Create your first channel to start collecting and visualizing data from your IoT devices.
                </p>
                <Link href="/dashboard/channels/new">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Create Your First Channel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {channels.slice(0, 3).map((channel) => (
                <Card key={channel.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle>{channel.name}</CardTitle>
                    <CardDescription>{channel.description || "No description"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[120px] w-full bg-muted rounded-md flex items-center justify-center">
                      <Activity className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Last updated: {new Date(channel.updatedAt).toLocaleDateString()}
                      </div>
                      <Link href={`/dashboard/channels/${channel.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          View <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {channels.length > 3 && (
            <div className="flex justify-center">
              <Link href="/dashboard/channels">
                <Button variant="outline">View All Channels</Button>
              </Link>
            </div>
          )}
        </TabsContent>
        <TabsContent value="analytics" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics for your channels and API usage.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4 mx-auto w-fit">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  We're working on advanced analytics features for your IoT data.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>View all activity across your channels and devices.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4 mx-auto w-fit">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Activity Yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Your activity log will show events from your channels and API usage.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

