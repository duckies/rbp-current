import { cn } from "utils/cn"

type AlertProps = {
  type?: "info" | "warning"
  children: React.ReactNode
}

export function Alert({ type = "info", children }: AlertProps) {
  return (
    <div
      className={cn(
        type === "info" && "border-2 border-yellow-300 bg-yellow-300/30",
        type === "warning" && "border-2 border-pink-700 bg-pink-700/30"
      )}
    >
      {children}
    </div>
  )
}
