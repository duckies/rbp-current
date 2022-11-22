import { cva } from "cva";

export const listbox = cva([
  "absolute",
  "z-10",
  "mt-1",
  "max-h-60",
  "w-full",
  "overflow-auto",
  "rounded-md",
  "bg-surface-400",
  "py-1",
  "text-base",
  "shadow-lg",
  "ring-1",
  "ring-black",
  "ring-opacity-5",
]);

export const option = cva(["relative", "cursor-default", "select-none", "py-2", "pl-4", "pr-4"], {
  variants: {
    status: {
      default: "text-gray-900",
      active: "bg-yellow-400/40 text-white",
      selected: "bg-yellow-500/40 text-white",
    },
  },
  defaultVariants: {
    status: "default",
  },
});
