import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApiKeysList } from "@/components/api-keys/api-keys-list"
import { getUserApiKeys } from "@/app/actions/api-actions"
import { requireAuth } from "@/lib/auth"
import { CreateApiKeyForm } from "@/components/api-keys/create-api-key-form"
import { ApiEndpointCard } from "@/components/ui/api-endpoint-card"
import { Key, Shield, ArrowUpRight } from "lucide-react"

export default async function ApiKeysPage() {
  // Ensure user is authenticated
  await requireAuth()

  // Get user's API keys
  const apiKeys = await getUserApiKeys()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-3">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
            <p className="text-muted-foreground">Manage your API keys for accessing the MetaSpeak API</p>
          </div>
        </div>
        <CreateApiKeyForm />
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Your API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for accessing the MetaSpeak API. Keep these secure!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApiKeysList apiKeys={apiKeys} />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <ApiEndpointCard
              title="List Channels"
              description="Get all your channels"
              method="GET"
              endpoint="https://metaspeak.vercel.app/api/v1/channels"
              exampleCode={`curl -H "X-API-Key: YOUR_API_KEY" https://metaspeak.vercel.app/api/v1/channels`}
            />

            <ApiEndpointCard
              title="Create Channel"
              description="Create a new channel"
              method="POST"
              endpoint="https://metaspeak.vercel.app/api/v1/channels"
              exampleCode={`curl -X POST -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"name": "New Channel", "description": "My IoT Channel"}' https://metaspeak.vercel.app/api/v1/channels`}
            />
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
                <CardTitle>API Usage</CardTitle>
              </div>
              <CardDescription>Track your API usage and limits.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily API Calls</p>
                    <p className="text-sm text-muted-foreground">Resets at midnight UTC</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">0 / 10,000</p>
                    <p className="text-sm text-muted-foreground">0% used</p>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-2 w-[0%] rounded-full bg-primary"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <CardTitle>API Key Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Your API keys grant access to your MetaSpeak account and data. Keep them secure and never share them
                publicly.
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Best Practices:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Use different keys for different applications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Rotate keys regularly for security</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Use read-only keys when possible</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Store keys in secure environment variables</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

