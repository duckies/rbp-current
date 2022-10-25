import React, { type ElementType } from 'react';
import merge from 'lib/utils/merge';

export type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
} & React.ComponentPropsWithoutRef<T>;

export default function Container<T extends ElementType = 'div'>({ as, className, children }: ContainerProps<T>) {
  className = merge('w:full w:xs:@xs w:sm:@sm w:md@md w:lg@lg w:xl@xl w:2xl@2xl mx:auto px:32', className);

  return React.createElement(as || 'div', { className }, children);
}
