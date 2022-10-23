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
        'inline-block px-2 py-4 rounded-sm font-medium transition-colors hover:bg-gray-600 overflow-hidden',
        isActive && 'font-semibold bg-gray-700',
        className,
      )}
      onMouseDown={e => ripple.create(e, 'light')}
      {...props}
    >
      {children}
    </Link>
  );
}
