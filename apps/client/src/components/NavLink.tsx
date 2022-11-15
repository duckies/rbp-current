import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import Ripple from 'material-ripple-effects';
import Link, { type LinkProps } from './Link';

export interface NavLinkProps extends LinkProps { }

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
        'inline-flex px-3 py-2 rounded-md text-md  hover:bg-slate-700',
        className,
      )}
      onMouseDown={e => ripple.create(e, 'dark')}
      {...props}
    >
      {children}
    </Link>
  );
}
