import { motion } from "framer-motion";

type FieldErrorProps = {
  error: string | null | undefined;
};

export function FieldError({ error }: FieldErrorProps) {
  return (
    <motion.span
      className="px-2 py-2 text-sm font-medium text-red-500"
      animate={{
        opacity: [0, 1],
      }}
    >
      {error}
    </motion.span>
  );
}
