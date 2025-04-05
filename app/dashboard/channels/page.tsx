import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ChannelsList } from "@/components/channels/channels-list"
import { getUserChannels } from "@/app/actions/channel-actions"
import { requireAuth } from "@/lib/auth"

export default async function ChannelsPage() {
  // Ensure user is authenticated
  await requireAuth()

  // Get user's channels
  const channels = await getUserChannels()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Channels</h1>
        <Link href="/dashboard/channels/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Channel
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <ChannelsList channels={channels} />
      </div>
    </div>
  )
}

