import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface WelcomeBannerProps {
  user: {
    id: number
    name: string
    email: string
  }
}

export function WelcomeBanner({ user }: WelcomeBannerProps) {
  // Get the first name
  const firstName = user.name.split(" ")[0]

  // Get the current time of day
  const hour = new Date().getHours()
  let greeting = "Good evening"

  if (hour < 12) {
    greeting = "Good morning"
  } else if (hour < 18) {
    greeting = "Good afternoon"
  }

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">
              {greeting}, {firstName}
            </h1>
            <p className="text-muted-foreground">
              Welcome to your MetaSpeak dashboard. Here's what's happening with your IoT data.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/docs">
              <Button variant="outline" className="shadow-sm">
                View Documentation
              </Button>
            </Link>
            <Link href="/dashboard/channels/new">
              <Button className="gap-2 shadow-sm">
                New Channel <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

