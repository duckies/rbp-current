import { Link } from "components/Link"
import { ConditionalWrapper } from "components/Wrapper"
import { cn } from "utils/cn"

type CardTitleProps = React.ComponentPropsWithoutRef<"h3">

export function CardTitle({ children, className, ...props }: CardTitleProps) {
  return (
    <h3 className={cn("title mb-2 text-xl font-semibold", className)} {...props}>
      {children}
    </h3>
  )
}

type CardCaptionProps = React.ComponentPropsWithoutRef<"p">

export function CardCaption({ children, className, ...props }: CardCaptionProps) {
  return (
    <p className={cn("caption mb-4 text-gray-300", className)} {...props}>
      {children}
    </p>
  )
}

export type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  href?: string
}

export function Card({ className, children, href, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-md bg-surface-700 p-8 shadow-md", href ? "p-2" : "p-8", className)}
      {...props}
    >
      <ConditionalWrapper
        condition={!!href}
        wrapper={(children) => (
          <Link to={href} className="block h-full p-6" style="plain">
            {children}
          </Link>
        )}
      >
        <>{children}</>
      </ConditionalWrapper>
    </div>
  )
}

Card.Title = CardTitle
Card.Caption = CardCaption
