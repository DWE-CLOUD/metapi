import { BarChart2 } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  href?: string
}

export function Logo({ size = "md", href = "/" }: LogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  const logo = (
    <div className="flex items-center gap-2">
      <div className="relative">
        <BarChart2 className={`${sizeClasses[size]} text-primary`} />
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10"></div>
      </div>
      <span className={`${textClasses[size]} font-bold tracking-tight`}>MetaSpeak</span>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-90 transition-opacity">
        {logo}
      </Link>
    )
  }

  return logo
}

