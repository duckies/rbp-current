import { cva } from "cva";
import type { DOMRefProps } from "types/shared";

export const label = cva(["block", "font-medium", "mb-2"]);

type LabelProps = DOMRefProps<"label">;

export default function Label({ className, ...props }: LabelProps) {
  return <label className={label({ class: className })} {...props} />;
}
