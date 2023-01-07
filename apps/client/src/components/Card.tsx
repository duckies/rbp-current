import clsx from "clsx"
import { Link } from "components/Link"
import { ConditionalWrapper } from "components/Wrapper"

export interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  href?: string
}
export interface CardTitleProps extends React.ComponentPropsWithoutRef<"h3"> {}
export interface CardCaptionProps extends React.ComponentPropsWithoutRef<"p"> {}

export function CardTitle({ children, className, ...props }: CardTitleProps) {
  return (
    <h3 className={clsx("title mb-2 text-xl font-semibold", className)} {...props}>
      {children}
    </h3>
  )
}

export function CardCaption({ children, className, ...props }: CardCaptionProps) {
  return (
    <p className={clsx("caption mb-4 text-gray-300", className)} {...props}>
      {children}
    </p>
  )
}

export default function Card({ className, children, href, ...props }: CardProps) {
  return (
    <div
      className={clsx("rounded-md bg-surface-700 p-8 shadow-md", href ? "p-2" : "p-8", className)}
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
