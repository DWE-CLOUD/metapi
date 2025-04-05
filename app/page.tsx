import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, BarChart2, Database, Key, Globe, Zap, Lock, ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { DashboardPreview } from "@/components/ui/dashboard-preview"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <Logo size="md" />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#docs" className="text-sm font-medium hover:text-primary transition-colors">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:text-primary">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="shadow-sm hover:shadow-md transition-shadow">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10"></div>

          <div className="container flex flex-col items-center text-center animate-fade-in">
            <div className="inline-block mb-6 px-4 py-1.5 bg-accent rounded-full text-sm font-medium text-primary">
              Introducing MetaSpeak 1.0
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              IoT Analytics for the Metaverse
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-10">
              Connect, visualize, and analyze live data streams from your IoT devices in the Metaverse with MetaSpeak's
              powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-shadow">
                  Get Started <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="gap-2 hover:bg-accent transition-colors">
                  View Documentation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-20 -bottom-5 z-10"></div>
              <div className="relative w-full max-w-5xl mx-auto">
                <DashboardPreview />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl font-bold mb-4">Powerful Features for IoT Analytics</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to collect, visualize, and analyze data from your IoT devices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-8 border rounded-xl card-hover bg-card/50 backdrop-blur-sm"
                >
                  <div className="bg-accent p-4 rounded-full mb-6 relative">
                    <feature.icon className="h-8 w-8 text-primary" />
                    <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full -z-10"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-accent/50 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-accent/50 -z-10"></div>
          <div className="container">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get started with MetaSpeak in three simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-primary/20 -z-10"></div>

              {steps.map((step, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-soft relative z-0">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-soft overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 transform -translate-x-1/4 translate-y-1/4"></div>

              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-4">Ready to get started with MetaSpeak?</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of developers and companies using MetaSpeak to power their IoT analytics.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2 shadow-md">
                      Create Free Account <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button size="lg" variant="outline" className="gap-2">
                      Read Documentation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 mt-auto bg-card/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-8 md:mb-0">
              <Logo size="md" />
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <nav className="flex gap-6">
                <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
                <Link href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
                <Link href="#docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MetaSpeak. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Data Collection",
    description: "Collect data from any IoT device using our simple HTTP/HTTPS API endpoints.",
    icon: Database,
  },
  {
    title: "Real-time Visualization",
    description: "Create beautiful charts and dashboards to visualize your IoT data in real-time.",
    icon: BarChart2,
  },
  {
    title: "API Access",
    description: "Secure API keys for reading and writing data to your channels.",
    icon: Key,
  },
  {
    title: "Public/Private Sharing",
    description: "Share your data publicly or keep it private with granular access controls.",
    icon: Globe,
  },
  {
    title: "Webhooks & Alerts",
    description: "Set up triggers and notifications based on your data thresholds.",
    icon: Zap,
  },
  {
    title: "Secure & Scalable",
    description: "Enterprise-grade security and scalability for your IoT projects.",
    icon: Lock,
  },
]

const steps = [
  {
    title: "Create a Channel",
    description: "Set up a channel to store data from your IoT devices with up to 8 fields for different data points.",
  },
  {
    title: "Send Data",
    description: "Use our API to send data from your devices to your channel using simple HTTP requests.",
  },
  {
    title: "Visualize & Analyze",
    description: "View your data in real-time charts, export it, or connect it to your Metaverse applications.",
  },
]

