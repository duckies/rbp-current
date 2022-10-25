import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import Ripple from 'material-ripple-effects';
import Link, { type LinkProps } from './Link';

export interface NavLinkProps extends LinkProps {}

export default function NavLink({
  to,
  children,
  className,
  ...props
}: LinkProps) {
  const ripple = new Ripple();
  const isActive = useRouter().pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        'inline-flex px:12 py:8 r:10 f:18 ~background-color|250ms|ease-in-out bg:gray-20:hover',
        isActive ? 'f:semibold f:gray-90 f:gray-10:@dark' : 'f:normal f:gray-70 f:gray-60:@dark',
        className,
      )}
      onMouseDown={e => ripple.create(e, 'dark')}
      {...props}
    >
      {children}
    </Link>
  );
}
