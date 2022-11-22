import type { OverlayTriggerState } from "react-stately";
import type { AriaPopoverProps } from "@react-aria/overlays";
import * as React from "react";
import { usePopover, DismissButton, Overlay } from "@react-aria/overlays";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
}

export function Popover(props: PopoverProps) {
  let ref = React.useRef<HTMLDivElement>(null);
  let { popoverRef = ref, state, children, className, isNonModal } = props;

  let { popoverProps } = usePopover(
    {
      ...props,
      popoverRef
    },
    state
  );

  return (
    <Overlay>
      <div
        {...popoverProps}
        ref={popoverRef}
        className={`z-10 shadow-lg border border-gray-300 bg-white rounded-md mt-2 ${className}`}
      >
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
