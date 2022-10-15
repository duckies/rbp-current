import NextLink from 'next/link';

export interface LinkProps {
  to: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Link(props: LinkProps) {
  const isExternal =
    props.to.startsWith('http') || props.to.startsWith('mailto:');

  if (!isExternal) {
    return (
      <NextLink href={props.to}>
        <a className={props.className}>{props.children}</a>
      </NextLink>
    );
  }

  return (
    <a
      href={props.to}
      rel="noreferrer noopener"
      target="_blank"
      className={props.className}
    >
      {props.children}
    </a>
  );
}
