import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" className="flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-emerald-500" />
          <span className="text-xl font-bold">MetaSpeak</span>
        </Link>
        <span className="text-xl font-bold text-muted-foreground">Documentation</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <div className="hidden md:block">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#introduction" className="text-sm text-muted-foreground hover:text-foreground">
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link href="#quickstart" className="text-sm text-muted-foreground hover:text-foreground">
                    Quick Start
                  </Link>
                </li>
                <li>
                  <Link href="#authentication" className="text-sm text-muted-foreground hover:text-foreground">
                    Authentication
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">API Reference</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#channels" className="text-sm text-muted-foreground hover:text-foreground">
                    Channels
                  </Link>
                </li>
                <li>
                  <Link href="#data" className="text-sm text-muted-foreground hover:text-foreground">
                    Data
                  </Link>
                </li>
                <li>
                  <Link href="#users" className="text-sm text-muted-foreground hover:text-foreground">
                    Users
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Guides</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#arduino" className="text-sm text-muted-foreground hover:text-foreground">
                    Arduino
                  </Link>
                </li>
                <li>
                  <Link href="#raspberry-pi" className="text-sm text-muted-foreground hover:text-foreground">
                    Raspberry Pi
                  </Link>
                </li>
                <li>
                  <Link href="#esp32" className="text-sm text-muted-foreground hover:text-foreground">
                    ESP32/ESP8266
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section id="introduction">
            <h1 className="text-3xl font-bold mb-4">MetaSpeak Documentation</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Welcome to the MetaSpeak documentation. Learn how to use MetaSpeak to collect, analyze, and visualize IoT
              data for your Metaverse projects.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>What is MetaSpeak?</CardTitle>
                <CardDescription>An overview of the MetaSpeak platform and its capabilities.</CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  MetaSpeak is an IoT analytics platform designed specifically for Metaverse applications. It allows you
                  to collect data from physical devices, store it securely in the cloud, and visualize it in real-time.
                  With MetaSpeak, you can bridge the gap between the physical world and your virtual Metaverse
                  experiences.
                </p>

                <p>Key features include:</p>

                <ul>
                  <li>Real-time data collection from IoT devices</li>
                  <li>Secure API for reading and writing data</li>
                  <li>Customizable dashboards and visualizations</li>
                  <li>Integration with popular IoT hardware like Arduino, Raspberry Pi, and ESP32</li>
                  <li>Webhooks and alerts for event-driven applications</li>
                  <li>Public and private data sharing options</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="quickstart">
            <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>

            <Tabs defaultValue="setup" className="space-y-4">
              <TabsList>
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="send">Send Data</TabsTrigger>
                <TabsTrigger value="retrieve">Retrieve Data</TabsTrigger>
              </TabsList>

              <TabsContent value="setup" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Setting Up Your First Channel</CardTitle>
                    <CardDescription>Follow these steps to create your first data channel.</CardDescription>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <ol>
                      <li>
                        Sign up for a MetaSpeak account at <code>metaspeak.vercel.app</code>
                      </li>
                      <li>Navigate to the Dashboard and click "New Channel"</li>
                      <li>Enter a name and description for your channel</li>
                      <li>Configure the fields you want to track (e.g., temperature, humidity)</li>
                      <li>Choose whether the channel should be public or private</li>
                      <li>Click "Create Channel" to finish</li>
                    </ol>

                    <p>
                      Once your channel is created, you'll receive API keys that you can use to send and retrieve data.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="send" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sending Data to Your Channel</CardTitle>
                    <CardDescription>Learn how to send data to your channel using the API.</CardDescription>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>To send data to your channel, make a POST request to the channel's data endpoint:</p>

                    <pre>
                      <code>{`curl -X POST \\
  -H "X-API-Key: YOUR_WRITE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"field1": 23.5, "field2": 45}' \\
  https://metaspeak.vercel.app/api/v1/channels/YOUR_CHANNEL_ID/data`}</code>
                    </pre>

                    <p>
                      You can include up to 8 fields in each data point, depending on how you configured your channel.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="retrieve" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Retrieving Data from Your Channel</CardTitle>
                    <CardDescription>Learn how to retrieve data from your channel using the API.</CardDescription>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>To retrieve data from your channel, make a GET request to the channel's data endpoint:</p>

                    <pre>
                      <code>{`curl -H "X-API-Key: YOUR_READ_API_KEY" \\
  https://metaspeak.vercel.app/api/v1/channels/YOUR_CHANNEL_ID/data?results=10`}</code>
                    </pre>

                    <p>You can use query parameters to filter the data:</p>

                    <ul>
                      <li>
                        <code>results</code>: Number of results to return (default: 100)
                      </li>
                      <li>
                        <code>days</code>: Number of days of data to return (default: 1)
                      </li>
                      <li>
                        <code>start</code>: Start date in ISO format
                      </li>
                      <li>
                        <code>end</code>: End date in ISO format
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          <section id="authentication">
            <h2 className="text-2xl font-bold mb-4">Authentication</h2>

            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Learn how to authenticate your requests to the MetaSpeak API.</CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>MetaSpeak uses API keys for authentication. There are three types of API keys:</p>

                <ul>
                  <li>
                    <strong>Read API Keys</strong>: Allow reading data from channels
                  </li>
                  <li>
                    <strong>Write API Keys</strong>: Allow writing data to channels
                  </li>
                  <li>
                    <strong>Full Access API Keys</strong>: Allow both reading and writing data, as well as managing
                    channels
                  </li>
                </ul>

                <p>
                  To authenticate your requests, include your API key in the <code>X-API-Key</code> header:
                </p>

                <pre>
                  <code>{`curl -H "X-API-Key: YOUR_API_KEY" \\
  https://metaspeak.vercel.app/api/v1/channels`}</code>
                </pre>

                <p>
                  Keep your API keys secure and never share them publicly. You can generate and revoke API keys from the
                  API Keys page in your dashboard.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}

