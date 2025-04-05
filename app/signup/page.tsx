import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/ui/logo"
import { registerUser } from "@/app/actions/auth-actions"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-background -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>

        <div className="mx-auto w-full max-w-sm animate-fade-in">
          <div className="flex justify-center mb-8">
            <Logo size="lg" href="/" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight mb-2">Create your account</h2>
          <p className="text-center text-sm text-muted-foreground mb-8">Start your journey with MetaSpeak today</p>
        </div>

        <div className="mt-4 mx-auto w-full max-w-sm animate-slide-up">
          <div className="bg-card/80 backdrop-blur-sm p-8 rounded-xl shadow-soft border border-border/50">
            <form action={registerUser} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full name
                </Label>
                <div className="mt-2">
                  <Input id="name" name="name" type="text" autoComplete="name" required className="bg-background/50" />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="bg-background/50"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Must be at least 8 characters long</p>
              </div>

              <div>
                <Button type="submit" className="w-full shadow-sm hover:shadow-md transition-shadow">
                  Create account
                </Button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

