import { motion } from "framer-motion"

type FieldErrorProps = {
  children: React.ReactNode
}

export function FieldError({ children }: FieldErrorProps) {
  return (
    <motion.span
      role="alert"
      className="my-2 block text-sm font-medium text-red-500"
      animate={{
        opacity: [0, 1],
      }}
    >
      {children}
    </motion.span>
  )
}
