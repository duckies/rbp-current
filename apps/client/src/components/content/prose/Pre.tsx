import { cn } from "utils/cn"

type PreProps = React.HTMLAttributes<HTMLPreElement> & {
  __rawString__?: string
  __withMeta__?: boolean
  __src__?: string
}

export function Pre({ className, ...props }: PreProps) {
  console.log(props)

  return (
    <>
      <pre
        className={cn(
          "mt-6 mb-4 overflow-x-auto rounded-lg border border-slate-900 bg-slate-900 py-4 px-2 dark:border-slate-700 dark:bg-black",
          className
        )}
        {...props}
      ></pre>
    </>
  )
}
