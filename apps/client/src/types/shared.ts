import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType } from "react";

export type DOMProps<T extends ElementType> = ComponentPropsWithoutRef<T>;
export type DOMRefProps<T extends ElementType> = ComponentPropsWithRef<T>;
