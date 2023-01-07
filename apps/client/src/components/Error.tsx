import { ChatBubbleError } from "components/icons/ChatBubbleError"
import { cva } from "cva"
import type { FC } from "react"
import type { DOMProps } from "types/shared"

const errorCSS = cva("flex text-red-400")

export type ErrorProps = DOMProps<"div"> & {
  label?: string
  message: string
}

export const Error: FC<ErrorProps> = ({ className, label = "Error", message }) => {
  return (
    <div className={errorCSS({ className })}>
      <ChatBubbleError className="mr-2 h-6 w-6" />
      <b className="mr-[5px]">{label}:</b>
      <span>{message}</span>
    </div>
  )
}
