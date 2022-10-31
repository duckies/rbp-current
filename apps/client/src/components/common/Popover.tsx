import React from 'react';
import { DismissButton, FocusScope, useOverlay } from 'react-aria';

interface PopoverProps {
  popoverRef?: React.RefObject<HTMLDivElement>
  children: React.ReactNode
  isOpen?: boolean
  onClose: () => void
}

export default function Popover(props: PopoverProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { popoverRef = ref, isOpen, onClose, children } = props;

  const { overlayProps } = useOverlay({
    isOpen,
    onClose,
    shouldCloseOnBlur: true,
    isDismissable: false,
  }, popoverRef);

  return (
    <FocusScope restoreFocus>
      <div {...overlayProps} ref={popoverRef} className="abs z:10 top:full w:full b:gray-90 bg:gray-60 mt:8 r:10">
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
}
