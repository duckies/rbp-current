export interface HeroTitleProps {
  children: React.ReactNode
}

export interface HeroCaptionProps {
  children: React.ReactNode
}

export interface HeroProps {
  children: React.ReactNode
}

export function HeroTitle({ children }: HeroTitleProps) {
  return <h1 className="mb-2 text-center text-5xl font-semibold lg:text-left">{children}</h1>
}

export function HeroCaption({ children }: HeroCaptionProps) {
  return <p className="text-center text-xl text-gray-300 lg:text-left">{children}</p>
}

export default function Hero({ children }: HeroProps) {
  return <section className="relative py-20">{children}</section>
}

Hero.Title = HeroTitle
Hero.Caption = HeroCaption
