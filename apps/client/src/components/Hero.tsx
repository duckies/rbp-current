import { cn } from "utils/cn"

export interface HeroTitleProps {
  children: React.ReactNode
}

export interface HeroCaptionProps {
  children: React.ReactNode
}

export interface HeroProps {
  children: React.ReactNode
  className?: string
}

export function HeroTitle({ children }: HeroTitleProps) {
  return <h1 className="mb-2 text-center text-5xl font-semibold lg:text-left">{children}</h1>
}

export function HeroCaption({ children }: HeroCaptionProps) {
  return <p className="text-center text-xl text-gray-100 lg:text-left">{children}</p>
}

export default function Hero({ children, className }: HeroProps) {
  return <section className={cn("relative py-20", className)}>{children}</section>
}

Hero.Title = HeroTitle
Hero.Caption = HeroCaption
