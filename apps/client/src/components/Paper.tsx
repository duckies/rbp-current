import { forwardRef } from "react"
import { cn } from "utils/cn"

type PaperProps = React.ComponentPropsWithRef<"div">

export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn("rounded-md bg-surface-700 p-8 shadow-lg", className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    )
  }
)

Paper.displayName = "Paper"

export default Paper
