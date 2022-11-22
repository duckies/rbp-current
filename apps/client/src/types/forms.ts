import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type Item = { text: string; value: any };

export type FieldProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
};
