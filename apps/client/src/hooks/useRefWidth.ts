import { useResizeObserver } from "@react-aria/utils";
import { useLayoutEffect } from "hooks/useLayoutEffect";
import type { RefObject } from "react";
import { useCallback, useState } from "react";

export function useRefWidth(ref: RefObject<HTMLElement | undefined> | undefined) {
  const [width, setWidth] = useState<number | null>(null);

  const onResize = useCallback(() => {
    if (ref?.current) {
      const width = ref.current.offsetWidth;
      setWidth(width);
    }
  }, [ref, setWidth]);

  useResizeObserver({
    ref,
    onResize,
  });

  useLayoutEffect(onResize, [onResize]);

  return { width }
}
