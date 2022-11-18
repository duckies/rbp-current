import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType } from "react";

export type DOMProps<T extends ElementType> = ComponentPropsWithoutRef<T>;
export type DOMRefProps<T extends ElementType> = ComponentPropsWithRef<T>;
export type MakeRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
