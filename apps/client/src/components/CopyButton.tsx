"use client"

import { CheckIcon } from "components/icons/CheckIcon"
import { CopyIcon } from "components/icons/Copy"
import { useEffect, useState } from "react"
import { cn } from "utils/cn"

type CopyButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  value: string
}

function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <button
      className={cn(
        "relative z-20 inline-flex h-8 items-center justify-center rounded-md p-2 text-sm font-medium text-gray-100 transition-all hover:bg-surface-400 focus:outline-none",
        className
      )}
      onClick={() => {
        copyToClipboard(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
    </button>
  )
}
