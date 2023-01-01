import React from "react"

type ConditionalWrapperProps = {
  condition: boolean
  wrapper: (children: JSX.Element) => JSX.Element
  children: JSX.Element
}

export const ConditionalWrapper = ({
  condition,
  children,
  wrapper,
}: ConditionalWrapperProps): JSX.Element => {
  return condition ? React.cloneElement(wrapper(children)) : children
}
