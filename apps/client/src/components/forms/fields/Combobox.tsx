import type { AriaComboBoxProps } from "@react-types/combobox";
import Button from "components/Button";
import Label from "components/forms/shared/Label";
import { ChevronDownIcon } from "components/icons/ChevronDown";
import { ListBox } from "components/ListBox";
import { Popover } from "components/overlays/Popover";
import { useRef } from "react";
import { useComboBox, useFilter } from "react-aria";
import { useComboBoxState } from "react-stately";
import { FormFieldStyles } from "styles/components/forms";
import type { DOMProps } from "types/shared";
import type { CollectionItem } from "types/state";

type ComboBoxProps = AriaComboBoxProps<CollectionItem> & DOMProps<"input">;

export function ComboBox(props: ComboBoxProps) {
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  const buttonRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const { labelProps, buttonProps, inputProps, listBoxProps } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  );

  return (
    <div className="relative inline-flex w-full flex-col">
      <Label {...labelProps}>{props.label}</Label>

      <div className="relative inline-block">
        <input {...inputProps} ref={inputRef} className={FormFieldStyles({ class: props.className })} />
        <Button variant="unstyled" {...buttonProps} ref={buttonRef} className="absolute inset-y-0 right-0 ml-0 p-3">
          <ChevronDownIcon className="h-5 w-5" aria-hidden />
        </Button>
      </div>

      {state.isOpen && (
        <Popover popoverRef={popoverRef} triggerRef={inputRef} state={state} isNonModal placement="bottom start">
          <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
        </Popover>
      )}
    </div>
  );
}
