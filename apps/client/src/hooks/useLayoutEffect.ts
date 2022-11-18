import React from "react";

/**
 * Circumvent React warning about `useLayoutEffect` during SSR.
 */
export const useLayoutEffect = typeof window !== 'undefined'
  ? React.useLayoutEffect
  : () => { };
