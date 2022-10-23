import NextLink from 'next/link';

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
  to: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Link({ to, className, children, ...props }: LinkProps) {
  const isExternal = to.startsWith('http') || to.startsWith('mailto:');

  if (!isExternal) {
    return (
      <NextLink href={to}>
        <a className={className} {...props}>
          {children}
        </a>
      </NextLink>
    );
  }

  return (
    <a
      href={to}
      rel="noreferrer noopener"
      target="_blank"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
