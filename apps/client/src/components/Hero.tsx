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
    <h1 className="f:40 f:semibold t:center t:left@lg">
      {children}
    </h1>
  );
}

export function HeroCaption({ children }: HeroCaptionProps) {
  return <p className="f:20 f:gray-80 t:center t:left@lg">{children}</p>;
}

export default function Hero({ children }: HeroProps) {
  return <section className="py:80 @slide-in|250ms">{children}</section>;
}

Hero.Title = HeroTitle;
Hero.Caption = HeroCaption;
