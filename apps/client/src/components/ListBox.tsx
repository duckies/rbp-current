import type { AriaListBoxOptions } from "@react-aria/listbox";
import type { Node } from "@react-types/shared";
import CheckIcon from "components/icons/CheckIcon";
import { useRef } from "react";
import { useListBox, useListBoxSection, useOption } from "react-aria";
import type { ListState } from "react-stately";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
}

interface SectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

export function ListBox(props: ListBoxProps) {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul {...listBoxProps} ref={listBoxRef} className="max-h-72 w-full overflow-auto outline-none">
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        )
      )}
    </ul>
  );
}

function ListBoxSection({ section, state }: SectionProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  return (
    <>
      <li {...itemProps} className="pt-2">
        {section.rendered && (
          <span {...headingProps} className="mx-3 text-xs font-bold uppercase text-gray-500">
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}

function Option({ item, state }: OptionProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  let text = "text-gray-700";
  if (isFocused || isSelected) {
    text = "text-pink-600";
  } else if (isDisabled) {
    text = "text-gray-200";
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`m-1 flex cursor-default items-center justify-between rounded-md py-2 px-2 text-sm outline-none ${text} ${
        isFocused ? "bg-pink-100" : ""
      } ${isSelected ? "font-bold" : ""}`}
    >
      {item.rendered}
      {isSelected && <CheckIcon aria-hidden="true" className="h-5 w-5 text-pink-600" />}
    </li>
  );
}
