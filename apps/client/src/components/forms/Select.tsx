import React from 'react';
import type { AriaSelectOptions } from 'react-aria';
import { HiddenSelect, useSelect } from 'react-aria';
import { Item, Section, useSelectState } from 'react-stately';
import { cva } from 'cva';
import Label from 'components/forms/shared/Label';
import Popover from 'components/common/Popover';
import { ListBox } from 'components/common/ListBox';
import { ChevronRightIcon } from 'components/icons/ChevonRight';
import Button from 'components/Button';

export interface SelectProps<T> extends AriaSelectOptions<T> {
  className?: string
}

const classes = cva(['rel', 'inline-block', 'w:full']);

function Select<T extends object>({ className, ...props }: SelectProps<T>) {
  const state = useSelectState(props);
  const ref = React.useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

  return (
    <div className={classes({ class: className })}>
      <Label {...labelProps}>{props.label}</Label>

      <HiddenSelect state={state} triggerRef={ref} label={props.label} name={props.name} />

      <Button
        variant="plain"
        {...triggerProps}
        className="flex ai:center px:10 py:8 rel w:full r:6 b:2|solid|gray-30 focus-ring inline-flex flex:row outline-offset:-2px"
        ref={ref}
      >
        <div {...valueProps} className="flex flex:1|0 ai:flex-start font:gray-60 font-size:12">
          {state.selectedItem
            ? state.selectedItem.rendered
            : 'Select an option'}
        </div>

        <div className="pl:5 font:white">
          <ChevronRightIcon className="rotate(90deg) w:25 h:25" />
        </div>
      </Button>

      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}

Select.Item = Item;
Select.Section = Section;

export default Select;
