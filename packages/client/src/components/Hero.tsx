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
  return (
    <h1 className="font-semibold text-4xl text-center sm:text-5xl lg:text-6xl lg:text-left">
      {children}
    </h1>
  );
}

export function HeroCaption({ children }: HeroCaptionProps) {
  return <span className="text-lg text-gray-200">{children}</span>;
}

export default function Hero(props: HeroProps) {
  return <section className="py-[7rem]">{props.children}</section>;
}

Hero.Title = HeroTitle;
Hero.Caption = HeroCaption;
