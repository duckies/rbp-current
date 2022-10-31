import { cva } from 'cva';
import React, { type ElementType } from 'react';

export type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
} & React.ComponentPropsWithoutRef<T>;

const classes = cva(['w:full', 'w:xs:@xs', 'w:sm:@sm', 'w:md@md', 'w:lg@lg', 'w:xl@xl', 'w:2xl@2xl', 'mx:auto', 'px:32']);

export default function Container<T extends ElementType = 'div'>({ as, className, children }: ContainerProps<T>) {
  return React.createElement(as || 'div', { className: classes({ class: className }) }, children);
}
