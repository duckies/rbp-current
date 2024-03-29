export interface ChevronRightIconProps extends React.ComponentPropsWithoutRef<'svg'> { }

export function ChevronRightIcon(props: ChevronRightIconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
    </svg>
  );
}
