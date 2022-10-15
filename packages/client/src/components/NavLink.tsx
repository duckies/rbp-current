import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import Link, { type LinkProps } from './Link';
import styles from 'styles/components/NavLink.module.scss';

export interface NavLinkProps extends LinkProps {}

export default function NavLink({
  to,
  children,
  className,
  ...props
}: LinkProps) {
  const isActive = useRouter().pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        styles.navLink,
        isActive && styles['navLink--active'],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
