import type { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

export type KeyFactory = Record<string, QueryKey | ((...args: any[]) => QueryKey)>;

export type QueryContextFromKeys<Factory extends KeyFactory> = {
  [Key in keyof Factory]: Factory[Key] extends (...args: any[]) => QueryKey
    ? QueryFunctionContext<ReturnType<Factory[Key]>>
    : Factory[Key] extends QueryKey
    ? QueryFunctionContext<Factory[Key]>
    : never;
};
