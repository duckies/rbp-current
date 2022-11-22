import type { VariantProps } from "cva";
import { cva } from "cva";
import { DOMProps } from "types/shared";

type FieldWrapperProps = DOMProps<'div'> & VariantProps<typeof styles>;

const styles = cva(["mt-1"]);

export default function FieldWrapper({ className, children, ...props }: FieldWrapperProps) {
  return <div className={styles({ className })} {...props}>{children}</div>;
}
