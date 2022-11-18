import type { AriaSelectProps } from "@react-types/select";
import Button from "components/Button";
import { ChevronDownIcon } from "components/icons/ChevronDown";
import { ListBox } from "components/ListBox";
import { Popover } from "components/overlays/Popover";
import { useRef } from "react";
import { HiddenSelect, useSelect } from "react-aria";
import { useSelectState } from "react-stately";
import { FormFieldStyles } from "styles/components/forms";
import type { CollectionItem } from "types/state";
export { Item } from "react-stately";

type SelectProps = AriaSelectProps<CollectionItem>;

export function Select(props: SelectProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const state = useSelectState(props);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

  return (
    <div className="relative inline-flex w-full flex-col">
      <div {...labelProps}>{props.label}</div>

      <HiddenSelect state={state} triggerRef={ref} label={props.label} name={props.name} />

      <Button variant="unstyled" ref={ref} className={FormFieldStyles({ class: "relative" })} {...triggerProps}>
        <span {...valueProps} className={`text-md ${state.selectedItem ? "text-gray-800" : "text-gray-500"}`}>
          {state.selectedItem ? state.selectedItem.rendered : "Select an option"}
        </span>

        <div className="absolute inset-y-0 right-0 flex items-center p-2">
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start" className="w-52" isNonModal>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}
